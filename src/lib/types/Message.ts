// src/lib/types/Message.ts

import { FetchOptions } from "./Hook";

export interface Message {
  _id: string;
  name: string;
  email: string;
  enquiry: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type UseMessagesReturn = {
  messages: Message[];
  loading: boolean;
  error: Error | null;
  deletingIds: Set<string>;
  fetchMessages: (options?: FetchOptions) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<boolean>;
};
