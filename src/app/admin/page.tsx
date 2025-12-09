import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@harts/app/api/auth/[...nextauth]/route";
import LogoutButton from "@harts/components/LogoutButton";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (session.user.role !== "admin") redirect("/");

  return (
    <section className="max-w-4xl mx-auto py-12">
      <h1 className="harts-h1 mb-2">Hi {session.user.username}!</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        This is where you can see messages you have received.
      </p>
      <LogoutButton />
    </section>
  );
}
