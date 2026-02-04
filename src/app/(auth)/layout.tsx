// src/app/(auth)/layout.tsx

import { auth } from "@hart/server/auth/auth";
import { redirect } from "next/navigation";
import NavBar from "@hart/components/auth/NavBar";
import Footer from "@hart/components/auth/Footer";
import { getRedirectPath } from "@hart/server/auth";

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
    </div>
  );
};

export default AuthLayout;
