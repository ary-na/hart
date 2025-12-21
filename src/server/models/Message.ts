// src/server/models/Messages.ts

import { Schema, models, model } from "mongoose";

const MessageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    enquiry: {
      type: String,
      required: true,
      trim: true,
    },

    fileName: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const Message = models.Message || model("Message", MessageSchema);
