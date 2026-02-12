"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironmentTopic = exports.getDLQTopic = exports.isValidMarketplaceTopic = exports.getConsumerGroupId = exports.SERVICE_TOPICS = exports.TOPIC_CONFIGURATIONS = exports.MARKETPLACE_TOPICS = void 0;
exports.MARKETPLACE_TOPICS = {
    // Main event topics
    USER_EVENTS: 'marketplace.user.events',
    SELLER_EVENTS: 'marketplace.seller.events',
    REQUEST_EVENTS: 'marketplace.request.events',
    OFFER_EVENTS: 'marketplace.offer.events',
    CHAT_EVENTS: 'marketplace.chat.events',
    NOTIFICATION_EVENTS: 'marketplace.notification.events',
    // Dead letter queue topics
    USER_EVENTS_DLQ: 'marketplace.user.events.dlq',
    SELLER_EVENTS_DLQ: 'marketplace.seller.events.dlq',
    REQUEST_EVENTS_DLQ: 'marketplace.request.events.dlq',
    OFFER_EVENTS_DLQ: 'marketplace.offer.events.dlq',
    CHAT_EVENTS_DLQ: 'marketplace.chat.events.dlq',
    NOTIFICATION_EVENTS_DLQ: 'marketplace.notification.events.dlq'
};
exports.TOPIC_CONFIGURATIONS = {
    [exports.MARKETPLACE_TOPICS.USER_EVENTS]: {
        partitions: 3,
        replicationFactor: 1,
        retentionMs: 7 * 24 * 60 * 60 * 1000, // 7 days
        segmentMs: 24 * 60 * 60 * 1000, // 1 day
    },
    [exports.MARKETPLACE_TOPICS.SELLER_EVENTS]: {
        partitions: 3,
        replicationFactor: 1,
        retentionMs: 7 * 24 * 60 * 60 * 1000, // 7 days
        segmentMs: 24 * 60 * 60 * 1000, // 1 day
    },
    [exports.MARKETPLACE_TOPICS.REQUEST_EVENTS]: {
        partitions: 3,
        replicationFactor: 1,
        retentionMs: 7 * 24 * 60 * 60 * 1000, // 7 days
        segmentMs: 24 * 60 * 60 * 1000, // 1 day
    },
    [exports.MARKETPLACE_TOPICS.OFFER_EVENTS]: {
        partitions: 3,
        replicationFactor: 1,
        retentionMs: 7 * 24 * 60 * 60 * 1000, // 7 days
        segmentMs: 24 * 60 * 60 * 1000, // 1 day
    },
    [exports.MARKETPLACE_TOPICS.CHAT_EVENTS]: {
        partitions: 3,
        replicationFactor: 1,
        retentionMs: 7 * 24 * 60 * 60 * 1000, // 7 days
        segmentMs: 24 * 60 * 60 * 1000, // 1 day
    },
    [exports.MARKETPLACE_TOPICS.NOTIFICATION_EVENTS]: {
        partitions: 3,
        replicationFactor: 1,
        retentionMs: 24 * 60 * 60 * 1000, // 1 day
        segmentMs: 60 * 60 * 1000, // 1 hour
    },
    // DLQ configurations
    [exports.MARKETPLACE_TOPICS.USER_EVENTS_DLQ]: {
        partitions: 1,
        replicationFactor: 1,
        retentionMs: 30 * 24 * 60 * 60 * 1000, // 30 days
        segmentMs: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
    [exports.MARKETPLACE_TOPICS.SELLER_EVENTS_DLQ]: {
        partitions: 1,
        replicationFactor: 1,
        retentionMs: 30 * 24 * 60 * 60 * 1000, // 30 days
        segmentMs: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
    [exports.MARKETPLACE_TOPICS.REQUEST_EVENTS_DLQ]: {
        partitions: 1,
        replicationFactor: 1,
        retentionMs: 30 * 24 * 60 * 60 * 1000, // 30 days
        segmentMs: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
    [exports.MARKETPLACE_TOPICS.OFFER_EVENTS_DLQ]: {
        partitions: 1,
        replicationFactor: 1,
        retentionMs: 30 * 24 * 60 * 60 * 1000, // 30 days
        segmentMs: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
    [exports.MARKETPLACE_TOPICS.CHAT_EVENTS_DLQ]: {
        partitions: 1,
        replicationFactor: 1,
        retentionMs: 30 * 24 * 60 * 60 * 1000, // 30 days
        segmentMs: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
    [exports.MARKETPLACE_TOPICS.NOTIFICATION_EVENTS_DLQ]: {
        partitions: 1,
        replicationFactor: 1,
        retentionMs: 30 * 24 * 60 * 60 * 1000, // 30 days
        segmentMs: 7 * 24 * 60 * 60 * 1000, // 7 days
    }
};
// Service to topic mapping
exports.SERVICE_TOPICS = {
    'account-service': [exports.MARKETPLACE_TOPICS.USER_EVENTS],
    'search-service': [
        exports.MARKETPLACE_TOPICS.REQUEST_EVENTS,
        exports.MARKETPLACE_TOPICS.OFFER_EVENTS,
        exports.MARKETPLACE_TOPICS.SELLER_EVENTS
    ],
    'messaging-service': [exports.MARKETPLACE_TOPICS.CHAT_EVENTS],
    'notification-service': [exports.MARKETPLACE_TOPICS.NOTIFICATION_EVENTS]
};
// Consumer group naming convention
const getConsumerGroupId = (serviceName, purpose) => {
    const baseName = `${serviceName}-consumer`;
    return purpose ? `${baseName}-${purpose}` : baseName;
};
exports.getConsumerGroupId = getConsumerGroupId;
// Topic validation
const isValidMarketplaceTopic = (topic) => {
    return Object.values(exports.MARKETPLACE_TOPICS).includes(topic);
};
exports.isValidMarketplaceTopic = isValidMarketplaceTopic;
// Get DLQ topic for main topic
const getDLQTopic = (mainTopic) => {
    return `${mainTopic}.dlq`;
};
exports.getDLQTopic = getDLQTopic;
// Environment-specific topic prefixes
const getEnvironmentTopic = (topic, environment = 'dev') => {
    if (environment === 'production') {
        return topic; // No prefix for production
    }
    return `${environment}.${topic}`;
};
exports.getEnvironmentTopic = getEnvironmentTopic;
