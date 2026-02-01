import { BaseEvent, BaseEventData } from '../types/base-event';

// Notification Event Types
export const NOTIFICATION_EVENT_TYPES = {
  NOTIFICATION_TRIGGERED: 'NOTIFICATION_TRIGGERED',
  NOTIFICATION_SENT: 'NOTIFICATION_SENT',
  NOTIFICATION_DELIVERED: 'NOTIFICATION_DELIVERED',
  NOTIFICATION_FAILED: 'NOTIFICATION_FAILED',
  NOTIFICATION_CLICKED: 'NOTIFICATION_CLICKED',
  NOTIFICATION_DISMISSED: 'NOTIFICATION_DISMISSED',
  BULK_NOTIFICATION_SENT: 'BULK_NOTIFICATION_SENT'
} as const;

export type NotificationEventType = typeof NOTIFICATION_EVENT_TYPES[keyof typeof NOTIFICATION_EVENT_TYPES];

// Notification Event Data Interfaces
// Aligned with Notification service types
export type NotificationCategory = 
  | 'request_matched'    // Seller receives notification about new matching request
  | 'offer_received'     // Buyer receives notification about new offer
  | 'offer_accepted'     // Seller gets notified their offer was accepted
  | 'offer_rejected'     // Seller gets notified their offer was rejected
  | 'chat_message'       // New message in chat
  | 'chat_created'       // New chat conversation started
  | 'seller_online'      // Notify buyers when subscribed seller comes online
  | 'request_expired'    // Notify buyer their request expired
  | 'offer_expired'      // Notify seller their offer expired
  | 'general';           // General announcements

export interface NotificationTriggeredData extends BaseEventData {
  notificationId: string;
  userId: string;
  title: string;
  body: string;
  data?: Record<string, string>;
  imageUrl?: string;
  type: NotificationCategory;
  priority: 'low' | 'normal' | 'high';
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  sentAt?: string;
  deliveredAt?: string;
  createdAt: string;
  expiresAt?: string;
  // Extended fields for event tracking
  triggerEvent?: {
    eventType: string;
    eventId: string;
    source: string;
    correlationId: string;
  };
  template?: {
    id: string;
    variables: Record<string, any>;
  };
}

export interface NotificationSentData extends BaseEventData {
  notificationId: string;
  userId: string;
  title: string;
  body: string;
  data?: Record<string, string>;
  imageUrl?: string;
  type: NotificationCategory;
  priority: 'low' | 'normal' | 'high';
  status: 'sent';
  sentAt: string;
  // Extended fields for delivery tracking
  channel?: 'fcm' | 'apns' | 'email' | 'sms' | 'websocket';
  deliveryAttempt?: number;
  batchId?: string;
  deviceToken?: string;
  messageId?: string; // External provider message ID
}

export interface NotificationDeliveredData extends BaseEventData {
  notificationId: string;
  recipientId: string;
  channel: 'fcm' | 'apns' | 'email' | 'sms' | 'websocket';
  deliveredAt: string;
  deliveryLatency: number; // milliseconds from sent to delivered
  deviceInfo?: {
    platform: string;
    version: string;
    deviceId: string;
  };
  providerResponse?: {
    messageId: string;
    status: string;
    metadata?: Record<string, any>;
  };
}

export interface NotificationFailedData extends BaseEventData {
  notificationId: string;
  recipientId: string;
  channel: 'fcm' | 'apns' | 'email' | 'sms' | 'websocket';
  failedAt: string;
  failureReason: string;
  errorCode?: string;
  retryAttempt: number;
  maxRetries: number;
  willRetry: boolean;
  nextRetryAt?: string;
  deviceToken?: string;
  providerError?: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
}

export interface NotificationClickedData extends BaseEventData {
  notificationId: string;
  recipientId: string;
  clickedAt: string;
  actionTaken: string;
  clickSource: 'notification_body' | 'action_button' | 'deep_link';
  deviceInfo: {
    platform: string;
    version: string;
    deviceId: string;
    appVersion: string;
  };
  contextData?: {
    screenName?: string;
    userAction?: string;
    additionalData?: Record<string, any>;
  };
}

