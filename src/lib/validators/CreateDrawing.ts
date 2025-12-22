// src/lib/validators/CreateDrawing.ts
import { z } from "zod";

export const createDrawingSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  file: z
    .any()
    .refine((files) => files && files.length > 0, {
      message: "A file is required.",
    })
    .refine((files) => files?.[0]?.type?.startsWith("image/"), {
      message: "Only image files are allowed (jpg, png, gif, webp, etc.).",
    })
    .refine((files) => files?.[0]?.size <= 50 * 1024 * 1024, {
      message: "Image must be under 50 MB.",
    }),
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

export type CreateDrawingInput = z.input<typeof createDrawingSchema>;
