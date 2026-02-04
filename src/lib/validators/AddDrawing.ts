// src/lib/validators/AddDrawing.ts

import { z } from "zod";

const baseDrawingSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  price: z
    .preprocess((val) => {
      const num =
        typeof val === "string" || typeof val === "number" ? Number(val) : NaN;
      return isNaN(num) ? 0 : num;
    }, z.number().min(0))
    .optional()
    .default(0),
  tags: z
    .string()
    .optional()
    .refine((val) => !val || /^(\s*\w+\s*)(,\s*\w+\s*)*$/.test(val), {
      message: "Tags must be comma-separated (e.g. art, sketch, portrait)",
    }),
});

const requiredFileSchema = z
  .any()
  .refine((files) => files && files.length > 0, {
    message: "A file is required.",
  })
  .refine((files) => files?.[0]?.type?.startsWith("image/"), {
    message: "Only image files are allowed (jpg, png, gif, webp, etc.).",
  })
  .refine((files) => files?.[0]?.size <= 50 * 1024 * 1024, {
    message: "Image must be under 50 MB.",
  });

const optionalFileSchema = z
  .any()
  .optional()
  .refine(
    (files) =>
      !files ||
      files.length === 0 ||
      files?.[0]?.type?.startsWith("image/"),
    {
      message: "Only image files are allowed (jpg, png, gif, webp, etc.).",
    }
  )
  .refine(
    (files) =>
      !files || files.length === 0 || files?.[0]?.size <= 50 * 1024 * 1024,
    {
      message: "Image must be under 50 MB.",
    }
  );

export const addDrawingSchema = baseDrawingSchema.extend({
  file: requiredFileSchema,
});

export const updateDrawingSchema = baseDrawingSchema.extend({
  file: optionalFileSchema,
});

export type AddDrawingInput = z.input<typeof addDrawingSchema>;
export type UpdateDrawingInput = z.input<typeof updateDrawingSchema>;
