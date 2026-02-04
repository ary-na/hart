// src/app/shop/page.tsx

import { redirect } from "next/navigation";
import { auth } from "@hart/server/auth/auth";
import CartPage from "@hart/components/site/CartPage";

const Cart = async () => {
  const session = await auth();
  const isAdmin = session?.user?.role === "admin";

  if (isAdmin) {
    redirect("/");
  }

  return <CartPage />;
};

export default Cart;
