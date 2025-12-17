// src/app/admin/messages/page.tsx

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { useMessages } from "@hart/hooks/useMessages";
import { Breadcrumbs } from "@hart/lib/ui/Breadcrumbs";

export default function AdminMessagesPage() {
  const {
    messages,
    loading,
    error,
    deletingIds,
    fetchMessages,
    deleteMessage,
  } = useMessages();

  const didInitialLoad = useRef(false);

  useEffect(() => {
    if (didInitialLoad.current) return;
    didInitialLoad.current = true;
    fetchMessages({ append: false });
  }, [fetchMessages]);

  const handleLoadMore = async () => {
    await fetchMessages({ append: true });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    deleteMessage(id);
  };

  return (
    <section className="container max-w-4xl mx-auto p-8">
      <h1>Messages</h1>

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/admin" },
          { label: "Messages" },
        ]}
      />

      {error && <p className="text-red-600 mb-4">{error.message}</p>}
      {loading && messages.length === 0 && (
        <p className="mb-4">Loading messages...</p>
      )}

      <div className="space-y-4">
        {messages.length === 0 && !loading && (
          <p className="text-gray-500">No messages found.</p>
        )}

        {messages.map((msg) => (
          <article key={msg._id} className="p-4 border rounded-lg shadow-sm">
            <p>
              <strong>Name:</strong> {msg.name}
            </p>
            <p>
              <strong>Email:</strong> {msg.email}
            </p>
            <p>
              <strong>Message:</strong> {msg.enquiry}
            </p>

            {msg.imageUrl && (
              <Image
                src={msg.imageUrl}
                alt={`Uploaded by ${msg.name}`}
                width={400}
                height={300}
                className="mt-4 rounded"
                unoptimized
              />
            )}

            <button
              className="btn btn-danger mt-4"
              onClick={() => handleDelete(msg._id)}
              disabled={deletingIds.has(msg._id)} // ← Disable while deleting
            >
              {deletingIds.has(msg._id) ? "Deleting..." : "Delete"}
            </button>

            <p className="text-sm text-gray-500 mt-2">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </article>
        ))}
      </div>

      {messages.length > 0 && (
        <button
          onClick={handleLoadMore}
          disabled={loading}
          className="btn btn-secondary mt-6"
        >
          {loading ? "Loading more..." : "Load More"}
        </button>
      )}
    </section>
  );
}
