// src/app/(auth)/layout.tsx

import { auth } from "@hart/server/auth/auth";
import { redirect } from "next/navigation";
import NavBar from "@hart/components/auth/NavBar";
import Footer from "@hart/components/auth/Footer";
import SkipLink from "@hart/components/site/SkipLink";
import { getRedirectPath } from "@hart/server/auth";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {

  const session = await auth();
  const user = session?.user ?? null;
  const redirectTo = getRedirectPath(user);
  if (redirectTo) redirect(redirectTo);

  return (
    <div className="flex min-h-svh flex-col">
      <SkipLink />
      <NavBar />
      <main id="main-content" className="flex flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
