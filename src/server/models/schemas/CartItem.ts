import { Schema } from "mongoose";
import { CartItemDocument } from "@hart/lib/types";

export const CartItemSchema = new Schema<CartItemDocument>(
  {
    drawingId: {
      type: Schema.Types.ObjectId,
      ref: "Drawing",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    thumbnailName: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);
