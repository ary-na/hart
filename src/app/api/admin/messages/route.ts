// src/app/api/admin/messages/route.ts

// Next.js imports
import { NextResponse } from "next/server";

// NextAuth imports
import { getServerSession } from "next-auth/next";

// Database and model imports
import { ContactMe } from "@hart/server/models";
import { connectToDatabase } from "@hart/server/db/mongodb";

// Auth options import
import { authOptions } from "@hart/server/auth/nAuth";

// S3 utility import
import { getPresignedUrl } from "@hart/server/upload/s3";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const url = new URL(request.url);
    const skip = Number(url.searchParams.get("skip") ?? "0");
    const limit = Number(url.searchParams.get("limit") ?? "5");

    await connectToDatabase();

    const messages = await ContactMe.find()
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
