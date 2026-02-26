import { BaseEvent, BaseEventData } from '../types/base-event';

// Request Event Types
export const REQUEST_EVENT_TYPES = {
  REQUEST_CREATED: 'REQUEST_CREATED',
  REQUEST_MATCHED: 'REQUEST_MATCHED',
  REQUEST_UPDATED: 'REQUEST_UPDATED',
  REQUEST_COMPLETED: 'REQUEST_COMPLETED',
  REQUEST_EXPIRED: 'REQUEST_EXPIRED',
  REQUEST_CANCELLED: 'REQUEST_CANCELLED'
} as const;

export type RequestEventType = typeof REQUEST_EVENT_TYPES[keyof typeof REQUEST_EVENT_TYPES];

// Request Event Data Interfaces (aligned with Search service)
export interface RequestCreatedData extends BaseEventData {
  requestId: string;
  buyerId?: string;
  buyer?: string;
  content: {
    text?: string;
    images?: string[];
  };
  location?: {
    coordinates: [number, number];
    state?: string;
    city?: string;
    country?: string;
    address?: string;
    radius?: number; // in kilometers
  };
  category?: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  expiresAt: string;
  // Extended fields for marketplace functionality
  title?: string;
  description?: string;
  budget?: {
    min: number;
    max: number;
    currency: string;
  };
  requirements?: {
    timeframe: string;
    urgency: 'low' | 'medium' | 'high' | 'urgent';
    qualifications?: string[];
  };
}

export interface RequestMatchedData extends BaseEventData {
  request:any,
  matchedSellers: string[]
  // requestId: string;
  // buyerId: string;
  // matchedSellers: Array<{
  //   sellerId: string;
  //   matchScore: number;
  //   distance: number;
  //   reasons: string[];
  // }>;
  // matchingCriteria: {
  //   categoryMatch: boolean;
  //   locationWithinRadius: boolean;
  //   budgetCompatible: boolean;
  //   availabilityMatch: boolean;
  // };
  // notificationsSent: number;
  // totalEligibleSellers: number;
}

export interface RequestUpdatedData extends BaseEventData {
  requestId: string;
  buyerId: string;
  updatedFields: {
    title?: string;
    description?: string;
    budget?: {
      min: number;
      max: number;
      currency: string;
    };
    requirements?: {
      timeframe?: string;
      urgency?: 'low' | 'medium' | 'high' | 'urgent';
      qualifications?: string[];
    };
    expiresAt?: string;
  };
  previousValues: Record<string, any>;
  reason: string;
}

export interface RequestCompletedData extends BaseEventData {
  requestId: string;
  buyerId: string;
  selectedOfferId: string;
  sellerId: string;
  finalPrice: number;
  currency: string;
  completionReason: 'offer_accepted' | 'direct_hire' | 'negotiated';
  completedAt: string;
  timeline: {
    createdAt: string;
    firstOfferAt?: string;
    acceptedAt: string;
  };
}

export interface RequestExpiredData extends BaseEventData {
  requestId: string;
  buyerId: string;
  expiredAt: string;
  totalOffersReceived: number;
  lastActivityAt: string;
  autoExpired: boolean;
  notificationsSentToSellers: number;
}

export interface RequestCancelledData extends BaseEventData {
  requestId: string;
  buyerId: string;
  cancelledAt: string;
  cancellationReason: string;
  totalOffersReceived: number;
  offersToReject: string[];
  refundRequired: boolean;
}

// Request Event Classes
export class RequestCreatedEvent extends BaseEvent<RequestCreatedData> {
  constructor(data: RequestCreatedData, correlationId?: string) {
    super(REQUEST_EVENT_TYPES.REQUEST_CREATED, data, 'search-service', correlationId);
  }
}

export class RequestMatchedEvent extends BaseEvent<RequestMatchedData> {
  constructor(data: RequestMatchedData, correlationId?: string) {
    super(REQUEST_EVENT_TYPES.REQUEST_MATCHED, data, 'search-service', correlationId);
  }
}

export class RequestUpdatedEvent extends BaseEvent<RequestUpdatedData> {
  constructor(data: RequestUpdatedData, correlationId?: string) {
    super(REQUEST_EVENT_TYPES.REQUEST_UPDATED, data, 'search-service', correlationId);
  }
}

export class RequestCompletedEvent extends BaseEvent<RequestCompletedData> {
  constructor(data: RequestCompletedData, correlationId?: string) {
    super(REQUEST_EVENT_TYPES.REQUEST_COMPLETED, data, 'search-service', correlationId);
  }
}

export class RequestExpiredEvent extends BaseEvent<RequestExpiredData> {
  constructor(data: RequestExpiredData, correlationId?: string) {
    super(REQUEST_EVENT_TYPES.REQUEST_EXPIRED, data, 'search-service', correlationId);
  }
}

export class RequestCancelledEvent extends BaseEvent<RequestCancelledData> {
  constructor(data: RequestCancelledData, correlationId?: string) {
    super(REQUEST_EVENT_TYPES.REQUEST_CANCELLED, data, 'search-service', correlationId);
  }
}

// Union type for all request events
export type RequestEvent = 
  | RequestCreatedEvent
  | RequestMatchedEvent
  | RequestUpdatedEvent
  | RequestCompletedEvent
  | RequestExpiredEvent
  | RequestCancelledEvent;

// Union type for all request event data
export type RequestEventData = 
  | RequestCreatedData
  | RequestMatchedData
  | RequestUpdatedData
  | RequestCompletedData
  | RequestExpiredData
  | RequestCancelledData;