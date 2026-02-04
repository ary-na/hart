// src/hooks/useMessages.ts

import { useState, useCallback, useRef } from "react";

import { Message, FetchOptions, UseMessagesReturn } from "@hart/lib/types";

const LIMIT = 5;

export const useMessages = (): UseMessagesReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [unreadCount, setUnreadCount] = useState(0);

  const skipRef = useRef(0);
  const isFetchingRef = useRef(false);

  const fetchMessages = useCallback(
    async ({
      append = false,
      limit = LIMIT,
      archived = "0",
    }: (FetchOptions & { archived?: string }) = {}): Promise<void> => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      setLoading(true);
      setError(null);

      try {
        const skip = append ? skipRef.current : 0;
        const res = await fetch(
          `/api/admin/messages?skip=${skip}&limit=${limit}&archived=${archived}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || `Failed to fetch messages (${res.status})`);
        }

        const data = await res.json();
        const nextMessages: Message[] = Array.isArray(data)
          ? data
          : data.messages ?? [];

        setMessages((prev) =>
          append ? [...prev, ...nextMessages] : nextMessages
        );
        skipRef.current = append
          ? skipRef.current + nextMessages.length
          : nextMessages.length;
        if (!Array.isArray(data) && typeof data.unreadCount === "number") {
          setUnreadCount(data.unreadCount);
        }
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
    async (messageId: string, archived: "0" | "1" = "0"): Promise<boolean> => {
      if (deletingIds.has(messageId)) return false;

      // 1. Optimistically remove the deleted message
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
      setDeletingIds((prev) => new Set(prev).add(messageId));

      try {
        const res = await fetch(`/api/admin/messages/delete/${messageId}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          const message =
            errorData.message || `Failed to delete (${res.status})`;

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
            `/api/admin/messages?skip=${skipRef.current}&limit=1&archived=${archived}`,
            { cache: "no-store" }
          );

          if (moreRes.ok) {
            const extraData = await moreRes.json();
            const extraList = Array.isArray(extraData)
              ? extraData
              : extraData.messages ?? [];
            const extraMessage = extraList[0];
            if (extraMessage) {
              setMessages((prev) => [...prev, extraMessage]);
              skipRef.current += 1; // update cursor
            }
          }
          // If no more messages left → do nothing (list stays <5, which is correct)
        }
        return true;
      } catch (err) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        console.error("Delete failed:", e);
        setError(e);

        // Revert optimistic delete on real failure
        await fetchMessages({ append: false, archived });
        return false;
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

  const archiveMessage = useCallback(
    async (messageId: string): Promise<boolean> => {
      if (deletingIds.has(messageId)) return false;

      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));

      try {
        const res = await fetch(`/api/admin/messages/archive/${messageId}`, {
          method: "PATCH",
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            errorData.message || `Failed to archive (${res.status})`
          );
        }

        await fetchMessages({ append: false, archived: "0" });
        return true;
      } catch (err) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        console.error("Archive failed:", e);
        setError(e);
        await fetchMessages({ append: false, archived: "0" });
        return false;
      }
    },
    [deletingIds, fetchMessages]
  );

  const unarchiveMessage = useCallback(
    async (messageId: string): Promise<boolean> => {
      if (deletingIds.has(messageId)) return false;

      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));

      try {
        const res = await fetch(`/api/admin/messages/unarchive/${messageId}`, {
          method: "PATCH",
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            errorData.message || `Failed to unarchive (${res.status})`
          );
        }

        await fetchMessages({ append: false, archived: "1" });
        return true;
      } catch (err) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        console.error("Unarchive failed:", e);
        setError(e);
        await fetchMessages({ append: false, archived: "1" });
        return false;
      }
    },
    [deletingIds, fetchMessages]
  );

  const updateReadStatus = useCallback(
    async (
      messageId: string,
      isRead: boolean,
      archived: "0" | "1" = "0"
    ): Promise<boolean> => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, isRead } : msg
        )
      );

      try {
        const res = await fetch(`/api/admin/messages/read/${messageId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isRead }),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            errorData.message || `Failed to update (${res.status})`
          );
        }

        await fetchMessages({ append: false, archived });
        return true;
      } catch (err) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        console.error("Update read status failed:", e);
        setError(e);
        await fetchMessages({ append: false, archived });
        return false;
      }
    },
    [fetchMessages]
  );

  return {
    messages,
    loading,
    error,
    deletingIds,
    unreadCount,
    fetchMessages,
    deleteMessage,
    archiveMessage,
    unarchiveMessage,
    updateReadStatus,
  };
};
