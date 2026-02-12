import { BaseEvent, BaseEventData } from '../types/base-event';
export declare const OFFER_EVENT_TYPES: {
    readonly OFFER_CREATED: "OFFER_CREATED";
    readonly OFFER_UPDATED: "OFFER_UPDATED";
    readonly OFFER_ACCEPTED: "OFFER_ACCEPTED";
    readonly OFFER_REJECTED: "OFFER_REJECTED";
    readonly OFFER_WITHDRAWN: "OFFER_WITHDRAWN";
    readonly OFFER_EXPIRED: "OFFER_EXPIRED";
    readonly OFFER_COUNTER_PROPOSED: "OFFER_COUNTER_PROPOSED";
};
export type OfferEventType = typeof OFFER_EVENT_TYPES[keyof typeof OFFER_EVENT_TYPES];
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
export declare class OfferCreatedEvent extends BaseEvent<OfferCreatedData> {
    constructor(data: OfferCreatedData, correlationId?: string);
}
export declare class OfferUpdatedEvent extends BaseEvent<OfferUpdatedData> {
    constructor(data: OfferUpdatedData, correlationId?: string);
}
export declare class OfferAcceptedEvent extends BaseEvent<OfferAcceptedData> {
    constructor(data: OfferAcceptedData, correlationId?: string);
}
export declare class OfferRejectedEvent extends BaseEvent<OfferRejectedData> {
    constructor(data: OfferRejectedData, correlationId?: string);
}
export declare class OfferWithdrawnEvent extends BaseEvent<OfferWithdrawnData> {
    constructor(data: OfferWithdrawnData, correlationId?: string);
}
export declare class OfferExpiredEvent extends BaseEvent<OfferExpiredData> {
    constructor(data: OfferExpiredData, correlationId?: string);
}
export declare class OfferCounterProposedEvent extends BaseEvent<OfferCounterProposedData> {
    constructor(data: OfferCounterProposedData, correlationId?: string);
}
export type OfferEvent = OfferCreatedEvent | OfferUpdatedEvent | OfferAcceptedEvent | OfferRejectedEvent | OfferWithdrawnEvent | OfferExpiredEvent | OfferCounterProposedEvent;
export type OfferEventData = OfferCreatedData | OfferUpdatedData | OfferAcceptedData | OfferRejectedData | OfferWithdrawnData | OfferExpiredData | OfferCounterProposedData;
