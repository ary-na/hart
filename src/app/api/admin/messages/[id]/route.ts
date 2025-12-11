// src/app/api/admin/messages/[id]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { ContactMe } from "@hart/server/models";
import { connectToDatabase } from "@hart/server/db/mongodb";
import { authOptions } from "@hart/server/auth/nAuth";
import { s3DeleteObject } from "@hart/server/upload/s3"; // You need to implement this

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params; // <-- await here!

    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await connectToDatabase();

    const message = await ContactMe.findById(params.id);
    if (!message) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 }
      );
    }

    if (message.fileName) {
      await s3DeleteObject(message.fileName);
    }

    await ContactMe.findByIdAndDelete(params.id);

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/admin/messages/[id] error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
