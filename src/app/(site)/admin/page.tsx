// src/app/admin/page.tsx

import { auth } from "@hart/server/auth/auth";
import { Breadcrumbs } from "@hart/lib/ui/Breadcrumbs";
import RecentMessages from "@hart/components/admin/RecentMessages";

const Admin = async () => {
  const session = await auth();

  const user = session?.user;

  return (
    <section className="h-container py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] opacity-60">
            Admin Dashboard
          </p>
          <h1 className="mt-2">
            Welcome back, <span>{user?.firstName}</span>.
          </h1>
        </div>
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Dashboard" }]}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Quick actions</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <a
              href="/gallery"
              className="rounded-xl border border-base-300 bg-base-50 p-4 hover:border-accent transition"
            >
              <p className="text-sm uppercase tracking-[0.3em] opacity-60">
                Gallery
              </p>
              <p className="mt-2 text-lg font-semibold">Manage artworks</p>
              <p className="mt-1 text-sm opacity-70">
                Add, edit, and curate featured pieces.
              </p>
            </a>
            <a
              href="/admin/messages"
              className="rounded-xl border border-base-300 bg-base-50 p-4 hover:border-accent transition"
            >
              <p className="text-sm uppercase tracking-[0.3em] opacity-60">
                Messages
              </p>
              <p className="mt-2 text-lg font-semibold">View enquiries</p>
              <p className="mt-1 text-sm opacity-70">
                Respond to new commission requests.
              </p>
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Studio focus</h2>
          <p className="mt-3 text-sm opacity-70">
            Keep the gallery current and respond to enquiries within 48 hours to
            maintain momentum.
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg bg-base-50 px-4 py-3">
              <span>Review new messages</span>
              <span className="badge badge-outline">Daily</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-base-50 px-4 py-3">
              <span>Publish new artwork</span>
              <span className="badge badge-outline">Weekly</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <RecentMessages />
      </div>
    </section>
  );
};

export default Admin;
