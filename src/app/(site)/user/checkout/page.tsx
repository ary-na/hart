// src/app/(site)/user/checkout/page.tsx

import { redirect } from "next/navigation";
import { auth } from "@hart/server/auth/auth";
import CheckoutPage from "@hart/components/site/CheckoutPage";

const Checkout = async () => {
  const session = await auth();
  const isAdmin = session?.user?.role === "admin";

  if (isAdmin) {
    redirect("/");
  }

  return <CheckoutPage />;
};

export default Checkout;
