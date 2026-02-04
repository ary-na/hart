// src/app/admin/messages/archived/page.tsx

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useMessages } from "@hart/hooks/useMessages";
import { Breadcrumbs } from "@hart/lib/ui/Breadcrumbs";
import { ConfirmModal } from "@hart/lib/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEnvelope,
  faEnvelopeOpenText,
  faBoxArchive,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ArchivedMessages = () => {
  const {
    messages,
    loading,
    error,
    deletingIds,
    fetchMessages,
    deleteMessage,
    updateReadStatus,
    unarchiveMessage,
  } = useMessages();

  const didInitialLoad = useRef(false);

  useEffect(() => {
    if (didInitialLoad.current) return;
    didInitialLoad.current = true;
    fetchMessages({ append: false, archived: "1" });
  }, [fetchMessages]);

  const handleLoadMore = async () => {
    await fetchMessages({ append: true, archived: "1" });
  };

  const [confirmId, setConfirmId] = useState<string | null>(null);

  const selectedMessage = useMemo(
    () => messages.find((msg) => msg._id === confirmId) ?? null,
    [confirmId, messages]
  );
  const isConfirmDeleting = confirmId ? deletingIds.has(confirmId) : false;

  const handleDelete = (id: string) => {
    setConfirmId(id);
  };

  return (
    <section className="h-container py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] opacity-60">
            Archive
          </p>
          <h1 className="mt-2">Archived Messages</h1>
          <p className="mt-3 text-sm opacity-70">
            Messages moved from your main inbox.
          </p>
        </div>

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/admin" },
            { label: "Messages", href: "/admin/messages" },
            { label: "Archived" },
          ]}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Link href="/admin/messages" className="btn btn-ghost btn-sm">
          Back to inbox
        </Link>
      </div>

      {error && <p className="text-red-600 mb-4">{error.message}</p>}
      {loading && messages.length === 0 && (
        <p className="mb-4">Loading archived messages...</p>
      )}

      <div className="mt-8 space-y-4">
        {messages.length === 0 && !loading && (
          <p className="text-gray-500">No archived messages yet.</p>
        )}

        {messages.map((msg) => (
          <article
            key={msg._id}
            className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold flex items-center gap-2">
                  {msg.name}
                  {msg.isRead ? (
                    <span
                      className="badge badge-outline badge-sm flex items-center"
                      aria-label="Read"
                      title="Read"
                    >
                      <FontAwesomeIcon icon={faEnvelopeOpenText} />
                    </span>
                  ) : (
                    <span
                      className="badge badge-primary badge-sm flex items-center"
                      aria-label="Unread"
                      title="Unread"
                    >
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                  )}
                </p>
                <p className="text-sm opacity-70">{msg.email}</p>
              </div>
              <p className="text-xs uppercase tracking-[0.3em] opacity-50">
                {new Date(msg.createdAt).toLocaleDateString()}
              </p>
            </div>

            <p className="mt-4 text-sm leading-relaxed opacity-80">
              {msg.enquiry}
            </p>

            {msg.imageUrl && (
              <Image
                src={msg.imageUrl}
                alt={`Uploaded by ${msg.name}`}
                width={640}
                height={420}
                className="mt-4 w-full rounded-xl object-cover"
                unoptimized
              />
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs opacity-60">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateReadStatus(msg._id, !msg.isRead, "1");
                  }}
                  disabled={deletingIds.has(msg._id)}
                >
                  <FontAwesomeIcon
                    icon={msg.isRead ? faEnvelopeOpenText : faCheck}
                    className="mr-2"
                  />
                  {msg.isRead ? "Mark unread" : "Mark read"}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    await unarchiveMessage(msg._id);
                  }}
                  disabled={deletingIds.has(msg._id)}
                >
                  <FontAwesomeIcon icon={faBoxArchive} className="mr-2" />
                  Restore
                </button>
                <button
                  type="button"
                  className="btn btn-error btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(msg._id);
                  }}
                  disabled={deletingIds.has(msg._id)}
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  {deletingIds.has(msg._id) ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
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

      <ConfirmModal
        open={!!confirmId}
        title="Delete message?"
        message={`Are you sure you want to delete the message from "${selectedMessage?.name}"?`}
        loading={isConfirmDeleting}
        onConfirm={async () => {
          if (!confirmId) return;
          await deleteMessage(confirmId, "1");
          setConfirmId(null);
        }}
        onCancel={() => {
          setConfirmId(null);
        }}
      />
    </section>
  );
};

export default ArchivedMessages;
