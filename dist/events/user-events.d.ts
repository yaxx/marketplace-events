import { DeviceInfo } from 'src/adapters';
import { BaseEvent, BaseEventData } from '../types/base-event';
export declare const USER_EVENT_TYPES: {
    readonly USER_REGISTERED: "USER_REGISTERED";
    readonly USER_LOGIN: "USER_LOGIN";
    readonly USER_PROFILE_UPDATED: "USER_PROFILE_UPDATED";
    readonly USER_STATUS_CHANGED: "USER_STATUS_CHANGED";
    readonly USER_DELETED: "USER_DELETED";
};
export type UserEventType = typeof USER_EVENT_TYPES[keyof typeof USER_EVENT_TYPES];
export interface UserRegisteredData extends BaseEventData {
    info: {
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
        dateJoined: string;
    };
    deviceInfo?: DeviceInfo;
    deviceToken?: string;
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
            coordinates?: [number, number];
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
    status?: string;
    deviceInfo?: {
        platform: string;
        version: string;
        deviceId: string;
    };
}
export interface UserDeletedData extends BaseEventData {
    userId: string;
    deletionReason: string;
    deletedBy: string;
    deletionType: 'soft' | 'hard';
    associatedDataCleanup: {
        chats: number;
        requests: number;
        offers: number;
    };
}
export declare class UserRegisteredEvent extends BaseEvent<UserRegisteredData> {
    constructor(data: UserRegisteredData, correlationId?: string);
}
export declare class UserProfileUpdatedEvent extends BaseEvent<UserRegisteredData> {
    constructor(data: UserRegisteredData, correlationId?: string);
}
export declare class UserStatusChangedEvent extends BaseEvent<UserStatusChangedData> {
    constructor(data: UserStatusChangedData, correlationId?: string);
}
export declare class UserDeletedEvent extends BaseEvent<UserDeletedData> {
    constructor(data: UserDeletedData, correlationId?: string);
}
export type UserEvent = UserRegisteredEvent | UserProfileUpdatedEvent | UserStatusChangedEvent | UserDeletedEvent;
export type UserEventData = UserRegisteredData | UserProfileUpdatedData | UserStatusChangedData | UserDeletedData;
