// src/app/admin/page.tsx

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@hart/server/auth/nAuth";
import { Breadcrumbs } from "@hart/lib/ui/Breadcrumbs";
import RecentMessages from "@hart/components/RecentMessages";

const Admin = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (session.user.role !== "admin") redirect("/");

  const user = session.user;

  return (
    <section className="container max-w-4xl mx-auto p-8">
      <h1>
        Welcome <span>{user.username}</span>!
      </h1>

      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Dashboard" }]}
      />

      <RecentMessages />
    </section>
  );
};

export default Admin;
