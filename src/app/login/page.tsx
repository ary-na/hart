// src/app/login/page.tsx

import type { Session } from "next-auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import LoginForm from "@hart/components/LoginForm";
import { authOptions } from "@hart/server/auth/nAuth";

const LoginPage = async () => {
  const session = (await getServerSession(authOptions)) as Session | null;

  if (session?.user.role === "admin") redirect("/admin");

  return (
    <section className="p-8">
      <h1>Login</h1>
      <p className="mb-8">
        User login functionality coming soon.
      </p>
      <LoginForm />
    </section>
  );
};

export default LoginPage;
