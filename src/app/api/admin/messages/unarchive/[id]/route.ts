// src/app/api/admin/messages/unarchive/[id]/route.ts

import { auth } from "@hart/server/auth/auth";
import { NextResponse } from "next/server";
import { Message } from "@hart/server/models";
import { connectToDatabase } from "@hart/server/db/mongodb";

export async function PATCH(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const params = await context.params;
    await connectToDatabase();

    const result = await Message.updateOne(
      { _id: params.id },
      { $set: { isArchived: false } },
      { strict: false }
    );

    if (!result.matchedCount) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Unarchived", messageId: params.id });
  } catch (error) {
    console.error("PATCH /api/admin/messages/unarchive/[id] error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
