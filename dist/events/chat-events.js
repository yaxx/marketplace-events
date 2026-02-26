"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatDeletedEvent = exports.ChatArchivedEvent = exports.UserLeftChatEvent = exports.UserJoinedChatEvent = exports.MessageReadEvent = exports.MessageDeliveredEvent = exports.MessageSentEvent = exports.ChatCreatedEvent = exports.CHAT_EVENT_TYPES = void 0;
const base_event_1 = require("../types/base-event");
// Chat Event Types
exports.CHAT_EVENT_TYPES = {
    CHAT_CREATED: 'CHAT_CREATED',
    MESSAGE_SENT: 'MESSAGE_SENT',
    MESSAGE_DELIVERED: 'MESSAGE_DELIVERED',
    MESSAGE_READ: 'MESSAGE_READ',
    USER_JOINED_CHAT: 'USER_JOINED_CHAT',
    USER_LEFT_CHAT: 'USER_LEFT_CHAT',
    CHAT_ARCHIVED: 'CHAT_ARCHIVED',
    CHAT_DELETED: 'CHAT_DELETED'
};
// Chat Event Classes
class ChatCreatedEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.CHAT_EVENT_TYPES.CHAT_CREATED, data, 'messaging-service', correlationId);
    }
}
exports.ChatCreatedEvent = ChatCreatedEvent;
class MessageSentEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.CHAT_EVENT_TYPES.MESSAGE_SENT, data, 'messaging-service', correlationId);
    }
}
exports.MessageSentEvent = MessageSentEvent;
class MessageDeliveredEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.CHAT_EVENT_TYPES.MESSAGE_DELIVERED, data, 'messaging-service', correlationId);
    }
}
exports.MessageDeliveredEvent = MessageDeliveredEvent;
class MessageReadEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.CHAT_EVENT_TYPES.MESSAGE_READ, data, 'messaging-service', correlationId);
    }
}
exports.MessageReadEvent = MessageReadEvent;
class UserJoinedChatEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.CHAT_EVENT_TYPES.USER_JOINED_CHAT, data, 'messaging-service', correlationId);
    }
}
exports.UserJoinedChatEvent = UserJoinedChatEvent;
class UserLeftChatEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.CHAT_EVENT_TYPES.USER_LEFT_CHAT, data, 'messaging-service', correlationId);
    }
}
exports.UserLeftChatEvent = UserLeftChatEvent;
class ChatArchivedEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.CHAT_EVENT_TYPES.CHAT_ARCHIVED, data, 'messaging-service', correlationId);
    }
}
exports.ChatArchivedEvent = ChatArchivedEvent;
class ChatDeletedEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.CHAT_EVENT_TYPES.CHAT_DELETED, data, 'messaging-service', correlationId);
    }
}
exports.ChatDeletedEvent = ChatDeletedEvent;
