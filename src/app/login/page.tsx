import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@harts/app/api/auth/[...nextauth]/route";
import LoginForm from "@harts/components/LoginForm";

export default async function LoginPage() {
  const session = (await getServerSession(authOptions)) as Session | null;

  if (session?.user.role === "admin") redirect("/admin");

  return (
    <main className="max-w-md mx-auto mt-20">
      <h1 className="harts-h1 mb-8 text-center">Admin Login</h1>
      <LoginForm />
    </main>
  );
}
