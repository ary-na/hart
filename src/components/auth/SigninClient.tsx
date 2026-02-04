// src/components/SigninClient.tsx

"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Logomark } from "@hart/lib/ui";
import { useToast } from "@hart/hooks";
import SigninForm from "./SigninForm";
import { GoogleSignInButton } from "@hart/lib/ui/GoogleSigninButton";

const SigninClient = () => {
  const { showToast } = useToast();

  useEffect(() => {
    if (sessionStorage.getItem("signed-out-toast")) {
      showToast("We hope to see you again soon.", "info");
      sessionStorage.removeItem("signed-out-toast");
    }
  }, [showToast]);

  return (
    <section
      className="h-auth-container grid lg:grid-cols-2 lg:gap-24 xl:gap-40 items-center"
      aria-labelledby="signin-heading"
    >
      <div className="hidden lg:flex flex-col justify-center items-center gap-10">
        <Logomark className="h-auto w-full hover:text-primary" />

        <div>
          <h2 className="mb-2 text-center lg:text-4xl!">ART is love VISIBLE</h2>
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

export default SigninClient;
