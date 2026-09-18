import Link from "next/link";
import ForgotPasswordForm from "@hart/components/auth/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password",
};

const ForgotPassword = async () => {
  return (
    <section className="mx-auto flex w-full max-w-md flex-col justify-center px-4 py-16">
      <header>
        <p className="text-xs uppercase tracking-[0.35em] text-[#e8a4a8]">
          Studio
        </p>
        <h1 className="mt-3 text-3xl">Forgot password</h1>
        <p className="mt-3 text-sm leading-relaxed opacity-70">
          Enter your email and I’ll help you reset your password.
        </p>
      </header>
      <div className="h-studio-card mt-8 p-6">
        <ForgotPasswordForm />
      </div>
      <p className="mt-8 text-center text-sm">
        <Link className="link link-primary" href="/?auth=signin">
          Back to sign in
        </Link>
      </p>
    </section>
  );
};

export default ForgotPassword;
