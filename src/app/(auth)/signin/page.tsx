// src/app/signin/page.tsx

import SigninClient from "@hart/components/auth/SigninClient";

export const metadata = {
  title: "Sign in",
  description: "Securely sign in to your H♡ART account.",
};

const Signin = () => {
  return <SigninClient />;
};

export default Signin;
