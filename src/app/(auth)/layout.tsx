// src/app/(auth)/layout.tsx

import { auth } from "@hart/auth";
import { redirect } from "next/navigation";
import NavBar from "@hart/components/auth/NavBar";
import Footer from "@hart/components/auth/Footer";
import { getRedirectPath } from "@hart/server/auth";
import PostAuthRedirect from "@hart/components/auth/PostAuthRedirect";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user ?? null;
  const redirectTo = getRedirectPath(user);
  if (redirectTo) redirect(redirectTo);

  return (
    <div className="flex flex-col min-h-svh">
      <NavBar />
      <main className="flex-1 flex">{children}</main>
      <Footer />
      <PostAuthRedirect />
    </div>
  );
};

export default AuthLayout;
