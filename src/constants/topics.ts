export const MARKETPLACE_TOPICS = {
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
} as const;

export type MarketplaceTopic = typeof MARKETPLACE_TOPICS[keyof typeof MARKETPLACE_TOPICS];

export const TOPIC_CONFIGURATIONS = {
  [MARKETPLACE_TOPICS.USER_EVENTS]: {
    partitions: 3,
    replicationFactor: 1,
    retentionMs: 7 * 24 * 60 * 60 * 1000, // 7 days
    segmentMs: 24 * 60 * 60 * 1000, // 1 day
  },
  [MARKETPLACE_TOPICS.SELLER_EVENTS]: {
    partitions: 3,
    replicationFactor: 1,
    retentionMs: 7 * 24 * 60 * 60 * 1000, // 7 days
    segmentMs: 24 * 60 * 60 * 1000, // 1 day
  },
  [MARKETPLACE_TOPICS.REQUEST_EVENTS]: {
    partitions: 3,
    replicationFactor: 1,
    retentionMs: 7 * 24 * 60 * 60 * 1000, // 7 days
    segmentMs: 24 * 60 * 60 * 1000, // 1 day
  },
  [MARKETPLACE_TOPICS.OFFER_EVENTS]: {
    partitions: 3,
    replicationFactor: 1,
    retentionMs: 7 * 24 * 60 * 60 * 1000, // 7 days
    segmentMs: 24 * 60 * 60 * 1000, // 1 day
  },
  [MARKETPLACE_TOPICS.CHAT_EVENTS]: {
    partitions: 3,
    replicationFactor: 1,
    retentionMs: 7 * 24 * 60 * 60 * 1000, // 7 days
    segmentMs: 24 * 60 * 60 * 1000, // 1 day
  },
  [MARKETPLACE_TOPICS.NOTIFICATION_EVENTS]: {
    partitions: 3,
    replicationFactor: 1,
    retentionMs: 24 * 60 * 60 * 1000, // 1 day
    segmentMs: 60 * 60 * 1000, // 1 hour
  },
  // DLQ configurations
  [MARKETPLACE_TOPICS.USER_EVENTS_DLQ]: {
    partitions: 1,
    replicationFactor: 1,
    retentionMs: 30 * 24 * 60 * 60 * 1000, // 30 days
    segmentMs: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
  [MARKETPLACE_TOPICS.SELLER_EVENTS_DLQ]: {
    partitions: 1,
    replicationFactor: 1,
    retentionMs: 30 * 24 * 60 * 60 * 1000, // 30 days
    segmentMs: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
  [MARKETPLACE_TOPICS.REQUEST_EVENTS_DLQ]: {
    partitions: 1,
    replicationFactor: 1,
    retentionMs: 30 * 24 * 60 * 60 * 1000, // 30 days
    segmentMs: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
  [MARKETPLACE_TOPICS.OFFER_EVENTS_DLQ]: {
    partitions: 1,
    replicationFactor: 1,
    retentionMs: 30 * 24 * 60 * 60 * 1000, // 30 days
    segmentMs: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
  [MARKETPLACE_TOPICS.CHAT_EVENTS_DLQ]: {
    partitions: 1,
    replicationFactor: 1,
    retentionMs: 30 * 24 * 60 * 60 * 1000, // 30 days
    segmentMs: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
  [MARKETPLACE_TOPICS.NOTIFICATION_EVENTS_DLQ]: {
    partitions: 1,
    replicationFactor: 1,
    retentionMs: 30 * 24 * 60 * 60 * 1000, // 30 days
    segmentMs: 7 * 24 * 60 * 60 * 1000, // 7 days
  }
} as const;

// Service to topic mapping
export const SERVICE_TOPICS = {
  'account-service': [MARKETPLACE_TOPICS.USER_EVENTS],
  'search-service': [
    MARKETPLACE_TOPICS.REQUEST_EVENTS,
    MARKETPLACE_TOPICS.OFFER_EVENTS,
    MARKETPLACE_TOPICS.SELLER_EVENTS
  ],
  'messaging-service': [MARKETPLACE_TOPICS.CHAT_EVENTS],
  'notification-service': [MARKETPLACE_TOPICS.NOTIFICATION_EVENTS]
} as const;

// Consumer group naming convention
export const getConsumerGroupId = (serviceName: string, purpose?: string): string => {
  const baseName = `${serviceName}-consumer`;
  return purpose ? `${baseName}-${purpose}` : baseName;
};

// Topic validation
export const isValidMarketplaceTopic = (topic: string): topic is MarketplaceTopic => {
  return Object.values(MARKETPLACE_TOPICS).includes(topic as MarketplaceTopic);
};

// Get DLQ topic for main topic
export const getDLQTopic = (mainTopic: MarketplaceTopic): string => {
  return `${mainTopic}.dlq`;
};

// Environment-specific topic prefixes
export const getEnvironmentTopic = (topic: MarketplaceTopic, environment: string = 'dev'): string => {
  if (environment === 'production') {
    return topic; // No prefix for production
  }
  return `${environment}.${topic}`;
};