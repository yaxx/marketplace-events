"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketplaceKafkaClient = void 0;
const kafkajs_1 = require("kafkajs");
class MarketplaceKafkaClient {
    constructor(config) {
        this.consumers = new Map();
        this.config = config;
        const kafkaConfig = {
            clientId: config.clientId,
            brokers: config.brokers,
            ssl: config.ssl,
            sasl: config.sasl, // Type assertion for SASL config compatibility
            connectionTimeout: config.connectionTimeout || 3000,
            requestTimeout: config.requestTimeout || 25000,
            retry: config.retry || {
                retries: 3,
                initialRetryTime: 100,
                maxRetryTime: 30000
            },
            logLevel: config.logLevel || kafkajs_1.logLevel.INFO
        };
        this.kafka = new kafkajs_1.Kafka(kafkaConfig);
    }
    /**
     * Initialize producer
     */
    async initializeProducer() {
        if (this.producer)
            return;
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
    async initializeConsumer(groupId) {
        const consumerGroupId = groupId || this.config.groupId || `${this.config.clientId}-group`;
        if (this.consumers.has(consumerGroupId)) {
            return this.consumers.get(consumerGroupId);
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
    async initializeAdmin() {
        if (this.admin)
            return;
        this.admin = this.kafka.admin();
        await this.admin.connect();
    }
    /**
     * Publish event to topic
     */
    async publishEvent(message) {
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
        await this.producer.send({
            topic: message.topic,
            messages: [kafkaMessage]
        });
    }
    /**
     * Batch publish multiple events
     */
    async publishEvents(messages) {
        if (!this.producer) {
            await this.initializeProducer();
        }
        const topicMessages = new Map();
        messages.forEach(message => {
            if (!topicMessages.has(message.topic)) {
                topicMessages.set(message.topic, []);
            }
            topicMessages.get(message.topic).push({
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
        await this.producer.sendBatch({
            topicMessages: topicMessagesArray
        });
    }
    /**
     * Subscribe to topic and process messages
     */
    async subscribe(topics, messageHandler, groupId) {
        const consumer = await this.initializeConsumer(groupId);
        await consumer.subscribe({
            topics,
            fromBeginning: false
        });
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    if (!message.value)
                        return;
                    const eventPayload = JSON.parse(message.value.toString());
                    const consumerMessage = {
                        topic,
                        partition,
                        offset: message.offset,
                        key: message.key?.toString(),
                        value: eventPayload,
                        timestamp: message.timestamp,
                        headers: message.headers ? this.parseHeaders(message.headers) : undefined
                    };
                    console.log(`New registration ${message}:`);
                    await messageHandler(consumerMessage);
                }
                catch (error) {
                    console.error(`Error processing message from topic ${topic}:`, error);
                    throw error; // Let Kafka handle retry logic
                }
            }
        });
    }
    /**
     * Create topics
     */
    async createTopics(topicConfigs) {
        if (!this.admin) {
            await this.initializeAdmin();
        }
        const topics = topicConfigs.map(config => ({
            topic: config.topic,
            numPartitions: config.numPartitions || 3,
            replicationFactor: config.replicationFactor || 1,
            configEntries: config.configEntries || []
        }));
        await this.admin.createTopics({
            topics,
            validateOnly: false,
            timeout: 30000
        });
    }
    /**
     * List all topics
     */
    async listTopics() {
        if (!this.admin) {
            await this.initializeAdmin();
        }
        const metadata = await this.admin.fetchTopicMetadata();
        return metadata.topics.map(topic => topic.name);
    }
    /**
     * Delete topics
     */
    async deleteTopics(topics) {
        if (!this.admin) {
            await this.initializeAdmin();
        }
        await this.admin.deleteTopics({
            topics,
            timeout: 30000
        });
    }
    /**
     * Get consumer group info
     */
    async getConsumerGroups() {
        if (!this.admin) {
            await this.initializeAdmin();
        }
        const groups = await this.admin.listGroups();
        return groups.groups;
    }
    /**
     * Disconnect all clients
     */
    async disconnect() {
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
    parseHeaders(headers) {
        if (!headers)
            return undefined;
        const parsedHeaders = {};
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
    async healthCheck() {
        try {
            if (!this.admin) {
                await this.initializeAdmin();
            }
            await this.admin.listTopics();
            return true;
        }
        catch (error) {
            console.error('Kafka health check failed:', error);
            return false;
        }
    }
}
exports.MarketplaceKafkaClient = MarketplaceKafkaClient;
