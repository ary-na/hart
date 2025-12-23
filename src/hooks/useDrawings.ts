// src/hooks/useDrawings.ts
"use client";

import { useState, useCallback, useRef } from "react";
import { Drawing, FetchOptions, UseDrawingsReturn } from "@hart/lib/types";
import { CreateDrawingInput } from "@hart/lib/validators";

const LIMIT = 12;

export const useDrawings = (): UseDrawingsReturn => {
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const skipRef = useRef(0);
  const isFetchingRef = useRef(false);

  const fetchDrawings = useCallback(
    async ({ append = false, limit = LIMIT }: FetchOptions = {}) => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      setLoading(true);
      setError(null);

      try {
        const skip = append ? skipRef.current : 0;

        const url = new URL("/api/drawings", window.location.origin);
        url.searchParams.set("skip", skip.toString());
        if (limit !== undefined) {
          url.searchParams.set("limit", limit.toString());
        }

        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || `Failed to fetch drawings (${res.status})`);
        }

        const data: Drawing[] = await res.json();

        setDrawings((prev) => {
          if (!append) {
            skipRef.current = data.length;
            return data;
          }

          const existingIds = new Set(prev.map((d) => d._id));
          const newUniqueDrawings = data.filter((d) => !existingIds.has(d._id));

          skipRef.current += newUniqueDrawings.length;

          return [...prev, ...newUniqueDrawings];
        });
      } catch (err) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        console.error("useDrawings.fetchDrawings:", e);
        setError(e);
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    },
    []
  );

  const createDrawing = useCallback(
    async (data: CreateDrawingInput): Promise<Drawing | null> => {
      setCreating(true);
      setError(null);
      try {
        const formData = new FormData();
        formData.append("title", data.title.trim());
        formData.append("description", data.description.trim());
        const file = data.file instanceof File ? data.file : data.file?.[0];
        formData.append("file", file);

        let priceToAppend = "0";
        if (data.price != null) {
          const priceStr = String(data.price).trim();
          if (priceStr !== "") {
            const num = parseFloat(priceStr);
            if (!isNaN(num) && num >= 0) {
              priceToAppend = String(num);
            }
          }
        }

        formData.append("price", priceToAppend);
        if (data.tags && data.tags.length > 0) {
          formData.append("tags", JSON.stringify(data.tags));
        }

        const res = await fetch("/api/drawings/create", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            errorData.message || `Failed to create drawing (${res.status})`
          );
        }

        const result = await res.json();
        const newDrawing: Drawing = result.drawing;

        await fetchDrawings({ append: false });

        return newDrawing;
      } catch (err) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        console.error("useDrawings.createDrawing:", e);
        setError(e);
        return null;
      } finally {
        setCreating(false);
      }
    },
    [fetchDrawings]
  );

  const deleteDrawing = useCallback(
    async (drawingId: string): Promise<boolean> => {
      if (deletingIds.has(drawingId)) return false;

      // Optimistic delete
      setDrawings((prev) => prev.filter((d) => d._id !== drawingId));
      setDeletingIds((prev) => new Set(prev).add(drawingId));

      try {
        const res = await fetch(`/api/drawings/delete/${drawingId}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            errorData.message || `Failed to delete (${res.status})`
          );
        }

        await fetchDrawings({ append: false });
        return true;
      } catch (err) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        console.error("useDrawings.deleteDrawing:", e);
        setError(e);
        // Revert on failure
        await fetchDrawings({ append: false });
        return false;
      } finally {
        setDeletingIds((prev) => {
          const next = new Set(prev);
          next.delete(drawingId);
          return next;
        });
      }
    },
    [deletingIds, fetchDrawings]
  );

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    drawings,
    loading,
    error,
    creating,
    deletingIds,
    fetchDrawings,
    createDrawing,
    deleteDrawing,
    resetError,
  };
};
