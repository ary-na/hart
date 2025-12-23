// src/app/api/drawings/delete/[id]/route.ts

import { NextResponse } from "next/server";

import { Drawing } from "@hart/server/models";
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
      return NextResponse.json({ message: "Forbidden." }, { status: 403 });
    }

    await connectToDatabase();

    const drawing = await Drawing.findById(params.id);
    if (!drawing) {
      return NextResponse.json(
        { message: "Drawing not found." },
        { status: 404 }
      );
    }

    // Delete s3 objects.
    if (drawing.fileName) {
      await s3DeleteObject(drawing.fileName);
    }

    if (drawing.thumbnailName) {
      await s3DeleteObject(drawing.thumbnailName);
    }

    await Drawing.findByIdAndDelete(params.id);

    return NextResponse.json(
      { message: "Deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/drawings/delete/[id] error:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
