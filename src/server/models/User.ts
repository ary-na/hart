// src/server/models/User.ts

import bcrypt from "bcrypt";
import { Schema, models, model } from "mongoose";

import { AddressSchema } from "./schemas/Address";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

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
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
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

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export const User = models.User || model("User", UserSchema);
