"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEvent = void 0;
const uuid_1 = require("uuid");
class BaseEvent {
    constructor(eventType, data, source, correlationId, version = '1.0') {
        this.eventId = (0, uuid_1.v4)();
        this.eventType = eventType;
        this.version = version;
        this.timestamp = new Date().toISOString();
        this.source = source;
        this.correlationId = correlationId || (0, uuid_1.v4)();
        this.data = data;
    }
    /**
     * Serialize event to JSON string
     */
    toJSON() {
        return JSON.stringify(this);
    }
    /**
     * Convert to plain object
     */
    toObject() {
        return {
            eventId: this.eventId,
            eventType: this.eventType,
            version: this.version,
            timestamp: this.timestamp,
            source: this.source,
            correlationId: this.correlationId,
            data: this.data
        };
    }
    /**
     * Validate event structure
     */
    isValid() {
        return !!(this.eventId &&
            this.eventType &&
            this.version &&
            this.timestamp &&
            this.source &&
            this.correlationId &&
            this.data);
    }
}
exports.BaseEvent = BaseEvent;
