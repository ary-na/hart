// src/lib/types/Drawing.ts

import { FetchOptions } from "./Hook";
import { CreateDrawingInput } from "../validators";

export interface Drawing {
  _id: string;
  title: string;
  description: string;
  fileName: string;
  thumbnailName: string;
  price: number;
  tags: string[];
  createdAt: string;
}

export type UseDrawingsReturn = {
  drawings: Drawing[];
  loading: boolean;
  error: Error | null;
  creating: boolean;
  deletingIds: Set<string>;
  fetchDrawings: (options?: FetchOptions) => Promise<void>;
  createDrawing: (data: CreateDrawingInput) => Promise<Drawing | null>;
  deleteDrawing: (drawingId: string) => Promise<boolean>;
  resetError: () => void;
};
