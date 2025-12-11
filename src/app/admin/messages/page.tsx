"use client";

import { useEffect } from "react";
import useMessages from "@hart/hooks/useMessages";
import Image from "next/image";
import Link from "next/link";

export default function AdminMessagesPage() {
  const { messages, loading, fetchMessages, error } = useMessages();

  useEffect(() => {
    fetchMessages({ append: false });
  }, [fetchMessages]);

  const handleLoadMore = async () => {
    await fetchMessages({ append: true });
  };

  // Delete handler function
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to delete");
      }
      // Reload messages list after deletion
      await fetchMessages({ append: false });
    } catch (err) {
      alert(`Delete failed: ${(err as Error).message}`);
    }
  };

  return (
    <section className="container mx-auto max-w-3xl py-10">
      <h1 className="text-3xl font-bold mb-6">📨 Messages</h1>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link href="/admin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-4 w-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                ></path>
              </svg>
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/messages">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-4 w-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                ></path>
              </svg>
              Messages
            </Link>
          </li>
        </ul>
      </div>

      {error && <p className="text-red-600 mt-4">{error.message}</p>}
      {loading && <p className="mt-4">Loading messages...</p>}

      <div className="mt-6 space-y-4">
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
              />
            )}

            {/* Delete button */}
            <button
              className="btn btn-danger mt-4"
              onClick={() => handleDelete(msg._id)}
              disabled={loading}
            >
              Delete
            </button>

            <p className="text-sm text-gray-500 mt-2">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </article>
        ))}
      </div>

      {messages.length > 0 && !loading && (
        <button
          onClick={handleLoadMore}
          disabled={loading}
          className="btn btn-secondary mt-6"
        >
          Load More
        </button>
      )}
    </section>
  );
}
