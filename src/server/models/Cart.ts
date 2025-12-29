// src/server/models/Cart.ts

import { CartItemSchema } from "./schemas";
import { CartDocument } from "@hart/lib/types";
import { Schema, model, models } from "mongoose";

const CartSchema = new Schema<CartDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: {
      type: [CartItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Cart = models.Cart || model<CartDocument>("Cart", CartSchema);
