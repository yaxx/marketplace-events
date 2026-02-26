"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferCounterProposedEvent = exports.OfferExpiredEvent = exports.OfferWithdrawnEvent = exports.OfferRejectedEvent = exports.OfferAcceptedEvent = exports.OfferUpdatedEvent = exports.OfferCreatedEvent = exports.OFFER_EVENT_TYPES = void 0;
const base_event_1 = require("../types/base-event");
// Offer Event Types
exports.OFFER_EVENT_TYPES = {
    OFFER_CREATED: 'OFFER_CREATED',
    OFFER_UPDATED: 'OFFER_UPDATED',
    OFFER_ACCEPTED: 'OFFER_ACCEPTED',
    OFFER_REJECTED: 'OFFER_REJECTED',
    OFFER_WITHDRAWN: 'OFFER_WITHDRAWN',
    OFFER_EXPIRED: 'OFFER_EXPIRED',
    OFFER_COUNTER_PROPOSED: 'OFFER_COUNTER_PROPOSED'
};
// Offer Event Classes
class OfferCreatedEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.OFFER_EVENT_TYPES.OFFER_CREATED, data, 'search-service', correlationId);
    }
}
exports.OfferCreatedEvent = OfferCreatedEvent;
class OfferUpdatedEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.OFFER_EVENT_TYPES.OFFER_UPDATED, data, 'search-service', correlationId);
    }
}
exports.OfferUpdatedEvent = OfferUpdatedEvent;
class OfferAcceptedEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.OFFER_EVENT_TYPES.OFFER_ACCEPTED, data, 'search-service', correlationId);
    }
}
exports.OfferAcceptedEvent = OfferAcceptedEvent;
class OfferRejectedEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.OFFER_EVENT_TYPES.OFFER_REJECTED, data, 'search-service', correlationId);
    }
}
exports.OfferRejectedEvent = OfferRejectedEvent;
class OfferWithdrawnEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.OFFER_EVENT_TYPES.OFFER_WITHDRAWN, data, 'search-service', correlationId);
    }
}
exports.OfferWithdrawnEvent = OfferWithdrawnEvent;
class OfferExpiredEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.OFFER_EVENT_TYPES.OFFER_EXPIRED, data, 'search-service', correlationId);
    }
}
exports.OfferExpiredEvent = OfferExpiredEvent;
class OfferCounterProposedEvent extends base_event_1.BaseEvent {
    constructor(data, correlationId) {
        super(exports.OFFER_EVENT_TYPES.OFFER_COUNTER_PROPOSED, data, 'search-service', correlationId);
    }
}
exports.OfferCounterProposedEvent = OfferCounterProposedEvent;
