// src/hooks/useMessages.ts

// React imports
import { useState, useCallback } from "react";

// Type imports
import { Message } from "@hart/lib/types";

const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [skip, setSkip] = useState(0);
  const limit = 5;

  const fetchMessages = useCallback(
    async ({ append = false } = {}) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/admin/messages?skip=${append ? skip : 0}&limit=${limit}`);

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || `Failed to fetch messages (${res.status})`);
        }

        const data: Message[] = await res.json();

        setMessages((prev) => (append ? [...prev, ...data] : data));
        setSkip((prev) => (append ? prev + data.length : data.length));
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        console.error("useMessages.fetchMessages error:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [skip]
  );

  return { messages, loading, error, fetchMessages };
};

export default useMessages;
