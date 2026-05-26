// src/app/forgot-password/page.tsx

import Link from "next/link";
import ForgotPasswordForm from "@hart/components/auth/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password",
  description:
    "Forgot your password? Reset it securely and regain access to your account.",
};

const ForgotPassword = async () => {
  return (
    <section
      className="h-auth-container flex flex-col justify-center w-full"
      aria-labelledby="forgot-password-heading"
    >
      <header>
        <h1 id="forgot-password-heading">FORGOT PASSWORD</h1>
        <p className="mb-4!">
          Enter your email and I&apos;ll help you reset your password.
        </p>
      </header>
      <ForgotPasswordForm />
       <p className="text-center mt-8">
          <span className="opacity-75">Don&apos;t need this? </span>{" "}
          <Link className="link link-primary" href="/signin">
            Sign in
          </Link>
        </p>
    </section>
  );
};

export default ForgotPassword;
