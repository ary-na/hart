// src/app/signin/page.tsx

import type { Session } from "next-auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import SigninForm from "@hart/components/SigninForm";
import { authOptions } from "@hart/server/auth/nAuth";

const Signin = async () => {
  const session = (await getServerSession(authOptions)) as Session | null;

  if (session?.user.role === "admin") redirect("/admin");

  return (
    <section className="p-8">
      <h1>Sign in</h1>
      <SigninForm />
    </section>
  );
};

export default Signin;
