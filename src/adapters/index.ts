/**
 * Service Adapters for Kafka Event Integration
 * 
 * These adapters convert between service-specific types and Kafka event types,
 * ensuring data consistency across the marketplace ecosystem.
 */

import { v4 as uuidv4 } from 'uuid';
import {
  UserRegisteredData,
  UserProfileUpdatedData,
  UserStatusChangedData,
  RequestCreatedData,
  OfferCreatedData,
  ChatCreatedData,
  MessageSentData
} from '../index';

// Account Service Types (from existing service)
export interface IAccountServiceUser {
  _id?:string,
  userId: string;
  phone: string;
  name: string;
  email?: string;
  userType: 'buyer' | 'seller'
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

// Search Service Types (from existing service)
export interface IBuyerRequestServiceType {
  requestId: string;
  buyerId: string;
  content: {
    text?: string;
    images?: string[];
  };
  location: {
    lat: number;
    lng: number;
    address?: string;
    radius: number;
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

// Messaging Service Types (from existing service)
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
      latitude: number;
      longitude: number;
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
  osVersion?: string,
  appVersion?: string
  deviceName?: string;
}

/**
 * Account Service Adapters
 */
export class AccountServiceAdapter {
  /**
   * Convert Account service user to UserRegisteredEvent data
   */
  static toUserRegisteredEvent(user: IAccountServiceUser, deviceInfo?:DeviceInfo, deviceToken?:string): UserRegisteredData {

    console.log('convertible',user )
   const userData:any ={
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
   }

   

    return userData;
      
  
  }

  /**
   * Convert Account service profile update to UserProfileUpdatedEvent data
   */
  static toUserProfileUpdatedEvent(
    userId: string, 
    updatedFields: Partial<IAccountServiceUser>, 
    previousValues: Record<string, any>,
    updateReason: string = 'user_initiated'
  ): UserProfileUpdatedData {
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
  static toUserStatusChangedEvent(
    userId: string,
    isOnline: boolean,
    previousOnlineStatus: boolean,
    lastSeen: Date,
    status?: string
  ): UserStatusChangedData {
    return {
      userId,
      isOnline,
      previousOnlineStatus,
      lastSeen: lastSeen.toISOString(),
      status
    };
  }
}

/**
 * Search Service Adapters
 */
export class SearchServiceAdapter {
  /**
   * Convert Search service request to RequestCreatedEvent data
   */
  static toRequestCreatedEvent(request: IBuyerRequestServiceType): RequestCreatedData {
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
  static toOfferCreatedEvent(offer: IOfferServiceType): OfferCreatedData {
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

/**
 * Messaging Service Adapters
 */
export class MessagingServiceAdapter {
  /**
   * Convert Messaging service conversation to ChatCreatedEvent data
   */
  static toChatCreatedEvent(conversation: IConversationServiceType): ChatCreatedData {
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
      }, {} as Record<string, any>)
    };
  }

  /**
   * Convert Messaging service message to MessageSentEvent data
   */
  static toMessageSentEvent(message: IMessageServiceType): MessageSentData {
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

/**
 * Utility functions for consistent ID generation across services
 */
export class IDGenerator {
  /**
   * Generate consistent user ID format
   */
  static generateUserId(): string {
    return `user_${uuidv4().replace(/-/g, '').substring(0, 12)}`;
  }

  /**
   * Generate consistent request ID format
   */
  static generateRequestId(): string {
    return `req_${uuidv4().replace(/-/g, '').substring(0, 12)}`;
  }

  /**
   * Generate consistent offer ID format
   */
  static generateOfferId(): string {
    return `offer_${uuidv4().replace(/-/g, '').substring(0, 12)}`;
  }

  /**
   * Generate consistent conversation ID format
   */
  static generateConversationId(): string {
    return `chat_${uuidv4().replace(/-/g, '').substring(0, 12)}`;
  }

  /**
   * Generate consistent message ID format
   */
  static generateMessageId(): string {
    return `msg_${uuidv4().replace(/-/g, '').substring(0, 12)}`;
  }

  /**
   * Generate consistent notification ID format
   */
  static generateNotificationId(): string {
    return `notif_${uuidv4().replace(/-/g, '').substring(0, 12)}`;
  }

  /**
   * Generate correlation ID for event tracing
   */
  static generateCorrelationId(): string {
    return `corr_${uuidv4()}`;
  }
}

/**
 * Location utilities for consistent coordinate handling
 */
export class LocationUtils {
  /**
   * Convert lat/lng to MongoDB coordinates format [lng, lat]
   */
  static toMongoCoordinates(lat: number, lng: number): [number, number] {
    return [lng, lat];
  }

  /**
   * Convert MongoDB coordinates [lng, lat] to lat/lng object
   */
  static fromMongoCoordinates(coordinates: [number, number]): { lat: number; lng: number } {
    return {
      lat: coordinates[1],
      lng: coordinates[0]
    };
  }

  /**
   * Convert between location formats
   */
  static convertLocationFormats(location: {
    lat?: number;
    lng?: number;
    latitude?: number;
    longitude?: number;
    coordinates?: [number, number];
  }): { lat: number; lng: number; coordinates: [number, number] } {
    let lat: number;
    let lng: number;

    if (location.coordinates) {
      [lng, lat] = location.coordinates;
    } else if (location.lat !== undefined && location.lng !== undefined) {
      lat = location.lat;
      lng = location.lng;
    } else if (location.latitude !== undefined && location.longitude !== undefined) {
      lat = location.latitude;
      lng = location.longitude;
    } else {
      throw new Error('Invalid location format');
    }

    return {
      lat,
      lng,
      coordinates: [lng, lat]
    };
  }
}