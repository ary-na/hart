// src/lib/schemas/ContactMe.ts

// Zod import
import { z } from "zod";

const nonEmptyEmail = z.string().min(1, { message: "Email is required." });

export const contactMeSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),

  email: z
    .union([nonEmptyEmail])
    .refine((val) => val === "" || z.email().safeParse(val).success, {
      message: "Please enter a valid email address.",
    }),

  enquiry: z.string().min(1, { message: "Enquiry message is required." }),

  file: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        (files[0]?.type && files[0].type.startsWith("image/")),
      { message: "Only image files are allowed (jpg, png, gif, webp, etc.)" }
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        (files[0]?.size && files[0].size <= 20 * 1024 * 1024),
      { message: "Image must be under 20 MB" }
    ),
});

export type ContactMeInput = z.infer<typeof contactMeSchema>;
