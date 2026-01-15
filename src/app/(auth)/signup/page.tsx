// src/app/signin/page.tsx

import Link from "next/link";
import { Logomark } from "@hart/lib/ui";
import { redirect } from "next/navigation";
import { GoogleSignInButton } from "@hart/lib/ui";
import { getCurrentUser } from "@hart/server/auth";
import { getRedirectPath } from "@hart/server/auth";
import SignupForm from "@hart/components/auth/SignupForm";

export const metadata = {
  title: "Sign up",
};

const Signup = async () => {
  const user = await getCurrentUser();

  const redirectTo = getRedirectPath(user);
  if (redirectTo) redirect(redirectTo);

  return (
    <section
      className="h-auth-container grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24 items-center"
      aria-labelledby="signin-heading"
    >
      <div>
        <header>
          <h1 id="signin-heading">SIGN UP</h1>
          <p className="mb-4!">
            Welcome, I&apos;m happy you found your way here.
          </p>
        </header>
        <SignupForm />
        <div className="divider text-xs opacity-75">OR</div>
        <GoogleSignInButton title="Sign up with Google" />
        <p className="text-center mt-8">
          <span className="opacity-75">Already have an account?</span>{" "}
          <Link className="link link-primary" href="/signin">
            Sign in
          </Link>
        </p>
      </div>
      <div className="hidden lg:flex flex-col justify-center items-center gap-6">
        <Logomark className="max-w-md h-auto w-40 lg:w-90 xl:w-120" />

        <div>
          <h2 className="mb-2 text-center lg:text-4xl! xl:text-5xl!">
            JOIN the love STORY
          </h2>
          <p className="text-center italic opacity-75">
            Lines and pigment: my heart laid across the canvas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
