// src/app/api/admin/messages/read/[id]/route.ts

import { auth } from "@hart/server/auth/auth";
import { NextResponse } from "next/server";
import { Message } from "@hart/server/models";
import { connectToDatabase } from "@hart/server/db/mongodb";

export async function PATCH(
  request: Request,
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
    const body = await request.json().catch(() => ({}));
    const isRead = Boolean(body?.isRead);

    await connectToDatabase();

    const updated = await Message.findByIdAndUpdate(
      params.id,
      { isRead },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Updated", isRead, id: params.id });
  } catch (error) {
    console.error("PATCH /api/admin/messages/read/[id] error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
