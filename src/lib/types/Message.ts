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