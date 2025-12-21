// src/lib/validators/CreateDrawing.ts
import { z } from "zod";

export const createDrawingSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }).trim(),
  description: z
    .string()
    .min(1, { message: "Description is required." })
    .trim(),
  file: z
    .any()
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        (files[0]?.type && files[0].type.startsWith("image/")),
      { message: "Only image files are allowed (jpg, png, gif, webp, etc.)." }
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        (files[0]?.size && files[0].size <= 20 * 1024 * 1024),
      { message: "Image must be under 20 MB." }
    ),
  price: z.number().min(0).default(0),
  tags: z.array(z.string()).default([]),
});

export type CreateDrawingInput = z.input<typeof createDrawingSchema>;
