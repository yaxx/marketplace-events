import { Kafka, KafkaConfig, Producer, Consumer, Admin, logLevel } from 'kafkajs';
import { EventPayload, BaseEventData } from '../types/base-event';

export interface MarketplaceKafkaConfig {
  clientId: string;
  brokers: string[];
  groupId?: string;
  ssl?: boolean;
  sasl?: {
    mechanism: 'plain' | 'scram-sha-256' | 'scram-sha-512';
    username: string;
    password: string;
  } | undefined;
  connectionTimeout?: number;
  requestTimeout?: number;
  retry?: {
    retries: number;
    initialRetryTime: number;
    maxRetryTime: number;
  };
  logLevel?: logLevel;
}

export interface TopicConfig {
  topic: string;
  numPartitions?: number;
  replicationFactor?: number;
  configEntries?: Array<{
    name: string;
    value: string;
  }>;
}

export interface ProducerMessage<T extends BaseEventData = BaseEventData> {
  topic: string;
  key?: string;
  value: EventPayload<T>;
  partition?: number;
  timestamp?: string;
  headers?: Record<string, string>;
}

export interface ConsumerMessage<T extends BaseEventData = BaseEventData> {
  topic: string;
  partition: number;
  offset: string;
  key?: string;
  value: EventPayload<T>;
  timestamp: string;
  headers?: Record<string, string>;
}

export class MarketplaceKafkaClient {
  private kafka: Kafka;
  private producer?: Producer;
  private consumers: Map<string, Consumer> = new Map();
  private admin?: Admin;
  private config: MarketplaceKafkaConfig;

  constructor(config: MarketplaceKafkaConfig) {
    this.config = config;
    
    const kafkaConfig: KafkaConfig = {
      clientId: config.clientId,
      brokers: config.brokers,
      ssl: config.ssl,
      sasl: config.sasl as any, // Type assertion for SASL config compatibility
      connectionTimeout: config.connectionTimeout || 3000,
      requestTimeout: config.requestTimeout || 25000,
      retry: config.retry || {
        retries: 3,
        initialRetryTime: 100,
        maxRetryTime: 30000
      },
      logLevel: config.logLevel || logLevel.INFO
    };

    this.kafka = new Kafka(kafkaConfig);
  }

  /**
   * Initialize producer
   */
  async initializeProducer(): Promise<void> {
    if (this.producer) return;

    this.producer = this.kafka.producer({
      maxInFlightRequests: 1,
      idempotent: true,
      retry: {
        retries: 5,
        initialRetryTime: 100,
        maxRetryTime: 30000
      }
    });

    await this.producer.connect();
  }

  /**
   * Initialize consumer with group ID
   */
  async initializeConsumer(groupId?: string): Promise<Consumer> {
    const consumerGroupId = groupId || this.config.groupId || `${this.config.clientId}-group`;
    
    if (this.consumers.has(consumerGroupId)) {
      return this.consumers.get(consumerGroupId)!;
    }

    const consumer = this.kafka.consumer({
      groupId: consumerGroupId,
      sessionTimeout: 30000,
      rebalanceTimeout: 60000,
      heartbeatInterval: 3000,
      maxBytesPerPartition: 1048576,
      minBytes: 1,
      maxBytes: 10485760,
      maxWaitTimeInMs: 5000,
      retry: {
        retries: 5,
        initialRetryTime: 100,
        maxRetryTime: 30000
      }
    });

    await consumer.connect();
    this.consumers.set(consumerGroupId, consumer);
    
    return consumer;
  }

  /**
   * Initialize admin client
   */
  async initializeAdmin(): Promise<void> {
    if (this.admin) return;

    this.admin = this.kafka.admin();
    await this.admin.connect();
  }

  /**
   * Publish event to topic
   */
  async publishEvent<T extends BaseEventData = BaseEventData>(
    message: ProducerMessage<T>
  ): Promise<void> {
    if (!this.producer) {
      await this.initializeProducer();
    }

    const kafkaMessage = {
      key: message.key || message.value.eventId,
      value: JSON.stringify(message.value),
      partition: message.partition,
      timestamp: message.timestamp,
      headers: {
        ...message.headers,
        eventType: message.value.eventType,
        source: message.value.source,
        correlationId: message.value.correlationId,
        contentType: 'application/json'
      }
    };

    await this.producer!.send({
      topic: message.topic,
      messages: [kafkaMessage]
    });
  }

