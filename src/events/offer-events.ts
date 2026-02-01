import { BaseEvent, BaseEventData } from '../types/base-event';

// Offer Event Types
export const OFFER_EVENT_TYPES = {
  OFFER_CREATED: 'OFFER_CREATED',
  OFFER_UPDATED: 'OFFER_UPDATED',
  OFFER_ACCEPTED: 'OFFER_ACCEPTED',
  OFFER_REJECTED: 'OFFER_REJECTED',
  OFFER_WITHDRAWN: 'OFFER_WITHDRAWN',
  OFFER_EXPIRED: 'OFFER_EXPIRED',
  OFFER_COUNTER_PROPOSED: 'OFFER_COUNTER_PROPOSED'
} as const;

export type OfferEventType = typeof OFFER_EVENT_TYPES[keyof typeof OFFER_EVENT_TYPES];

// Offer Event Data Interfaces (aligned with Search service)
export interface OfferCreatedData extends BaseEventData {
  offerId: string;
  requestId: string;
  sellerId: string;
  price: number;
  currency: string;
  description: string;
  estimatedDelivery?: string;
  images?: string[];
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  createdAt: string;
  expiresAt: string;
  // Extended fields for marketplace functionality
  buyerId?: string;
  proposal?: {
    timeline: string;
    deliverables: string[];
    terms?: string;
  };
  sellerProfile?: {
    businessName?: string;
    rating: number;
    completedJobs: number;
    responseTime: string;
  };
  isCounterOffer?: boolean;
  parentOfferId?: string;
}

export interface OfferUpdatedData extends BaseEventData {
  offerId: string;
  requestId: string;
  sellerId: string;
  buyerId: string;
  updatedFields: {
    pricing?: {
      amount: number;
      currency: string;
      breakdown?: Array<{
        item: string;
        amount: number;
        description?: string;
      }>;
    };
    proposal?: {
      timeline?: string;
      description?: string;
      deliverables?: string[];
      terms?: string;
    };
    expiresAt?: string;
  };
  previousValues: Record<string, any>;
  updateReason: string;
}

export interface OfferAcceptedData extends BaseEventData {
  offerId: string;
  requestId: string;
  sellerId: string;
  buyerId: string;
  acceptedAt: string;
  finalPrice: number;
  currency: string;
  agreedTimeline: string;
  contractTerms: {
    deliverables: string[];
    timeline: string;
    paymentTerms: string;
    cancellationPolicy: string;
  };
  nextSteps: {
    chatCreationRequired: boolean;
    paymentProcessingRequired: boolean;
    contractGenerationRequired: boolean;
  };
}

export interface OfferRejectedData extends BaseEventData {
  offerId: string;
  requestId: string;
  sellerId: string;
  buyerId: string;
  rejectedAt: string;
  rejectionReason: string;
  feedback?: string;
  counterOfferSuggested: boolean;
  allowResubmission: boolean;
}

export interface OfferWithdrawnData extends BaseEventData {
  offerId: string;
  requestId: string;
  sellerId: string;
  buyerId: string;
  withdrawnAt: string;
  withdrawalReason: string;
  refundRequired: boolean;
  notifyBuyer: boolean;
}

export interface OfferExpiredData extends BaseEventData {
  offerId: string;
  requestId: string;
  sellerId: string;
  buyerId: string;
  expiredAt: string;
  autoExpired: boolean;
  lastViewedBy: 'seller' | 'buyer' | 'none';
  extensionAllowed: boolean;
}

export interface OfferCounterProposedData extends BaseEventData {
  originalOfferId: string;
  counterOfferId: string;
  requestId: string;
  sellerId: string;
  buyerId: string;
  proposedBy: 'seller' | 'buyer';
  changes: {
    pricing?: {
      originalAmount: number;
      proposedAmount: number;
      currency: string;
      justification?: string;
    };
    timeline?: {
      originalTimeline: string;
      proposedTimeline: string;
      justification?: string;
    };
    deliverables?: {
      added: string[];
      removed: string[];
      modified: Array<{
        original: string;
        proposed: string;
      }>;
    };
    terms?: {
      additionalTerms: string;
    };
  };
  negotiationRound: number;
  expiresAt: string;
}

// Offer Event Classes
export class OfferCreatedEvent extends BaseEvent<OfferCreatedData> {
  constructor(data: OfferCreatedData, correlationId?: string) {
    super(OFFER_EVENT_TYPES.OFFER_CREATED, data, 'search-service', correlationId);
  }
}

export class OfferUpdatedEvent extends BaseEvent<OfferUpdatedData> {
  constructor(data: OfferUpdatedData, correlationId?: string) {
    super(OFFER_EVENT_TYPES.OFFER_UPDATED, data, 'search-service', correlationId);
  }
}

export class OfferAcceptedEvent extends BaseEvent<OfferAcceptedData> {
  constructor(data: OfferAcceptedData, correlationId?: string) {
    super(OFFER_EVENT_TYPES.OFFER_ACCEPTED, data, 'search-service', correlationId);
  }
}

export class OfferRejectedEvent extends BaseEvent<OfferRejectedData> {
  constructor(data: OfferRejectedData, correlationId?: string) {
    super(OFFER_EVENT_TYPES.OFFER_REJECTED, data, 'search-service', correlationId);
  }
}

export class OfferWithdrawnEvent extends BaseEvent<OfferWithdrawnData> {
  constructor(data: OfferWithdrawnData, correlationId?: string) {
    super(OFFER_EVENT_TYPES.OFFER_WITHDRAWN, data, 'search-service', correlationId);
  }
}

export class OfferExpiredEvent extends BaseEvent<OfferExpiredData> {
  constructor(data: OfferExpiredData, correlationId?: string) {
    super(OFFER_EVENT_TYPES.OFFER_EXPIRED, data, 'search-service', correlationId);
  }
}

export class OfferCounterProposedEvent extends BaseEvent<OfferCounterProposedData> {
  constructor(data: OfferCounterProposedData, correlationId?: string) {
    super(OFFER_EVENT_TYPES.OFFER_COUNTER_PROPOSED, data, 'search-service', correlationId);
  }
}

// Union type for all offer events
export type OfferEvent = 
  | OfferCreatedEvent
  | OfferUpdatedEvent
  | OfferAcceptedEvent
  | OfferRejectedEvent
  | OfferWithdrawnEvent
  | OfferExpiredEvent
  | OfferCounterProposedEvent;

// Union type for all offer event data
export type OfferEventData = 
  | OfferCreatedData
  | OfferUpdatedData
  | OfferAcceptedData
  | OfferRejectedData
  | OfferWithdrawnData
  | OfferExpiredData
  | OfferCounterProposedData;