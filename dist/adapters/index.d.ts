/**
 * Service Adapters for Kafka Event Integration
 *
 * These adapters convert between service-specific types and Kafka event types,
 * ensuring data consistency across the marketplace ecosystem.
 */
import { UserRegisteredData, UserProfileUpdatedData, UserStatusChangedData, RequestCreatedData, OfferCreatedData, ChatCreatedData, MessageSentData } from '../index';
export interface IAccountServiceUser {
    _id?: string;
    userId: string;
    phone: string;
    name: string;
    email?: string;
    userType: 'buyer' | 'seller';
    location: {
        type: 'Point';
        coordinates: [number, number];
        address?: string;
        city?: string;
        state?: string;
        country?: string;
        zipCode?: string;
    };
    avatar?: string;
    bio?: string;
    businessName?: string;
    businessCategory?: string;
    serviceRadius?: number;
    isVerified: boolean;
    dateJoined: Date;
    isOnline: boolean;
    lastSeen: Date;
    status?: string;
}
export interface IBuyerRequestServiceType {
    requestId: string;
    buyerId: string;
    content: {
        text?: string;
        images?: string[];
    };
    location?: {
        coordinates?: [number, number];
        city?: string;
        state?: string;
        country?: string;
        address?: string;
    };
    category?: string;
    status: 'active' | 'completed' | 'cancelled';
    createdAt: Date;
    expiresAt: Date;
}
export interface IOfferServiceType {
    offerId: string;
    requestId: string;
    sellerId: string;
    price: number;
    currency: string;
    description: string;
    estimatedDelivery?: string;
    images?: string[];
    status: 'pending' | 'accepted' | 'rejected' | 'expired';
    createdAt: Date;
    expiresAt: Date;
}
export interface IConversationServiceType {
    conversationId: string;
    participants: Array<{
        name: string;
        phone?: string;
        avatar?: string;
    }>;
    lastActivity: Date;
    metadata: Record<string, {
        unreadCount: number;
        lastRead?: Date;
        isArchived: boolean;
        isMuted: boolean;
        isPinned: boolean;
    }>;
}
export interface IMessageServiceType {
    messageId: string;
    conversationId: string;
    senderId: string;
    receiverId: string;
    senderName: string;
    senderPhone?: string;
    status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
    messageType: 'text' | 'image' | 'video' | 'audio' | 'file' | 'document' | 'sticker' | 'location' | 'contact';
    content: {
        text?: string;
        mediaUrl?: string;
        mediaSize?: number;
        duration?: number;
        caption?: string;
        fileName?: string;
        location?: {
            coordinates?: [number, number];
            city?: string;
            country?: string;
            state?: string;
            address?: string;
        };
        contactName?: string;
        contactPhone?: string;
        stickerId?: string;
    };
    timestamp?: Date;
}
export interface DeviceInfo {
    platform?: string;
    deviceId?: string;
    osVersion?: string;
    appVersion?: string;
    deviceName?: string;
}
/**
 * Account Service Adapters
 */
export declare class AccountServiceAdapter {
    /**
     * Convert Account service user to UserRegisteredEvent data
     */
    static toUserRegisteredEvent(user: IAccountServiceUser, deviceInfo?: DeviceInfo, deviceToken?: string): UserRegisteredData;
    /**
     * Convert Account service profile update to UserProfileUpdatedEvent data
     */
    static toUserProfileUpdatedEvent(userId: string, updatedFields: Partial<IAccountServiceUser>, previousValues: Record<string, any>, updateReason?: string): UserProfileUpdatedData;
    /**
     * Convert Account service status change to UserStatusChangedEvent data
     */
    static toUserStatusChangedEvent(userId: string, isOnline: boolean, previousOnlineStatus: boolean, lastSeen: Date, status?: string): UserStatusChangedData;
}
/**
 * Search Service Adapters
 */
export declare class SearchServiceAdapter {
    /**
     * Convert Search service request to RequestCreatedEvent data
     */
    static toRequestCreatedEvent(request: IBuyerRequestServiceType): RequestCreatedData;
    /**
     * Convert Search service offer to OfferCreatedEvent data
     */
    static toOfferCreatedEvent(offer: IOfferServiceType): OfferCreatedData;
}
/**
 * Messaging Service Adapters
 */
export declare class MessagingServiceAdapter {
    /**
     * Convert Messaging service conversation to ChatCreatedEvent data
     */
    static toChatCreatedEvent(conversation: IConversationServiceType): ChatCreatedData;
    /**
     * Convert Messaging service message to MessageSentEvent data
     */
    static toMessageSentEvent(message: IMessageServiceType): MessageSentData;
}
/**
 * Utility functions for consistent ID generation across services
 */
export declare class IDGenerator {
    /**
     * Generate consistent user ID format
     */
    static generateUserId(): string;
    /**
     * Generate consistent request ID format
     */
    static generateRequestId(): string;
    /**
     * Generate consistent offer ID format
     */
    static generateOfferId(): string;
    /**
     * Generate consistent conversation ID format
     */
    static generateConversationId(): string;
    /**
     * Generate consistent message ID format
     */
    static generateMessageId(): string;
    /**
     * Generate consistent notification ID format
     */
    static generateNotificationId(): string;
    /**
     * Generate correlation ID for event tracing
     */
    static generateCorrelationId(): string;
}
/**
 * Location utilities for consistent coordinate handling
 */
export declare class LocationUtils {
    /**
     * Convert lat/lng to MongoDB coordinates format [lng, lat]
     */
    static toMongoCoordinates(lat: number, lng: number): [number, number];
    /**
     * Convert MongoDB coordinates [lng, lat] to lat/lng object
     */
    static fromMongoCoordinates(coordinates: [number, number]): {
        lat: number;
        lng: number;
    };
    /**
     * Convert between location formats
     */
    static convertLocationFormats(location: {
        lat?: number;
        lng?: number;
        latitude?: number;
        longitude?: number;
        coordinates?: [number, number];
    }): {
        lat: number;
        lng: number;
        coordinates: [number, number];
    };
}
