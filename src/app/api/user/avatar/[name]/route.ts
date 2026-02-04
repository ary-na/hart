// src/app/api/user/avatar/[name]/route.ts

import { auth } from "@hart/server/auth/auth";
import { NextResponse } from "next/server";
import { getPresignedUrl } from "@hart/server/upload";

export async function GET(
  _req: Request,
  context: { params: Promise<{ name: string }> }
) {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name } = await context.params;
    if (!name) {
      return NextResponse.json(
        { message: "Missing avatar name" },
        { status: 400 }
      );
    }

    const url = await getPresignedUrl(name);
    return NextResponse.redirect(url);
  } catch (error) {
    console.error("GET /api/user/avatar/[name] error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
