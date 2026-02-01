import { v4 as uuidv4 } from 'uuid';

export interface BaseEventData {
  [key: string]: any;
}

export abstract class BaseEvent<T extends BaseEventData = BaseEventData> {
  public readonly eventId: string;
  public readonly eventType: string;
  public readonly version: string;
  public readonly timestamp: string;
  public readonly source: string;
  public readonly correlationId: string;
  public readonly data: T;

  constructor(
    eventType: string,
    data: T,
    source: string,
    correlationId?: string,
    version: string = '1.0'
  ) {
    this.eventId = uuidv4();
    this.eventType = eventType;
    this.version = version;
    this.timestamp = new Date().toISOString();
    this.source = source;
    this.correlationId = correlationId || uuidv4();
    this.data = data;
  }

  /**
   * Serialize event to JSON string
   */
  toJSON(): string {
    return JSON.stringify(this);
  }

  /**
   * Convert to plain object
   */
  toObject(): EventPayload<T> {
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
  isValid(): boolean {
    return !!(
      this.eventId &&
      this.eventType &&
      this.version &&
      this.timestamp &&
      this.source &&
      this.correlationId &&
      this.data
    );
  }
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

// Event processing result
export interface EventProcessingResult {
  success: boolean;
  eventId: string;
  error?: Error;
  processingTimeMs?: number;
}

// Dead letter queue event wrapper
export interface DeadLetterEvent<T extends BaseEventData = BaseEventData> {
  originalEvent: EventPayload<T>;
  failureReason: string;
  failureCount: number;
  lastFailureTime: string;
  originalTopic: string;
}

export type EventHandler<T extends BaseEventData = BaseEventData> = (
  event: EventPayload<T>
) => Promise<EventProcessingResult>;

export type EventFilter<T extends BaseEventData = BaseEventData> = (
  event: EventPayload<T>
) => boolean;