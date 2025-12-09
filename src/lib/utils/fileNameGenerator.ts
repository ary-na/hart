// src/lib/utils/uniqueNameGenerator.ts

import { v4 as uuidv4 } from "uuid";

export function generateFileName(originalName: string) {
  const extension = originalName.split('.').pop();
  return `portfolios/${uuidv4()}.${extension}`;  // changed from "uploads" to "portfolios"
}

