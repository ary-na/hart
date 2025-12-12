// src/app/login/page.tsx

// Next.js imports
import { redirect } from "next/navigation";

// NextAuth imports
import type { Session } from "next-auth";
import { getServerSession } from "next-auth/next";

// Auth options import
import { authOptions } from "@hart/server/auth/nAuth";

// Component imports
import LoginForm from "@hart/components/LoginForm";

const LoginPage = async () => {
  const session = (await getServerSession(authOptions)) as Session | null;

  if (session?.user.role === "admin") redirect("/admin");

  return (
    <section className="p-8">
      <h1 className="hart-h1">Login</h1>
      <p className="mb-8">
        User login functionality coming soon.
      </p>
      <LoginForm />
    </section>
  );
};

export default LoginPage;
