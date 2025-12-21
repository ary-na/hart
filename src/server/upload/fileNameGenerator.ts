// src/lib/utils/fileNameGenerator.ts

import { v4 as uuidv4 } from "uuid";

export const generateFileName = (
  originalName: string,
  folder: string,
  forcedExtension?: string
): string => {
  const uuid = uuidv4();

  let extension: string;
  if (forcedExtension) {
    extension = forcedExtension.replace(/^\.+/, "");
  } else {
    const parts = originalName.split(".");
    extension = parts.length > 1 ? parts.pop()! : "jpg";
  }
  const cleanFolder = folder.replace(/^\/+|\/+$/g, "");

  return `${cleanFolder}/${uuid}.${extension}`;
};
