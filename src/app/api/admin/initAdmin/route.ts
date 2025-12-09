// app/api/admin/initAdmin/route.ts

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "@harts/lib/models";

export async function POST() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const username = process.env.ADMIN_USERNAME!;
    const email = process.env.ADMIN_EMAIL!;
    const password = process.env.ADMIN_PASSWORD!;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.findOneAndUpdate(
      { username }, // search condition
      {
        // only set if document doesn't exist
        $setOnInsert: {
          username,
          email,
          password: hashedPassword,
          role: "admin",
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    return NextResponse.json({
      message: "Admin user ensured",
      userId: result._id,
    });
  } catch (error) {
    console.error("Error creating admin user:", error);
    return NextResponse.json(
      { message: "Error creating admin user" },
      { status: 500 }
    );
  }
}
