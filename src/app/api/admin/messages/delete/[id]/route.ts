// src/app/api/admin/messages/delete/[id]/route.ts

import { NextResponse } from "next/server";

import { Message } from "@hart/server/models";
import { getCurrentUser } from "@hart/server/auth";
import { s3DeleteObject } from "@hart/server/upload";
import { connectToDatabase } from "@hart/server/db/mongodb";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;

    const user = await getCurrentUser();
    if (!user || user?.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await connectToDatabase();

    const message = await Message.findById(params.id);
    if (!message) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 }
      );
    }

    if (message.fileName) {
      await s3DeleteObject(message.fileName);
    }

    await Message.findByIdAndDelete(params.id);

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/admin/messages/delete/[id] error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
