// src/app/api/admin/messages/route.ts

import {auth} from "@hart/server/auth/auth";
import { NextResponse } from "next/server";
import { Message } from "@hart/server/models";
import { getPresignedUrl } from "@hart/server/upload";
import { connectToDatabase } from "@hart/server/db/mongodb";

export async function GET(request: Request) {
  try {
    const session = await auth();
    const user = session?.user;

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

    const includeArchived = url.searchParams.get("archived") === "1";

    const filter = includeArchived
      ? { isArchived: true }
      : {
          $or: [{ isArchived: false }, { isArchived: { $exists: false } }],
        };

    const [messages, unreadCount] = await Promise.all([
      Message.find(filter)
        .sort({ isRead: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      Message.countDocuments({
        isRead: false,
        $or: [{ isArchived: false }, { isArchived: { $exists: false } }],
      }),
    ]);

    for (const msg of messages) {
      if (msg.fileName) {
        msg.imageUrl = await getPresignedUrl(msg.fileName);
      }
    }

    return NextResponse.json({ messages, unreadCount }, { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/messages error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
