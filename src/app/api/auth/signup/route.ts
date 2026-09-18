// src/app/api/auth/signup/route.ts

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  return NextResponse.json(
    { message: "Public sign up is not available." },
    { status: 403 }
  );
}
