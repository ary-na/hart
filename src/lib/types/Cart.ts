// src/lib/types/Cart.ts

import { Document, Types } from "mongoose";

export type CartItem = {
  drawingId: string;
  title: string;
  price: number;
  thumbnailName: string;
};

export type CartState = {
  items: CartItem[];
};

export interface CartItemDocument {
  drawingId: Types.ObjectId;
  title: string;
  price: number;
  thumbnailName: string;
}

export interface CartDocument extends Document {
  userId: Types.ObjectId;
  items: CartItemDocument[];
  createdAt: Date;
  updatedAt: Date;
}

export type UseCartReturn = {
  items: CartItem[];
  loading: boolean;
  error: Error | null;
  addItem: (
    item: Omit<CartItem, "drawingId"> & { drawingId: string }
  ) => Promise<CartDocument | null>;
  removeItem: (drawingId: string) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  fetchCart: () => Promise<void>;
  resetError: () => void;
};
