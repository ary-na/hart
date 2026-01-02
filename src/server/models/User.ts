// src/server/models/User.ts

import { hashPassword } from "../auth";
import { Schema, models, model } from "mongoose";

import { AddressSchema } from "./schemas";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },

    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true },
    avatarName: { type: String },
    bio: { type: String },

    shippingAddress: {
      type: AddressSchema,
      required: false,
    },

    paymentCustomerId: { type: String },

    purchases: [
      {
        type: Schema.Types.ObjectId,
        ref: "Drawing",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await hashPassword(this.password);
});

export const User = models.User || model("User", UserSchema);