  /**
   * Batch publish multiple events
   */
  async publishEvents<T extends BaseEventData = BaseEventData>(
    messages: ProducerMessage<T>[]
  ): Promise<void> {
    if (!this.producer) {
      await this.initializeProducer();
    }

    const topicMessages = new Map<string, any[]>();
    
    messages.forEach(message => {
      if (!topicMessages.has(message.topic)) {
        topicMessages.set(message.topic, []);
      }
      
      topicMessages.get(message.topic)!.push({
        key: message.key || message.value.eventId,
        value: JSON.stringify(message.value),
        partition: message.partition,
        timestamp: message.timestamp,
        headers: {
          ...message.headers,
          eventType: message.value.eventType,
          source: message.value.source,
          correlationId: message.value.correlationId,
          contentType: 'application/json'
        }
      });
    });

    const topicMessagesArray = Array.from(topicMessages.entries()).map(([topic, messages]) => ({
      topic,
      messages
    }));

    await this.producer!.sendBatch({
      topicMessages: topicMessagesArray
    });
  }

  /**
   * Subscribe to topic and process messages
   */
  async subscribe<T extends BaseEventData = BaseEventData>(
    topics: string[],
    messageHandler: (message: ConsumerMessage<T>) => Promise<void>,
    groupId?: string
  ): Promise<void> {
    const consumer = await this.initializeConsumer(groupId);

    await consumer.subscribe({ 
      topics,
      fromBeginning: false 
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          if (!message.value) return;

          const eventPayload: EventPayload<T> = JSON.parse(message.value.toString());
          
          const consumerMessage: ConsumerMessage<T> = {
            topic,
            partition,
            offset: message.offset,
            key: message.key?.toString(),
            value: eventPayload,
            timestamp: message.timestamp,
            headers: message.headers ? this.parseHeaders(message.headers) : undefined
          };

          //console.log(`New registration ${message}:`)

          await messageHandler(consumerMessage);
        } catch (error) {
          console.error(`Error processing message from topic ${topic}:`, error);
          throw error; // Let Kafka handle retry logic
        }
      }
    });
  }

  /**
   * Create topics
   */
  async createTopics(topicConfigs: TopicConfig[]): Promise<void> {
    if (!this.admin) {
      await this.initializeAdmin();
    }

    const topics = topicConfigs.map(config => ({
      topic: config.topic,
      numPartitions: config.numPartitions || 3,
      replicationFactor: config.replicationFactor || 1,
      configEntries: config.configEntries || []
    }));

    await this.admin!.createTopics({
      topics,
      validateOnly: false,
      timeout: 30000
    });
  }

  /**
   * List all topics
   */
  async listTopics(): Promise<string[]> {
    if (!this.admin) {
      await this.initializeAdmin();
    }

    const metadata = await this.admin!.fetchTopicMetadata();
    return metadata.topics.map(topic => topic.name);
  }

  /**
   * Delete topics
   */
  async deleteTopics(topics: string[]): Promise<void> {
    if (!this.admin) {
      await this.initializeAdmin();
    }

    await this.admin!.deleteTopics({
      topics,
      timeout: 30000
    });
  }

  /**
   * Get consumer group info
   */
  async getConsumerGroups(): Promise<any[]> {
    if (!this.admin) {
      await this.initializeAdmin();
    }

    const groups = await this.admin!.listGroups();
    return groups.groups;
  }

  /**
   * Disconnect all clients
   */
  async disconnect(): Promise<void> {
    if (this.producer) {
      await this.producer.disconnect();
      this.producer = undefined;
    }

    for (const [groupId, consumer] of this.consumers.entries()) {
      await consumer.disconnect();
      this.consumers.delete(groupId);
    }

    if (this.admin) {
      await this.admin.disconnect();
      this.admin = undefined;
    }
  }

  /**
   * Parse Kafka headers to plain object
   */
  private parseHeaders(headers: any): Record<string, string> | undefined {
    if (!headers) return undefined;

    const parsedHeaders: Record<string, string> = {};
    Object.entries(headers).forEach(([key, value]) => {
      if (value) {
        parsedHeaders[key] = value.toString();
      }
    });

    return parsedHeaders;
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      if (!this.admin) {
        await this.initializeAdmin();
      }
      
      await this.admin!.listTopics();
      return true;
    } catch (error) {
      console.error('Kafka health check failed:', error);
      return false;
    }
  }
}