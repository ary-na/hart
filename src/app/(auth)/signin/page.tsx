// src/app/signin/page.tsx

import { redirect } from "next/navigation";
import { getCurrentUser } from "@hart/server/auth";
import { getRedirectPath } from "@hart/server/auth";
import SigninForm from "@hart/components/SigninForm";

export const metadata = {
  title: "Sign in",
};

const Signin = async () => {
  const user = await getCurrentUser();

  const redirectTo = getRedirectPath(user);
  if (redirectTo) redirect(redirectTo);

  return (
    <section className="p-8">
      <h1>Sign in</h1>
      <SigninForm />
    </section>
  );
};

export default Signin;
