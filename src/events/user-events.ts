import { DeviceInfo } from 'src/adapters';
import { BaseEvent, BaseEventData } from '../types/base-event';

// User Event Types
export const USER_EVENT_TYPES = {
  USER_REGISTERED: 'USER_REGISTERED',
  USER_LOGIN: 'USER_LOGIN',
  USER_PROFILE_UPDATED: 'USER_PROFILE_UPDATED',
  USER_STATUS_CHANGED: 'USER_STATUS_CHANGED',
  USER_DELETED: 'USER_DELETED'
} as const;

export type UserEventType = typeof USER_EVENT_TYPES[keyof typeof USER_EVENT_TYPES];

// User Event Data Interfaces (aligned with Account service)
export interface UserRegisteredData extends BaseEventData {
  info: {
    userId: string;
    phone: string;
    name: string;
    email?: string;
    userType: 'buyer' | 'seller'
    location: {
      type: 'Point';
      coordinates: [number, number]; // [longitude, latitude] - MongoDB format
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
    dateJoined: string;
  },
  deviceInfo?: DeviceInfo;
  deviceToken?: string
  
}

export interface UserProfileUpdatedData extends BaseEventData {
  userId: string;
  updatedFields: {
    name?: string;
    phone?: string;
    email?: string;
    avatar?: string;
    bio?: string;
    businessName?: string;
    businessCategory?: string;
    location?: {
      type: 'Point';
      coordinates?: [number, number]; // [longitude, latitude]
      address?: string;
      city?: string;
      state?: string;
      country?: string;
      zipCode?: string;
    };
    serviceRadius?: number;
    userType?: 'buyer' | 'seller' | 'both';
    status?: string;
  };
  previousValues: Record<string, any>;
  updateReason: string;
}

export interface UserStatusChangedData extends BaseEventData {
  userId: string;
  isOnline: boolean;
  previousOnlineStatus: boolean;
  lastSeen: string;
  status?: string; // Business status message
  deviceInfo?: {
    platform: string;
    version: string;
    deviceId: string;
  };
}

export interface UserDeletedData extends BaseEventData {
  userId: string;
  deletionReason: string;
  deletedBy: string; // userId who initiated deletion
  deletionType: 'soft' | 'hard';
  associatedDataCleanup: {
    chats: number;
    requests: number;
    offers: number;
  };
}

// User Event Classes
export class UserRegisteredEvent extends BaseEvent<UserRegisteredData> {
  constructor(data: UserRegisteredData, correlationId?: string) {
    super(USER_EVENT_TYPES.USER_REGISTERED, data, 'account-service', correlationId);
  }
}

// export class UserProfileUpdatedEvent extends BaseEvent<UserProfileUpdatedData> {
//   constructor(data: UserProfileUpdatedData, correlationId?: string) {
//     super(USER_EVENT_TYPES.USER_PROFILE_UPDATED, data, 'account-service', correlationId);
//   }
// }
export class UserProfileUpdatedEvent extends BaseEvent<UserRegisteredData> {
  constructor(data: UserRegisteredData, correlationId?: string) {
    super(USER_EVENT_TYPES.USER_PROFILE_UPDATED, data, 'account-service', correlationId);
  }
}

export class UserStatusChangedEvent extends BaseEvent<UserStatusChangedData> {
  constructor(data: UserStatusChangedData, correlationId?: string) {
    super(USER_EVENT_TYPES.USER_STATUS_CHANGED, data, 'account-service', correlationId);
  }
}

export class UserDeletedEvent extends BaseEvent<UserDeletedData> {
  constructor(data: UserDeletedData, correlationId?: string) {
    super(USER_EVENT_TYPES.USER_DELETED, data, 'account-service', correlationId);
  }
}

// Union type for all user events
export type UserEvent = 
  | UserRegisteredEvent
  | UserProfileUpdatedEvent
  | UserStatusChangedEvent
  | UserDeletedEvent;

// Union type for all user event data
export type UserEventData = 
  | UserRegisteredData
  | UserProfileUpdatedData
  | UserStatusChangedData
  | UserDeletedData;