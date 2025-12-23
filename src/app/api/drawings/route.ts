// src/app/api/drawings/route.ts

import { NextResponse } from "next/server";

import { Drawing } from "@hart/server/models";
import { getPresignedUrl } from "@hart/server/upload";
import { connectToDatabase } from "@hart/server/db/mongodb";

const DEFAULT_LIMIT = 12;

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const skip = parseInt(searchParams.get("skip") || "0", 10);
    const limit = parseInt(
      searchParams.get("limit") || DEFAULT_LIMIT.toString(),
      10
    );

    const drawings = await Drawing.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    if (drawings.length === 0) {
      return NextResponse.json([]);
    }

    const hydratedDrawings = await Promise.all(
      drawings.map(async (drawing) => {
        const [thumbnailUrl, fileUrl] = await Promise.all([
          getPresignedUrl(drawing.thumbnailName),
          getPresignedUrl(drawing.fileName),
        ]);

        return {
          _id: drawing._id.toString(),
          title: drawing.title,
          description: drawing.description,
          price: drawing.price,
          tags: drawing.tags || [],
          createdAt: drawing.createdAt.toISOString(),
          thumbnailUrl,
          fileUrl,
        };
      })
    );

    return NextResponse.json(hydratedDrawings);
  } catch (error) {
    console.error("List drawings error:", error);
    return NextResponse.json(
      { message: "Failed to fetch drawings" },
      { status: 500 }
    );
  }
}
