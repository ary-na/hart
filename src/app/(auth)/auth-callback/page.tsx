// src/app/(auth)/auth-callback/page.tsx

import { auth } from "@hart/server/auth/auth";
import { redirect } from "next/navigation";
import { getRedirectPath } from "@hart/server/auth/redirect";

const AuthCallback = async () => {
  const session = await auth();
  const user = session?.user ?? null;
  const redirectTo = getRedirectPath(user);

  if (redirectTo) redirect(redirectTo);
};

export default AuthCallback;
