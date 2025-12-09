// src/app/api/contact/route.ts

import { NextResponse } from "next/server";
import { connectToDatabase } from "@harts/lib/db/mongodb";
import { ContactMe } from "@harts/lib/models";
import { generateFileName } from "@harts/lib/utils";
import { uploadFileToS3 } from "@harts/lib/upload";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const enquiry = formData.get("enquiry") as string | null;
    const file = formData.get("file") as File | null;

    // Validate required fields
    if (!name || !email || !enquiry) {
      return NextResponse.json(
        { message: "Name, email and enquiry are required" },
        { status: 400 }
      );
    }

    let fileName: string | undefined = undefined;

    if (file && file.size > 0) {
      // Reject non-image files
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { message: "Only image files are allowed" },
          { status: 400 }
        );
      }

      // Convert file to Buffer for upload
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Generate unique filename
      const uniqueFileName = generateFileName(file.name);

      // Use file MIME type or fallback
      const contentType = file.type || "application/octet-stream";

      // Upload file to S3 and get the object key
      fileName = await uploadFileToS3(buffer, uniqueFileName, contentType);
    }

    // Save to MongoDB with file key or undefined if no file
    await ContactMe.create({
      name,
      email,
      enquiry,
      fileName: fileName,
    });

    return NextResponse.json({ message: "Saved" }, { status: 200 });
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