export interface NotificationDismissedData extends BaseEventData {
  notificationId: string;
  recipientId: string;
  dismissedAt: string;
  dismissalReason: 'user_swipe' | 'auto_timeout' | 'app_clear' | 'system_clear';
  timeDisplayed: number; // milliseconds notification was visible
  deviceInfo: {
    platform: string;
    version: string;
    deviceId: string;
  };
}

export interface BulkNotificationSentData extends BaseEventData {
  batchId: string;
  campaign: {
    name: string;
    type: 'marketing' | 'system' | 'urgent' | 'announcement';
    targetAudience: string;
  };
  recipients: {
    total: number;
    successful: number;
    failed: number;
    pending: number;
  };
  content: {
    title: string;
    body: string;
    imageUrl?: string;
    actionUrl?: string;
  };
  channels: ('fcm' | 'apns' | 'email' | 'sms')[];
  sentAt: string;
  estimatedDeliveryTime: string;
  segmentation?: {
    criteria: Record<string, any>;
    includedUsers: number;
    excludedUsers: number;
  };
}

// Notification Event Classes
export class NotificationTriggeredEvent extends BaseEvent<NotificationTriggeredData> {
  constructor(data: NotificationTriggeredData, correlationId?: string) {
    super(NOTIFICATION_EVENT_TYPES.NOTIFICATION_TRIGGERED, data, 'notification-service', correlationId);
  }
}

export class NotificationSentEvent extends BaseEvent<NotificationSentData> {
  constructor(data: NotificationSentData, correlationId?: string) {
    super(NOTIFICATION_EVENT_TYPES.NOTIFICATION_SENT, data, 'notification-service', correlationId);
  }
}

export class NotificationDeliveredEvent extends BaseEvent<NotificationDeliveredData> {
  constructor(data: NotificationDeliveredData, correlationId?: string) {
    super(NOTIFICATION_EVENT_TYPES.NOTIFICATION_DELIVERED, data, 'notification-service', correlationId);
  }
}

export class NotificationFailedEvent extends BaseEvent<NotificationFailedData> {
  constructor(data: NotificationFailedData, correlationId?: string) {
    super(NOTIFICATION_EVENT_TYPES.NOTIFICATION_FAILED, data, 'notification-service', correlationId);
  }
}

export class NotificationClickedEvent extends BaseEvent<NotificationClickedData> {
  constructor(data: NotificationClickedData, correlationId?: string) {
    super(NOTIFICATION_EVENT_TYPES.NOTIFICATION_CLICKED, data, 'notification-service', correlationId);
  }
}

export class NotificationDismissedEvent extends BaseEvent<NotificationDismissedData> {
  constructor(data: NotificationDismissedData, correlationId?: string) {
    super(NOTIFICATION_EVENT_TYPES.NOTIFICATION_DISMISSED, data, 'notification-service', correlationId);
  }
}

export class BulkNotificationSentEvent extends BaseEvent<BulkNotificationSentData> {
  constructor(data: BulkNotificationSentData, correlationId?: string) {
    super(NOTIFICATION_EVENT_TYPES.BULK_NOTIFICATION_SENT, data, 'notification-service', correlationId);
  }
}

// Union type for all notification events
export type NotificationEvent = 
  | NotificationTriggeredEvent
  | NotificationSentEvent
  | NotificationDeliveredEvent
  | NotificationFailedEvent
  | NotificationClickedEvent
  | NotificationDismissedEvent
  | BulkNotificationSentEvent;

// Union type for all notification event data
export type NotificationEventData = 
  | NotificationTriggeredData
  | NotificationSentData
  | NotificationDeliveredData
  | NotificationFailedData
  | NotificationClickedData
  | NotificationDismissedData
  | BulkNotificationSentData;