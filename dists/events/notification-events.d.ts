import { BaseEvent, BaseEventData } from '../types/base-event';
export declare const NOTIFICATION_EVENT_TYPES: {
    readonly NOTIFICATION_TRIGGERED: "NOTIFICATION_TRIGGERED";
    readonly NOTIFICATION_SENT: "NOTIFICATION_SENT";
    readonly NOTIFICATION_DELIVERED: "NOTIFICATION_DELIVERED";
    readonly NOTIFICATION_FAILED: "NOTIFICATION_FAILED";
    readonly NOTIFICATION_CLICKED: "NOTIFICATION_CLICKED";
    readonly NOTIFICATION_DISMISSED: "NOTIFICATION_DISMISSED";
    readonly BULK_NOTIFICATION_SENT: "BULK_NOTIFICATION_SENT";
};
export type NotificationEventType = typeof NOTIFICATION_EVENT_TYPES[keyof typeof NOTIFICATION_EVENT_TYPES];
export type NotificationCategory = 'request_matched' | 'offer_received' | 'offer_accepted' | 'offer_rejected' | 'chat_message' | 'chat_created' | 'seller_online' | 'request_expired' | 'offer_expired' | 'general';
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
    channel?: 'fcm' | 'apns' | 'email' | 'sms' | 'websocket';
    deliveryAttempt?: number;
    batchId?: string;
    deviceToken?: string;
    messageId?: string;
}
export interface NotificationDeliveredData extends BaseEventData {
    notificationId: string;
    recipientId: string;
    channel: 'fcm' | 'apns' | 'email' | 'sms' | 'websocket';
    deliveredAt: string;
    deliveryLatency: number;
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
    timeDisplayed: number;
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
export declare class NotificationTriggeredEvent extends BaseEvent<NotificationTriggeredData> {
    constructor(data: NotificationTriggeredData, correlationId?: string);
}
export declare class NotificationSentEvent extends BaseEvent<NotificationSentData> {
    constructor(data: NotificationSentData, correlationId?: string);
}
export declare class NotificationDeliveredEvent extends BaseEvent<NotificationDeliveredData> {
    constructor(data: NotificationDeliveredData, correlationId?: string);
}
export declare class NotificationFailedEvent extends BaseEvent<NotificationFailedData> {
    constructor(data: NotificationFailedData, correlationId?: string);
}
export declare class NotificationClickedEvent extends BaseEvent<NotificationClickedData> {
    constructor(data: NotificationClickedData, correlationId?: string);
}
export declare class NotificationDismissedEvent extends BaseEvent<NotificationDismissedData> {
    constructor(data: NotificationDismissedData, correlationId?: string);
}
export declare class BulkNotificationSentEvent extends BaseEvent<BulkNotificationSentData> {
    constructor(data: BulkNotificationSentData, correlationId?: string);
}
export type NotificationEvent = NotificationTriggeredEvent | NotificationSentEvent | NotificationDeliveredEvent | NotificationFailedEvent | NotificationClickedEvent | NotificationDismissedEvent | BulkNotificationSentEvent;
export type NotificationEventData = NotificationTriggeredData | NotificationSentData | NotificationDeliveredData | NotificationFailedData | NotificationClickedData | NotificationDismissedData | BulkNotificationSentData;
