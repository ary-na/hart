// src/server/models/Messages.ts

// Mongoose imports
import { Schema, models, model } from "mongoose";

const MessagesSchema = new Schema(
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
    },

    fileName: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const Messages = models.Messages || model("Messages", MessagesSchema);
