// src/app/api/user/cart/add/route.ts

import { NextResponse } from "next/server";
import { Cart } from "@hart/server/models";
import { getCurrentUser } from "@hart/server/auth";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { drawingId, title, price, thumbnailName } = await req.json();

  if (!drawingId || !title || !thumbnailName || price == null) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const cart = await Cart.findOneAndUpdate(
    { userId: user._id },
    {
      $addToSet: {
        items: { drawingId, title, price, thumbnailName },
      },
    },
    { upsert: true, new: true }
  );

  return NextResponse.json(cart);
}
