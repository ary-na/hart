// src/app/signin/page.tsx

import { redirect } from "next/navigation";
import { getCurrentUser } from "@hart/server/auth";
import { getRedirectPath } from "@hart/server/auth";
import SignupForm from "@hart/components/SignupForm";

export const metadata = {
  title: "Sign up",
};

const Signup = async () => {
  const user = await getCurrentUser();

  const redirectTo = getRedirectPath(user);
  if (redirectTo) redirect(redirectTo);

  return (
    <section className="p-8">
      <h1>Sign up</h1>
      <SignupForm />
    </section>
  );
};

export default Signup;
