// src/server/upload/generateThumbnail.ts

import sharp from "sharp";
import { generateFileName } from "./fileNameGenerator";

export const generateThumbnail = async (
  originalBuffer: Buffer,
  originalFileName: string,
  folder: string = "drawings"
): Promise<{ thumbnailBuffer: Buffer; thumbnailFileName: string }> => {
  const thumbnailBuffer = await sharp(originalBuffer)
    .resize(400, 400, {
      fit: "cover",
      withoutEnlargement: true,
    })
    .webp({ quality: 80 })
    .toBuffer();

  // Generate UUID-based name with .webp extension
  const uuidFileName = generateFileName(originalFileName, folder, "webp");

  const thumbnailFileName = uuidFileName.replace(
    `${folder}/`,
    `${folder}/thumbnails/`
  );

  return {
    thumbnailBuffer,
    thumbnailFileName,
  };
};
