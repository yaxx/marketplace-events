export interface BaseEventData {
    [key: string]: any;
}
export declare abstract class BaseEvent<T extends BaseEventData = BaseEventData> {
    readonly eventId: string;
    readonly eventType: string;
    readonly version: string;
    readonly timestamp: string;
    readonly source: string;
    readonly correlationId: string;
    readonly data: T;
    constructor(eventType: string, data: T, source: string, correlationId?: string, version?: string);
    /**
     * Serialize event to JSON string
     */
    toJSON(): string;
    /**
     * Convert to plain object
     */
    toObject(): EventPayload<T>;
    /**
     * Validate event structure
     */
    isValid(): boolean;
}
export interface EventPayload<T extends BaseEventData = BaseEventData> {
    eventId: string;
    eventType: string;
    version: string;
    timestamp: string;
    source: string;
    correlationId: string;
    data: T;
}
export interface EventMetadata {
    topic: string;
    partition?: number;
    key?: string;
    headers?: Record<string, string>;
}
export interface EventEnvelope<T extends BaseEventData = BaseEventData> {
    event: EventPayload<T>;
    metadata: EventMetadata;
}
export interface EventProcessingResult {
    success: boolean;
    eventId: string;
    error?: Error;
    processingTimeMs?: number;
}
export interface DeadLetterEvent<T extends BaseEventData = BaseEventData> {
    originalEvent: EventPayload<T>;
    failureReason: string;
    failureCount: number;
    lastFailureTime: string;
    originalTopic: string;
}
export type EventHandler<T extends BaseEventData = BaseEventData> = (event: EventPayload<T>) => Promise<EventProcessingResult>;
export type EventFilter<T extends BaseEventData = BaseEventData> = (event: EventPayload<T>) => boolean;
