// src/server/models/Drawing.ts

import { Schema, model, models } from "mongoose";

const DrawingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    fileName: {
      type: String,
      required: true,
    },
    thumbnailName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: false,
      min: 0,
      default: 0,
    },
    isForSale: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

DrawingSchema.pre("save", async function () {
  this.isForSale = (this.price ?? 0) > 0;
});

export const Drawing = models.Drawing || model("Drawing", DrawingSchema);
