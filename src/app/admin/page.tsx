// src/app/admin/page.tsx

// Next.js imports
import { redirect } from "next/navigation";
import Link from "next/link";

// NextAuth imports
import { getServerSession } from "next-auth/next";

// Auth options import
import { authOptions } from "@hart/server/auth/nAuth";

// UI component imports
import LogoutButton from "@hart/lib/ui/LogoutButton";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (session.user.role !== "admin") redirect("/");

  return (
    <section className="max-w-4xl mx-auto py-12">
      <h1 className="hart-h1 mb-2">Hi {session.user.username}!</h1>
      <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
  <li>
    <a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      Dashboard
      <span className="badge badge-xs">99+</span>
    </a>
  </li>
  <li>
    <Link href="/admin/messages">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Messages
      <span className="badge badge-xs badge-warning">NEW</span>
    </Link>
  </li>
  <li>
    <a>
      Stats
      <span className="badge badge-xs badge-info"></span>
    </a>
  </li>
</ul>
      <p className="mb-8 text-lg text-muted-foreground">
        This is where you can see messages you have received.
      </p>
      <LogoutButton />
    </section>
  );
}
