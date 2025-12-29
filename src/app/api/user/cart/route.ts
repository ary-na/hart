// src/app/api/user/cart/route.ts

import { NextResponse } from "next/server";
import { Cart } from "@hart/server/models";
import { getCurrentUser } from "@hart/server/auth";

// Get Cart - all items
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ items: [] });
  }

  const cart = await Cart.findOne({ userId: user._id });

  return NextResponse.json(cart ?? { items: [] });
}

// Delete Cart - all items
export async function DELETE() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: true });
  }

  await Cart.updateOne({ userId: user._id }, { $set: { items: [] } });

  return NextResponse.json({ success: true });
}
