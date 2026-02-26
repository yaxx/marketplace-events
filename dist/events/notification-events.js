"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkNotificationSentEvent = exports.NotificationDismissedEvent = exports.NotificationClickedEvent = exports.NotificationFailedEvent = exports.NotificationDeliveredEvent = exports.NotificationSentEvent = exports.NotificationTriggeredEvent = exports.NOTIFICATION_EVENT_TYPES = void 0;
const base_event_1 = require("../types/base-event");
// Notification Event Types
exports.NOTIFICATION_EVENT_TYPES = {
    NOTIFICATION_TRIGGERED: 'NOTIFICATION_TRIGGERED',
    NOTIFICATION_SENT: 'NOTIFICATION_SENT',
    NOTIFICATION_DELIVERED: 'NOTIFICATION_DELIVERED',
    NOTIFICATION_FAILED: 'NOTIFICATION_FAILED',
    NOTIFICATION_CLICKED: 'NOTIFICATION_CLICKED',
    NOTIFICATION_DISMISSED: 'NOTIFICATION_DISMISSED',
    BULK_NOTIFICATION_SENT: 'BULK_NOTIFICATION_SENT'
};
// Notification Event Classes
class NotificationTriggeredEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.NOTIFICATION_EVENT_TYPES.NOTIFICATION_TRIGGERED, data, 'notification-service', correlationId);
    }
}
exports.NotificationTriggeredEvent = NotificationTriggeredEvent;
class NotificationSentEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.NOTIFICATION_EVENT_TYPES.NOTIFICATION_SENT, data, 'notification-service', correlationId);
    }
}
exports.NotificationSentEvent = NotificationSentEvent;
class NotificationDeliveredEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.NOTIFICATION_EVENT_TYPES.NOTIFICATION_DELIVERED, data, 'notification-service', correlationId);
    }
}
exports.NotificationDeliveredEvent = NotificationDeliveredEvent;
class NotificationFailedEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.NOTIFICATION_EVENT_TYPES.NOTIFICATION_FAILED, data, 'notification-service', correlationId);
    }
}
exports.NotificationFailedEvent = NotificationFailedEvent;
class NotificationClickedEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.NOTIFICATION_EVENT_TYPES.NOTIFICATION_CLICKED, data, 'notification-service', correlationId);
    }
}
exports.NotificationClickedEvent = NotificationClickedEvent;
class NotificationDismissedEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.NOTIFICATION_EVENT_TYPES.NOTIFICATION_DISMISSED, data, 'notification-service', correlationId);
    }
}
exports.NotificationDismissedEvent = NotificationDismissedEvent;
class BulkNotificationSentEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.NOTIFICATION_EVENT_TYPES.BULK_NOTIFICATION_SENT, data, 'notification-service', correlationId);
    }
}
exports.BulkNotificationSentEvent = BulkNotificationSentEvent;
