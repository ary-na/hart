// src/app/api/drawings/thumbnail/[name]/route.ts

import { NextResponse } from "next/server";
import { getPresignedUrl } from "@hart/server/upload";

export async function GET(
  _req: Request,
  context: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await context.params;

    if (!name) {
      return NextResponse.json(
        { message: "Thumbnail name is required." },
        { status: 400 }
      );
    }

    const url = await getPresignedUrl(name);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Get thumbnail url error:", error);
    return NextResponse.json(
      { message: "Failed to get thumbnail url." },
      { status: 500 }
    );
  }
}
