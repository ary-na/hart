// src/app/admin/page.tsx

import { auth } from "@hart/auth";
import { Breadcrumbs } from "@hart/lib/ui/Breadcrumbs";
import RecentMessages from "@hart/components/site/RecentMessages";

const Admin = async () => {
  const session = await auth();

  const user = session?.user;

  return (
    <section className="container max-w-4xl mx-auto p-8">
      <h1>
        Welcome <span>{user?.name}</span>!
      </h1>

      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Dashboard" }]}
      />

      <RecentMessages />
    </section>
  );
};

export default Admin;
