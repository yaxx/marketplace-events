"use strict";
/**
 * Service Adapters for Kafka Event Integration
 *
 * These adapters convert between service-specific types and Kafka event types,
 * ensuring data consistency across the marketplace ecosystem.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationUtils = exports.IDGenerator = exports.MessagingServiceAdapter = exports.SearchServiceAdapter = exports.AccountServiceAdapter = void 0;
const uuid_1 = require("uuid");
/**
 * Account Service Adapters
 */
class AccountServiceAdapter {
    /**
     * Convert Account service user to UserRegisteredEvent data
     */
    static toUserRegisteredEvent(user, deviceInfo, deviceToken) {
        // console.log('convertible', user )
        const userData = {
            info: {
                _id: user._id,
                userId: user.userId,
                phone: user.phone,
                name: user.name,
                email: user.email,
                userType: user.userType,
                location: user.location,
                avatar: user.avatar,
                bio: user.bio,
                businessName: user.businessName,
                businessCategory: user.businessCategory,
                serviceRadius: user.serviceRadius,
                isVerified: user.isVerified,
                isOnline: user.isOnline,
                lastSeen: user.lastSeen.toISOString(),
                status: user.status,
                dateJoined: user.dateJoined.toISOString()
            },
            deviceInfo: deviceInfo ?? {},
            deviceToken: deviceToken ?? ''
        };
        return userData;
    }
    /**
     * Convert Account service profile update to UserProfileUpdatedEvent data
     */
    static toUserProfileUpdatedEvent(userId, updatedFields, previousValues, updateReason = 'user_initiated') {
        return {
            userId,
            updatedFields: {
                name: updatedFields.name,
                phone: updatedFields.phone,
                email: updatedFields.email,
                avatar: updatedFields.avatar,
                bio: updatedFields.bio,
                businessName: updatedFields.businessName,
                businessCategory: updatedFields.businessCategory,
                location: updatedFields.location,
                serviceRadius: updatedFields.serviceRadius,
                userType: updatedFields.userType,
                status: updatedFields.status
            },
            previousValues,
            updateReason
        };
    }
    /**
     * Convert Account service status change to UserStatusChangedEvent data
     */
    static toUserStatusChangedEvent(userId, isOnline, previousOnlineStatus, lastSeen, status) {
        return {
            userId,
            isOnline,
            previousOnlineStatus,
            lastSeen: lastSeen.toISOString(),
            status
        };
    }
}
exports.AccountServiceAdapter = AccountServiceAdapter;
/**
 * Search Service Adapters
 */
class SearchServiceAdapter {
    /**
     * Convert Search service request to RequestCreatedEvent data
     */
    static toRequestCreatedEvent(request) {
        return {
            requestId: request.requestId,
            buyerId: request.buyerId,
            content: request.content,
            location: request.location,
            category: request.category,
            status: request.status,
            createdAt: request.createdAt.toISOString(),
            expiresAt: request.expiresAt.toISOString()
        };
    }
    /**
     * Convert Search service offer to OfferCreatedEvent data
     */
    static toOfferCreatedEvent(offer) {
        return {
            offerId: offer.offerId,
            requestId: offer.requestId,
            sellerId: offer.sellerId,
            price: offer.price,
            currency: offer.currency,
            description: offer.description,
            estimatedDelivery: offer.estimatedDelivery,
            images: offer.images,
            status: offer.status,
            createdAt: offer.createdAt.toISOString(),
            expiresAt: offer.expiresAt.toISOString()
        };
    }
}
exports.SearchServiceAdapter = SearchServiceAdapter;
/**
 * Messaging Service Adapters
 */
class MessagingServiceAdapter {
    /**
     * Convert Messaging service conversation to ChatCreatedEvent data
     */
    static toChatCreatedEvent(conversation) {
        return {
            conversationId: conversation.conversationId,
            participants: conversation.participants,
            lastActivity: conversation.lastActivity.toISOString(),
            metadata: Object.entries(conversation.metadata).reduce((acc, [userId, meta]) => {
                acc[userId] = {
                    unreadCount: meta.unreadCount,
                    lastRead: meta.lastRead?.toISOString(),
                    isArchived: meta.isArchived,
                    isMuted: meta.isMuted,
                    isPinned: meta.isPinned
                };
                return acc;
            }, {})
        };
    }
    /**
     * Convert Messaging service message to MessageSentEvent data
     */
    static toMessageSentEvent(message) {
        return {
            messageId: message.messageId,
            conversationId: message.conversationId,
            senderId: message.senderId,
            receiverId: message.receiverId,
            senderName: message.senderName,
            senderPhone: message.senderPhone,
            status: message.status,
            messageType: message.messageType,
            content: message.content,
            timestamp: message.timestamp?.toISOString()
        };
    }
}
exports.MessagingServiceAdapter = MessagingServiceAdapter;
/**
 * Utility functions for consistent ID generation across services
 */
class IDGenerator {
    /**
     * Generate consistent user ID format
     */
    static generateUserId() {
        return `user_${(0, uuid_1.v4)().replace(/-/g, '').substring(0, 12)}`;
    }
    /**
     * Generate consistent request ID format
     */
    static generateRequestId() {
        return `req_${(0, uuid_1.v4)().replace(/-/g, '').substring(0, 12)}`;
    }
    /**
     * Generate consistent offer ID format
     */
    static generateOfferId() {
        return `offer_${(0, uuid_1.v4)().replace(/-/g, '').substring(0, 12)}`;
    }
    /**
     * Generate consistent conversation ID format
     */
    static generateConversationId() {
        return `chat_${(0, uuid_1.v4)().replace(/-/g, '').substring(0, 12)}`;
    }
    /**
     * Generate consistent message ID format
     */
    static generateMessageId() {
        return `msg_${(0, uuid_1.v4)().replace(/-/g, '').substring(0, 12)}`;
    }
    /**
     * Generate consistent notification ID format
     */
    static generateNotificationId() {
        return `notif_${(0, uuid_1.v4)().replace(/-/g, '').substring(0, 12)}`;
    }
    /**
     * Generate correlation ID for event tracing
     */
    static generateCorrelationId() {
        return `corr_${(0, uuid_1.v4)()}`;
    }
}
exports.IDGenerator = IDGenerator;
/**
 * Location utilities for consistent coordinate handling
 */
class LocationUtils {
    /**
     * Convert lat/lng to MongoDB coordinates format [lng, lat]
     */
    static toMongoCoordinates(lat, lng) {
        return [lng, lat];
    }
    /**
     * Convert MongoDB coordinates [lng, lat] to lat/lng object
     */
    static fromMongoCoordinates(coordinates) {
        return {
            lat: coordinates[1],
            lng: coordinates[0]
        };
    }
    /**
     * Convert between location formats
     */
    static convertLocationFormats(location) {
        let lat;
        let lng;
        if (location.coordinates) {
            [lng, lat] = location.coordinates;
        }
        else if (location.lat !== undefined && location.lng !== undefined) {
            lat = location.lat;
            lng = location.lng;
        }
        else if (location.latitude !== undefined && location.longitude !== undefined) {
            lat = location.latitude;
            lng = location.longitude;
        }
        else {
            throw new Error('Invalid location format');
        }
        return {
            lat,
            lng,
            coordinates: [lng, lat]
        };
    }
}
exports.LocationUtils = LocationUtils;
