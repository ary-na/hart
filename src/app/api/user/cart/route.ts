// src/app/api/user/cart/route.ts

import {auth} from "@hart/server/auth/auth";
import { NextResponse } from "next/server";
import { Cart } from "@hart/server/models";

// Get Cart - all items
export async function GET() {
     const session = await auth()
    const user = session?.user;
  if (!user) {
    return NextResponse.json({ items: [] });
  }

  const cart = await Cart.findOne({ userId: user.id });

  return NextResponse.json(cart ?? { items: [] });
}

// Delete Cart - all items
export async function DELETE() {
     const session = await auth()
    const user = session?.user;
  if (!user) {
    return NextResponse.json({ success: true });
  }

  await Cart.updateOne({ userId: user.id }, { $set: { items: [] } });

  return NextResponse.json({ success: true });
}
