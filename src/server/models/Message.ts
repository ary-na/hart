// src/server/models/Message.ts

import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    name: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },

    subject: {
      type: String,
      trim: true,
      default: "General Enquiry",
    },

    enquiry: {
      type: String,
      required: true,
      trim: true,
    },

    fileName: {
      type: String,
      trim: true,
      default: null,
    },

    drawing: {
      type: Schema.Types.ObjectId,
      ref: "Drawing",
      default: null,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    isReplied: {
      type: Boolean,
      default: false,
    },

    repliedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Message = models.Message || model("Message", MessageSchema);
