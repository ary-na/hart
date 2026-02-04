// src/lib/types/Message.ts

import { FetchOptions } from "./Hook";

export interface Message {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  enquiry: string;
  imageUrl?: string;
  isRead?: boolean;
  isArchived?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UseMessagesReturn = {
  messages: Message[];
  loading: boolean;
  error: Error | null;
  deletingIds: Set<string>;
  unreadCount: number;
  fetchMessages: (
    options?: FetchOptions & { archived?: string }
  ) => Promise<void>;
  deleteMessage: (messageId: string, archived?: "0" | "1") => Promise<boolean>;
  archiveMessage: (messageId: string) => Promise<boolean>;
  unarchiveMessage: (messageId: string) => Promise<boolean>;
  updateReadStatus: (
    messageId: string,
    isRead: boolean,
    archived?: "0" | "1"
  ) => Promise<boolean>;
};
