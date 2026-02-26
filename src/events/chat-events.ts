import { BaseEvent, BaseEventData } from '../types/base-event';

// Chat Event Types
export const CHAT_EVENT_TYPES = {
  CHAT_CREATED: 'CHAT_CREATED',
  MESSAGE_SENT: 'MESSAGE_SENT',
  MESSAGE_DELIVERED: 'MESSAGE_DELIVERED',
  MESSAGE_READ: 'MESSAGE_READ',
  USER_JOINED_CHAT: 'USER_JOINED_CHAT',
  USER_LEFT_CHAT: 'USER_LEFT_CHAT',
  CHAT_ARCHIVED: 'CHAT_ARCHIVED',
  CHAT_DELETED: 'CHAT_DELETED'
} as const;

export type ChatEventType = typeof CHAT_EVENT_TYPES[keyof typeof CHAT_EVENT_TYPES];

// Chat Event Data Interfaces (aligned with Messaging service)
export interface ChatCreatedData extends BaseEventData {
  conversationId: string;
  participants: Array<{
    name: string;
    phone?: string;
    avatar?: string;
  }>;
  lastActivity: string;
  metadata: Record<string, {
    unreadCount: number;
    lastRead?: string;
    isArchived: boolean;
    isMuted: boolean;
    isPinned: boolean;
  }>;
  // Extended fields for marketplace functionality
  type?: 'marketplace' | 'support' | 'group' | 'direct';
  createdBy?: string;
  relatedEntity?: {
    type: 'request' | 'offer' | 'contract';
    id: string;
  };
  settings?: {
    isEncrypted: boolean;
    allowFileSharing: boolean;
    autoDeleteMessages: boolean;
    retentionDays?: number;
  };
}

export interface MessageSentData extends BaseEventData {
  messageId: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  senderPhone?: string;
  isDeleted?: boolean;
  isStarred?: boolean;
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
      state?: string;
      country?: string;
      address?: string;
    };
    contactName?: string;
    contactPhone?: string;
    stickerId?: string;
  };
  replyTo?: {
    messageId: string;
    content: string;
    messageType: string;
  };
  timestamp?: string;
  // Extended fields
  recipientIds?: string[];
  isEdited?: boolean;
  isForwarded?: boolean;
  expiresAt?: string;
}

export interface MessageDeliveredData extends BaseEventData {
  messageId: string;
  chatId: string;
  senderId: string;
  recipientId: string;
  deliveredAt: string;
  deliveryMethod: 'push' | 'websocket' | 'polling';
  deviceInfo?: {
    platform: string;
    version: string;
    deviceId: string;
  };
}

export interface MessageReadData extends BaseEventData {
  messageId: string;
  chatId: string;
  senderId: string;
  readById: string;
  readAt: string;
  allParticipantsRead: boolean;
  readReceipt: {
    messageTimestamp: string;
    readTimestamp: string;
    timeBetweenSentAndRead: number; // milliseconds
  };
}

export interface UserJoinedChatData extends BaseEventData {
  chatId: string;
  userId: string;
  addedBy: string;
  joinedAt: string;
  role: 'participant' | 'moderator' | 'admin';
  invitationMethod: 'direct' | 'link' | 'auto';
  permissions: {
    canSendMessages: boolean;
    canShareFiles: boolean;
    canInviteOthers: boolean;
  };
}

export interface UserLeftChatData extends BaseEventData {
  chatId: string;
  userId: string;
  leftAt: string;
  reason: 'user_initiated' | 'removed_by_admin' | 'chat_ended' | 'auto_cleanup';
  removedBy?: string;
  lastMessageReadId?: string;
}

export interface ChatArchivedData extends BaseEventData {
  chatId: string;
  archivedBy: string;
  archivedAt: string;
  archiveReason: 'completed_transaction' | 'user_request' | 'inactivity' | 'admin_action';
  messageCount: number;
  participantCount: number;
  duration: {
    startedAt: string;
    endedAt: string;
    totalDurationMs: number;
  };
}

export interface ChatDeletedData extends BaseEventData {
  chatId: string;
  deletedBy: string;
  deletedAt: string;
  deletionType: 'soft' | 'hard';
  reason: string;
  affectedParticipants: string[];
  messageCount: number;
  backupCreated: boolean;
  gdprCompliant: boolean;
}

// Chat Event Classes
export class ChatCreatedEvent extends BaseEvent<ChatCreatedData> {
  constructor(data: ChatCreatedData, correlationId?: string) {
    super(CHAT_EVENT_TYPES.CHAT_CREATED, data, 'messaging-service', correlationId);
  }
}

export class MessageSentEvent extends BaseEvent<MessageSentData> {
  constructor(data: MessageSentData, correlationId?: string) {
    super(CHAT_EVENT_TYPES.MESSAGE_SENT, data, 'messaging-service', correlationId);
  }
}

export class MessageDeliveredEvent extends BaseEvent<MessageDeliveredData> {
  constructor(data: MessageDeliveredData, correlationId?: string) {
    super(CHAT_EVENT_TYPES.MESSAGE_DELIVERED, data, 'messaging-service', correlationId);
  }
}

export class MessageReadEvent extends BaseEvent<MessageReadData> {
  constructor(data: MessageReadData, correlationId?: string) {
    super(CHAT_EVENT_TYPES.MESSAGE_READ, data, 'messaging-service', correlationId);
  }
}

export class UserJoinedChatEvent extends BaseEvent<UserJoinedChatData> {
  constructor(data: UserJoinedChatData, correlationId?: string) {
    super(CHAT_EVENT_TYPES.USER_JOINED_CHAT, data, 'messaging-service', correlationId);
  }
}

export class UserLeftChatEvent extends BaseEvent<UserLeftChatData> {
  constructor(data: UserLeftChatData, correlationId?: string) {
    super(CHAT_EVENT_TYPES.USER_LEFT_CHAT, data, 'messaging-service', correlationId);
  }
}

export class ChatArchivedEvent extends BaseEvent<ChatArchivedData> {
  constructor(data: ChatArchivedData, correlationId?: string) {
    super(CHAT_EVENT_TYPES.CHAT_ARCHIVED, data, 'messaging-service', correlationId);
  }
}

export class ChatDeletedEvent extends BaseEvent<ChatDeletedData> {
  constructor(data: ChatDeletedData, correlationId?: string) {
    super(CHAT_EVENT_TYPES.CHAT_DELETED, data, 'messaging-service', correlationId);
  }
}

// Union type for all chat events
export type ChatEvent = 
  | ChatCreatedEvent
  | MessageSentEvent
  | MessageDeliveredEvent
  | MessageReadEvent
  | UserJoinedChatEvent
  | UserLeftChatEvent
  | ChatArchivedEvent
  | ChatDeletedEvent;

// Union type for all chat event data
export type ChatEventData = 
  | ChatCreatedData
  | MessageSentData
  | MessageDeliveredData
  | MessageReadData
  | UserJoinedChatData
  | UserLeftChatData
  | ChatArchivedData
  | ChatDeletedData;