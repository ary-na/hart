// src/app/(auth)/layout.tsx

import { redirect } from "next/navigation";
import NavBar from "@hart/components/auth/NavBar";
import Footer from "@hart/components/auth/Footer";
import { getCurrentUser, getRedirectPath } from "@hart/server/auth";
import PostAuthRedirect from "@hart/components/auth/PostAuthRedirect";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  const redirectTo = getRedirectPath(user);
  if (redirectTo) redirect(redirectTo);
  return (
    <div className="flex flex-col min-h-svh">
      <PostAuthRedirect />
      <NavBar />
      <main className="flex-1 flex">{children}</main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
