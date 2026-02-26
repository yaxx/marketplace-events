"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestCancelledEvent = exports.RequestExpiredEvent = exports.RequestCompletedEvent = exports.RequestUpdatedEvent = exports.RequestMatchedEvent = exports.RequestCreatedEvent = exports.REQUEST_EVENT_TYPES = void 0;
const base_event_1 = require("../types/base-event");
// Request Event Types
exports.REQUEST_EVENT_TYPES = {
    REQUEST_CREATED: 'REQUEST_CREATED',
    REQUEST_MATCHED: 'REQUEST_MATCHED',
    REQUEST_UPDATED: 'REQUEST_UPDATED',
    REQUEST_COMPLETED: 'REQUEST_COMPLETED',
    REQUEST_EXPIRED: 'REQUEST_EXPIRED',
    REQUEST_CANCELLED: 'REQUEST_CANCELLED'
};
// Request Event Classes
class RequestCreatedEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.REQUEST_EVENT_TYPES.REQUEST_CREATED, data, 'search-service', correlationId);
    }
}
exports.RequestCreatedEvent = RequestCreatedEvent;
class RequestMatchedEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.REQUEST_EVENT_TYPES.REQUEST_MATCHED, data, 'search-service', correlationId);
    }
}
exports.RequestMatchedEvent = RequestMatchedEvent;
class RequestUpdatedEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.REQUEST_EVENT_TYPES.REQUEST_UPDATED, data, 'search-service', correlationId);
    }
}
exports.RequestUpdatedEvent = RequestUpdatedEvent;
class RequestCompletedEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.REQUEST_EVENT_TYPES.REQUEST_COMPLETED, data, 'search-service', correlationId);
    }
}
exports.RequestCompletedEvent = RequestCompletedEvent;
class RequestExpiredEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.REQUEST_EVENT_TYPES.REQUEST_EXPIRED, data, 'search-service', correlationId);
    }
}
exports.RequestExpiredEvent = RequestExpiredEvent;
class RequestCancelledEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.REQUEST_EVENT_TYPES.REQUEST_CANCELLED, data, 'search-service', correlationId);
    }
}
exports.RequestCancelledEvent = RequestCancelledEvent;
