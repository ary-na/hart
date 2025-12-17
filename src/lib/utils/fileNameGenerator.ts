// src/lib/utils/fileNameGenerator.ts

import { v4 as uuidv4 } from "uuid";

export function generateFileName(originalName: string) {
  const extension = originalName.split(".").pop();
  return `portfolios/${uuidv4()}.${extension}`;
}
