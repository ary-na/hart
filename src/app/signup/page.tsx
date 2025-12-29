// src/app/signin/page.tsx

import type { Session } from "next-auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@hart/server/auth/nAuth";

const Signup = async () => {
  const session = (await getServerSession(authOptions)) as Session | null;

  if (session?.user.role === "admin") redirect("/admin");

  return (
    <section className="p-8">
      <h1>Sign up</h1>
    </section>
  );
};

export default Signup;
