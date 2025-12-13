// src/hooks/useMessages.ts
// React imports
import { useState, useCallback, useRef } from "react";
// Type imports
import { Message, MessagesFetchOptions, UseMessagesReturn } from "@hart/lib/types";

const LIMIT = 5;

// ← ADD THIS: Tell TypeScript what the hook returns
export const useMessages = (): UseMessagesReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const skipRef = useRef(0);
  const isFetchingRef = useRef(false);

  const fetchMessages = useCallback(
    async ({ append = false, limit = LIMIT }: MessagesFetchOptions = {}): Promise<void> => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      setLoading(true);
      setError(null);

      try {
        const skip = append ? skipRef.current : 0;
        const res = await fetch(
          `/api/admin/messages?skip=${skip}&limit=${limit}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || `Failed to fetch messages (${res.status})`);
        }

        const data: Message[] = await res.json();
        setMessages((prev) => (append ? [...prev, ...data] : data));
        skipRef.current = append ? skipRef.current + data.length : data.length;
      } catch (err) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        console.error("useMessages.fetchMessages:", e);
        setError(e);
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    },
    []
  );

const deleteMessage = useCallback(
  async (messageId: string): Promise<void> => {
    if (deletingIds.has(messageId)) return;

    // 1. Optimistically remove the deleted message
    setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    setDeletingIds((prev) => new Set(prev).add(messageId));

    try {
      const res = await fetch(`/api/admin/messages/delete/${messageId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const message = errorData.message || `Failed to delete (${res.status})`;

        if (res.status === 404) {
          console.info("Message already deleted elsewhere");
          // Still try to refill if needed
        } else if (res.status === 403) {
          throw new Error("Forbidden: Admin access required");
        } else {
          throw new Error(message);
        }
      }

      // 2. SUCCESS: Try to load ONE more message to replace the deleted one
      const currentCount = messages.length - 1; // after optimistic delete
      if (currentCount < LIMIT) {
        // We have less than 5 → fetch exactly 1 more
        const moreRes = await fetch(
          `/api/admin/messages?skip=${skipRef.current}&limit=1`,
          { cache: "no-store" }
        );

        if (moreRes.ok) {
          const [extraMessage] = await moreRes.json();
          if (extraMessage) {
            setMessages((prev) => [...prev, extraMessage]);
            skipRef.current += 1; // update cursor
          }
        }
        // If no more messages left → do nothing (list stays <5, which is correct)
      }
    } catch (err) {
      const e = err instanceof Error ? err : new Error("Unknown error");
      console.error("Delete failed:", e);
      setError(e);

      // Revert optimistic delete on real failure
      await fetchMessages({ append: false });
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(messageId);
        return next;
      });
    }
  },
  [deletingIds, messages.length, fetchMessages] // ← added messages.length to deps
);

  return {
    messages,
    loading,
    error,
    deletingIds,
    fetchMessages,
    deleteMessage,
  };
};