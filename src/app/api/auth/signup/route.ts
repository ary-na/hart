// src/app/api/auth/signup/route.ts

import { z } from "zod";
import { NextResponse } from "next/server";
import { User } from "@hart/server/models";
import { userSignupSchema } from "@hart/lib/validators";
import { connectToDatabase } from "@hart/server/db/mongodb";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const data = userSignupSchema.parse(body);

    // Check for existing user
    const existing = await User.findOne({ email: data.email }).lean();
    if (existing) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 400 }
      );
    }

    await User.create({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    // 201 Created – success (no token here; usually you redirect to login or auto-sign-in)
    return NextResponse.json(
      { message: "Account created successfully" },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[SIGNUP_ERROR]", error);

    // Zod validation error → return first message (or all if you prefer)
    if (error instanceof z.ZodError) {
      const fieldErrors = error.issues.reduce((acc, issue) => {
        const path = issue.path.join(".");
        acc[path] = issue.message;
        return acc;
      }, {} as Record<string, string>);

      return NextResponse.json(
        { message: "Validation failed", errors: fieldErrors },
        { status: 400 }
      );
    }

    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Something went wrong – please try again later" },
      { status: 500 }
    );
  }
}
