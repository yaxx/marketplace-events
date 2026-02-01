// Base types and classes
export * from './types/base-event';

// Event schemas
export * from './events/user-events';
export * from './events/request-events';
export * from './events/offer-events';
export * from './events/chat-events';
export * from './events/notification-events';

// Kafka client and utilities
export * from './kafka/kafka-client';

// Constants and configurations
export * from './constants/topics';

// Union types for all events
import { UserEvent, UserEventData } from './events/user-events';
import { RequestEvent, RequestEventData } from './events/request-events';
import { OfferEvent, OfferEventData } from './events/offer-events';
import { ChatEvent, ChatEventData } from './events/chat-events';
import { NotificationEvent, NotificationEventData } from './events/notification-events';

export type MarketplaceEvent = 
  | UserEvent
  | RequestEvent
  | OfferEvent
  | ChatEvent
  | NotificationEvent;

export type MarketplaceEventData = 
  | UserEventData
  | RequestEventData
  | OfferEventData
  | ChatEventData
  | NotificationEventData;

// Service adapters
export * from './adapters';

// Convenience re-exports
export {
  MarketplaceKafkaClient as KafkaClient,
  type MarketplaceKafkaConfig as KafkaConfig,
  type TopicConfig,
  type ProducerMessage,
  type ConsumerMessage
} from './kafka/kafka-client';

export {
  MARKETPLACE_TOPICS as TOPICS,
  type MarketplaceTopic as Topic
} from './constants/topics';
