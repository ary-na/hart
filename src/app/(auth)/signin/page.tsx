// src/app/signin/page.tsx

import Link from "next/link";
import { Logomark } from "@hart/lib/ui";
import SigninForm from "@hart/components/auth/SigninForm";
import { GoogleSignInButton } from "@hart/lib/ui/GoogleSigninButton";

export const metadata = {
  title: "Sign in",
};

const Signin = async () => {
  return (
    <section
      className="h-auth-container grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24 items-center"
      aria-labelledby="signin-heading"
    >
      <div className="hidden lg:flex flex-col justify-center items-center gap-6">
        <Logomark className="max-w-md h-auto w-40 lg:w-90 xl:w-120" />

        <div>
          <h2 className="mb-2 text-center lg:text-4xl! xl:text-5xl!">
            ART is love VISIBLE
          </h2>
          <p className="text-center italic opacity-75">
            Colors and strokes: my love letter to the world.
          </p>
        </div>
      </div>
      <div>
        <header>
          <h1 id="signin-heading">SIGN IN</h1>
          <p className="mb-4!">Welcome back, I&apos;m glad you&apos;re here.</p>
        </header>
        <SigninForm />
        <div className="divider text-xs opacity-75">OR</div>
        <GoogleSignInButton title="Sign in with Google" />

        <p className="text-center mt-8">
          <span className="opacity-75">Don&apos;t have an account?</span>{" "}
          <Link className="link link-primary" href="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signin;
