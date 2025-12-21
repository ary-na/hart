// src/app/api/admin/messages/route.ts

import { NextResponse } from "next/server";
import { Message } from "@hart/server/models";
import { getCurrentUser } from "@hart/server/auth";
import { getPresignedUrl } from "@hart/server/upload";
import { connectToDatabase } from "@hart/server/db/mongodb";

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const url = new URL(request.url);
    const skip = Number(url.searchParams.get("skip") ?? "0");
    const limit = Number(url.searchParams.get("limit") ?? "5");

    await connectToDatabase();

    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    for (const msg of messages) {
      if (msg.fileName) {
        msg.imageUrl = await getPresignedUrl(msg.fileName);
      }
    }

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/messages error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
