// src/components/RecentContactMes.tsx

"use client";

import { useEffect } from "react";
import Link from "next/link";

import { useMessages } from "@hart/hooks/useMessages";

export default function AdminRecentContactMes() {
  const {
    messages,
    loading,
    error,
    fetchMessages,
    deleteMessage,
    deletingIds,
  } = useMessages();

  useEffect(() => {
    fetchMessages({ limit: 3 });
  }, [fetchMessages]);

  if (loading) return <p className="opacity-70">Loading messages…</p>;
  if (error) return <p className="text-error">Failed to load messages</p>;
  if (!messages.length) return <p>No messages yet</p>;

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2>Latest messages</h2>
        <Link href="/admin/messages" className="btn btn-link btn-sm">
          View all
        </Link>
      </div>

      <ul className="space-y-3">
        {messages.slice(0, 3).map((msg) => {
          const isDeleting = deletingIds.has(msg._id);

          return (
            <li
              key={msg._id}
              className="rounded-lg border p-4 bg-base-100 flex justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="font-medium">{msg.name}</p>
                <p className="text-sm opacity-70 truncate">{msg.enquiry}</p>
              </div>

              <button
                onClick={() => deleteMessage(msg._id)}
                disabled={isDeleting}
                className="btn btn-sm btn-error btn-outline"
              >
                {isDeleting ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  "Delete"
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
