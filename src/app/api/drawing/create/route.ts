// src/app/api/drawing/create/route.ts

import { NextResponse } from "next/server";

import { Drawing } from "@hart/server/models/Drawing";
import { connectToDatabase } from "@hart/server/db/mongodb";
import { getCurrentUser } from "@hart/server/auth/getCurrentUser";
import {
  uploadFileToS3,
  generateFileName,
  generateThumbnail,
} from "@hart/server/upload";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized: Please log in" },
        { status: 401 }
      );
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    await connectToDatabase();
    const formData = await req.formData();

    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const file = formData.get("file") as File | null;
    const priceStr = formData.get("price") as string | null;
    const tagsStr = formData.get("tags") as string | null;

    // Required fields
    if (!title || !description || !file || file.size === 0) {
      return NextResponse.json(
        { message: "Title, description, and file are required" },
        { status: 400 }
      );
    }

    // Price parsing
    const price = priceStr ? parseFloat(priceStr) : 0;
    if (isNaN(price) || price < 0) {
      return NextResponse.json(
        { message: "Price must be a valid non-negative number" },
        { status: 400 }
      );
    }

    // Tags parsing
    let tags: string[] = [];
    if (tagsStr) {
      try {
        tags = JSON.parse(tagsStr);
        if (!Array.isArray(tags)) throw new Error();
      } catch {
        tags = tagsStr
          .split(",")
          .map((t) => t.trim().toLowerCase())
          .filter(Boolean);
      }
    }

    // File validation
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Only image files are allowed" },
        { status: 400 }
      );
    }

    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { message: "Image must be under 50 MB" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const originalFileName = generateFileName(file.name, "drawings");
    const fileName = await uploadFileToS3(buffer, originalFileName, file.type);

    const { thumbnailBuffer, thumbnailFileName } = await generateThumbnail(
      buffer,
      file.name,
      "drawings"
    );
    // drawings/thumbnails/uuid.webp
    const thumbnailName = await uploadFileToS3(
      thumbnailBuffer,
      thumbnailFileName,
      "image/webp"
    );

    const drawing = await Drawing.create({
      title: title.trim(),
      description: description.trim(),
      fileName,
      thumbnailName,
      price,
      tags,
    });

    return NextResponse.json(
      {
        message: "Drawing created successfully",
        drawing: {
          id: drawing._id.toString(),
          title: drawing.title,
          description: drawing.description,
          price: drawing.price,
          tags: drawing.tags,
          createdAt: drawing.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create drawing error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
