// src/lib/types/Message.ts
export interface Message {
  _id: string;
  name: string;
  email: string;
  enquiry: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type MessagesFetchOptions = {
  append?: boolean;
  limit?: number;
};

export type UseMessagesReturn = {
  messages: Message[];
  loading: boolean;
  error: Error | null;
  deletingIds: Set<string>;
  fetchMessages: (options?: MessagesFetchOptions) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
};