// src/app/admin/page.tsx

import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@hart/server/auth/nAuth";
import AdminRecentContactMes from "@hart/components/RecentContactMes";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (session.user.role !== "admin") redirect("/");

  const user = session.user;

  return (
    <section className="container max-w-4xl mx-auto p-8">
      <h1>
        Welcome <span>{user.username}</span>!
      </h1>
      <div className="breadcrumbs text-sm mb-2">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>Dashboard</li>
        </ul>
      </div>

      <AdminRecentContactMes />
    </section>
  );
}
