"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Toast } from "@hart/lib/ui/Toast";
import { ConfirmModal } from "@hart/lib/ui";
import { useMessages } from "@hart/hooks/useMessages";

const RecentMessages = () => {
  const { showToast } = Toast();

  const {
    messages,
    loading,
    error,
    fetchMessages,
    deleteMessage,
    deletingIds,
  } = useMessages();

  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages({ limit: 3 });
  }, [fetchMessages]);

  const handleConfirmDelete = async () => {
    if (!confirmId) return;

    const ok = await deleteMessage(confirmId);
    setConfirmId(null);

    if (ok) {
      showToast("Message deleted", "success");
    } else {
      showToast("Failed to delete message", "error");
    }
  };

  if (loading) return <p className="opacity-70">Loading messages…</p>;
  if (error) return <p className="text-error">Failed to load messages</p>;
  if (!messages.length) return <p>No messages yet</p>;

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <h2>Recent messages</h2>
          <Link href="/admin/messages" className="link">
            View all
          </Link>
        </div>

        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            Last three messages received
          </li>

          {messages.slice(0, 3).map((msg) => {
            const isDeleting = deletingIds.has(msg._id);

            return (
              <li key={msg._id} className="list-row items-center gap-4">
                <div className="min-w-0">
                  <div className="font-medium">{msg.name}</div>
                  <div className="text-xs opacity-60 truncate">
                    {msg.enquiry}
                  </div>
                </div>

                <button
                  onClick={() => setConfirmId(msg._id)}
                  disabled={isDeleting}
                  className="btn btn-square ms-auto btn-error btn-outline btn-sm"
                >
                  ✕
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <ConfirmModal
        open={!!confirmId}
        title="Delete message?"
        message="This message will be permanently removed."
        loading={confirmId ? deletingIds.has(confirmId) : false}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmId(null)}
      />
    </>
  );
};

export default RecentMessages;
