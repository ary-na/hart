// src/hooks/useMessages.ts

// React imports
import { useState, useCallback, useRef } from "react";

// Type imports
import { Message, MessagesFetchOptions } from "@hart/lib/types";

const LIMIT = 5;

const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const skipRef = useRef(0);
  const isFetchingRef = useRef(false);

  const fetchMessages = useCallback(
    async ({ append = false, limit = LIMIT }: MessagesFetchOptions = {}) => {
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

        // Update skip cursor
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

  return { messages, loading, error, fetchMessages };
};

export default useMessages;
