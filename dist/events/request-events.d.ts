import { BaseEvent, BaseEventData } from '../types/base-event';
export declare const REQUEST_EVENT_TYPES: {
    readonly REQUEST_CREATED: "REQUEST_CREATED";
    readonly REQUEST_MATCHED: "REQUEST_MATCHED";
    readonly REQUEST_UPDATED: "REQUEST_UPDATED";
    readonly REQUEST_COMPLETED: "REQUEST_COMPLETED";
    readonly REQUEST_EXPIRED: "REQUEST_EXPIRED";
    readonly REQUEST_CANCELLED: "REQUEST_CANCELLED";
};
export type RequestEventType = typeof REQUEST_EVENT_TYPES[keyof typeof REQUEST_EVENT_TYPES];
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
        radius?: number;
    };
    category?: string;
    status: 'active' | 'completed' | 'cancelled';
    createdAt: string;
    expiresAt: string;
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
    request: any;
    matchedSellers: string[];
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
export declare class RequestCreatedEvent extends BaseEvent<RequestCreatedData> {
    constructor(data: RequestCreatedData, correlationId?: string);
}
export declare class RequestMatchedEvent extends BaseEvent<RequestMatchedData> {
    constructor(data: RequestMatchedData, correlationId?: string);
}
export declare class RequestUpdatedEvent extends BaseEvent<RequestUpdatedData> {
    constructor(data: RequestUpdatedData, correlationId?: string);
}
export declare class RequestCompletedEvent extends BaseEvent<RequestCompletedData> {
    constructor(data: RequestCompletedData, correlationId?: string);
}
export declare class RequestExpiredEvent extends BaseEvent<RequestExpiredData> {
    constructor(data: RequestExpiredData, correlationId?: string);
}
export declare class RequestCancelledEvent extends BaseEvent<RequestCancelledData> {
    constructor(data: RequestCancelledData, correlationId?: string);
}
export type RequestEvent = RequestCreatedEvent | RequestMatchedEvent | RequestUpdatedEvent | RequestCompletedEvent | RequestExpiredEvent | RequestCancelledEvent;
export type RequestEventData = RequestCreatedData | RequestMatchedData | RequestUpdatedData | RequestCompletedData | RequestExpiredData | RequestCancelledData;
