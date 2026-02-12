"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeletedEvent = exports.UserStatusChangedEvent = exports.UserProfileUpdatedEvent = exports.UserRegisteredEvent = exports.USER_EVENT_TYPES = void 0;
const base_event_1 = require("../types/base-event");
// User Event Types
exports.USER_EVENT_TYPES = {
    USER_REGISTERED: 'USER_REGISTERED',
    USER_LOGIN: 'USER_LOGIN',
    USER_PROFILE_UPDATED: 'USER_PROFILE_UPDATED',
    USER_STATUS_CHANGED: 'USER_STATUS_CHANGED',
    USER_DELETED: 'USER_DELETED'
};
// User Event Classes
class UserRegisteredEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.USER_EVENT_TYPES.USER_REGISTERED, data, 'account-service', correlationId);
    }
}
exports.UserRegisteredEvent = UserRegisteredEvent;
class UserProfileUpdatedEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.USER_EVENT_TYPES.USER_PROFILE_UPDATED, data, 'account-service', correlationId);
    }
}
exports.UserProfileUpdatedEvent = UserProfileUpdatedEvent;
class UserStatusChangedEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.USER_EVENT_TYPES.USER_STATUS_CHANGED, data, 'account-service', correlationId);
    }
}
exports.UserStatusChangedEvent = UserStatusChangedEvent;
class UserDeletedEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.USER_EVENT_TYPES.USER_DELETED, data, 'account-service', correlationId);
    }
}
exports.UserDeletedEvent = UserDeletedEvent;
