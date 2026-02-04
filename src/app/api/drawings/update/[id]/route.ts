// src/app/api/drawings/update/[id]/route.ts

import { auth } from "@hart/server/auth/auth";
import { NextResponse } from "next/server";
import { Drawing } from "@hart/server/models";
import { connectToDatabase } from "@hart/server/db/mongodb";
import {
  generateFileName,
  generateThumbnail,
  s3DeleteObject,
  uploadFileToS3,
} from "@hart/server/upload";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const session = await auth();
    const user = session?.user;

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
    const drawing = await Drawing.findById(params.id);

    if (!drawing) {
      return NextResponse.json(
        { message: "Drawing not found." },
        { status: 404 }
      );
    }

    const formData = await req.formData();

    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const file = formData.get("file") as File | null;
    const priceStr = formData.get("price") as string | null;
    const tagsStr = formData.get("tags") as string | null;

    if (!title || !description) {
      return NextResponse.json(
        { message: "Title and description are required" },
        { status: 400 }
      );
    }

    const price = priceStr ? parseFloat(priceStr) : 0;
    if (isNaN(price) || price < 0) {
      return NextResponse.json(
        { message: "Price must be a valid non-negative number" },
        { status: 400 }
      );
    }

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

    if (file && file.size > 0) {
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

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const originalFileName = generateFileName(file.name, "drawings");
      const fileName = await uploadFileToS3(buffer, originalFileName, file.type);

      const { thumbnailBuffer, thumbnailFileName } = await generateThumbnail(
        buffer,
        file.name,
        "drawings"
      );
      const thumbnailName = await uploadFileToS3(
        thumbnailBuffer,
        thumbnailFileName,
        "image/webp"
      );

      if (drawing.fileName) {
        await s3DeleteObject(drawing.fileName);
      }
      if (drawing.thumbnailName) {
        await s3DeleteObject(drawing.thumbnailName);
      }

      drawing.fileName = fileName;
      drawing.thumbnailName = thumbnailName;
    }

    drawing.title = title.trim();
    drawing.description = description.trim();
    drawing.price = price;
    drawing.tags = tags;

    await drawing.save();

    return NextResponse.json(
      {
        message: "Drawing updated successfully",
        drawing: {
          id: drawing._id.toString(),
          title: drawing.title,
          description: drawing.description,
          price: drawing.price,
          tags: drawing.tags,
          createdAt: drawing.createdAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update drawing error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
