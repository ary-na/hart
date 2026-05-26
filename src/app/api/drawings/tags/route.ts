// src/app/api/drawings/tags/route.ts

import { NextResponse } from "next/server";
import { Drawing } from "@hart/server/models";
import { connectToDatabase } from "@hart/server/db/mongodb";

export async function GET() {
  try {
    await connectToDatabase();
    const tags: string[] = await Drawing.distinct("tags");
    return NextResponse.json({ tags: tags.sort() });
  } catch (error) {
    console.error("GET /api/drawings/tags error:", error);
    return NextResponse.json({ tags: [] }, { status: 500 });
  }
}
