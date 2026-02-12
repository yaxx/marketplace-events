export declare const MARKETPLACE_TOPICS: {
    readonly USER_EVENTS: "marketplace.user.events";
    readonly SELLER_EVENTS: "marketplace.seller.events";
    readonly REQUEST_EVENTS: "marketplace.request.events";
    readonly OFFER_EVENTS: "marketplace.offer.events";
    readonly CHAT_EVENTS: "marketplace.chat.events";
    readonly NOTIFICATION_EVENTS: "marketplace.notification.events";
    readonly USER_EVENTS_DLQ: "marketplace.user.events.dlq";
    readonly SELLER_EVENTS_DLQ: "marketplace.seller.events.dlq";
    readonly REQUEST_EVENTS_DLQ: "marketplace.request.events.dlq";
    readonly OFFER_EVENTS_DLQ: "marketplace.offer.events.dlq";
    readonly CHAT_EVENTS_DLQ: "marketplace.chat.events.dlq";
    readonly NOTIFICATION_EVENTS_DLQ: "marketplace.notification.events.dlq";
};
export type MarketplaceTopic = typeof MARKETPLACE_TOPICS[keyof typeof MARKETPLACE_TOPICS];
export declare const TOPIC_CONFIGURATIONS: {
    readonly "marketplace.user.events": {
        readonly partitions: 3;
        readonly replicationFactor: 1;
        readonly retentionMs: number;
        readonly segmentMs: number;
    };
    readonly "marketplace.seller.events": {
        readonly partitions: 3;
        readonly replicationFactor: 1;
        readonly retentionMs: number;
        readonly segmentMs: number;
    };
    readonly "marketplace.request.events": {
        readonly partitions: 3;
        readonly replicationFactor: 1;
        readonly retentionMs: number;
        readonly segmentMs: number;
    };
    readonly "marketplace.offer.events": {
        readonly partitions: 3;
        readonly replicationFactor: 1;
        readonly retentionMs: number;
        readonly segmentMs: number;
    };
    readonly "marketplace.chat.events": {
        readonly partitions: 3;
        readonly replicationFactor: 1;
        readonly retentionMs: number;
        readonly segmentMs: number;
    };
    readonly "marketplace.notification.events": {
        readonly partitions: 3;
        readonly replicationFactor: 1;
        readonly retentionMs: number;
        readonly segmentMs: number;
    };
    readonly "marketplace.user.events.dlq": {
        readonly partitions: 1;
        readonly replicationFactor: 1;
        readonly retentionMs: number;
        readonly segmentMs: number;
    };
    readonly "marketplace.seller.events.dlq": {
        readonly partitions: 1;
        readonly replicationFactor: 1;
        readonly retentionMs: number;
        readonly segmentMs: number;
    };
    readonly "marketplace.request.events.dlq": {
        readonly partitions: 1;
        readonly replicationFactor: 1;
        readonly retentionMs: number;
        readonly segmentMs: number;
    };
    readonly "marketplace.offer.events.dlq": {
        readonly partitions: 1;
        readonly replicationFactor: 1;
        readonly retentionMs: number;
        readonly segmentMs: number;
    };
    readonly "marketplace.chat.events.dlq": {
        readonly partitions: 1;
        readonly replicationFactor: 1;
        readonly retentionMs: number;
        readonly segmentMs: number;
    };
    readonly "marketplace.notification.events.dlq": {
        readonly partitions: 1;
        readonly replicationFactor: 1;
        readonly retentionMs: number;
        readonly segmentMs: number;
    };
};
export declare const SERVICE_TOPICS: {
    readonly 'account-service': readonly ["marketplace.user.events"];
    readonly 'search-service': readonly ["marketplace.request.events", "marketplace.offer.events", "marketplace.seller.events"];
    readonly 'messaging-service': readonly ["marketplace.chat.events"];
    readonly 'notification-service': readonly ["marketplace.notification.events"];
};
export declare const getConsumerGroupId: (serviceName: string, purpose?: string) => string;
export declare const isValidMarketplaceTopic: (topic: string) => topic is MarketplaceTopic;
export declare const getDLQTopic: (mainTopic: MarketplaceTopic) => string;
export declare const getEnvironmentTopic: (topic: MarketplaceTopic, environment?: string) => string;
