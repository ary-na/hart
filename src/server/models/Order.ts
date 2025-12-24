// src/server/models/Order.ts

import { Schema, model, models } from "mongoose";
import { AddressSchema } from "./schemas/Address";

const OrderSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
      sparse: true,
    },

    guestName: {
      type: String,
      trim: true,
    },
    guestEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },

    drawing: {
      type: Schema.Types.ObjectId,
      ref: "Drawing",
      required: true,
    },

    pricePaid: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "AUD",
      uppercase: true,
      trim: true,
    },

    shippingAddress: {
      type: AddressSchema,
      required: true,
    },
    billingAddress: {
      type: AddressSchema,
    },
    billingSameAsShipping: {
      type: Boolean,
      default: true,
    },

    paymentProvider: {
      type: String,
      enum: ["stripe", "paypal", "other"],
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded", "shipped", "delivered"],
      default: "pending",
    },
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

OrderSchema.index(
  { drawing: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "paid" },
  }
);

OrderSchema.index({ buyer: 1 });

OrderSchema.index({ transactionId: 1 });

export const Order = models.Order || model("Order", OrderSchema);
