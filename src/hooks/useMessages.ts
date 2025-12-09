import { useState, useEffect } from "react";
import { Message } from "@harts/lib/types";

function useMessages(page: number, limit: number) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMessages() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/admin/messages?page=${page}&limit=${limit}`
        );
        if (!res.ok) throw new Error("Failed to fetch messages");
        const data: Message[] = await res.json();
        setMessages((prev) => [...prev, ...data]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, [page, limit]);

  return { messages, loading };
}

export default useMessages;
