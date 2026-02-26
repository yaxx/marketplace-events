import { Consumer, logLevel } from 'kafkajs';
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
export declare class MarketplaceKafkaClient {
    private kafka;
    private producer?;
    private consumers;
    private admin?;
    private config;
    constructor(config: MarketplaceKafkaConfig);
    /**
     * Initialize producer
     */
    initializeProducer(): Promise<void>;
    /**
     * Initialize consumer with group ID
     */
    initializeConsumer(groupId?: string): Promise<Consumer>;
    /**
     * Initialize admin client
     */
    initializeAdmin(): Promise<void>;
    /**
     * Publish event to topic
     */
    publishEvent<T extends BaseEventData = BaseEventData>(message: ProducerMessage<T>): Promise<void>;
    /**
     * Batch publish multiple events
     */
    publishEvents<T extends BaseEventData = BaseEventData>(messages: ProducerMessage<T>[]): Promise<void>;
    /**
     * Subscribe to topic and process messages
     */
    subscribe<T extends BaseEventData = BaseEventData>(topics: string[], messageHandler: (message: ConsumerMessage<T>) => Promise<void>, groupId?: string): Promise<void>;
    /**
     * Create topics
     */
    createTopics(topicConfigs: TopicConfig[]): Promise<void>;
    /**
     * List all topics
     */
    listTopics(): Promise<string[]>;
    /**
     * Delete topics
     */
    deleteTopics(topics: string[]): Promise<void>;
    /**
     * Get consumer group info
     */
    getConsumerGroups(): Promise<any[]>;
    /**
     * Disconnect all clients
     */
    disconnect(): Promise<void>;
    /**
     * Parse Kafka headers to plain object
     */
    private parseHeaders;
    /**
     * Health check
     */
    healthCheck(): Promise<boolean>;
}
