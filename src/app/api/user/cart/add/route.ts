// src/app/api/user/cart/add/route.ts

import {auth} from "@hart/server/auth/auth";
import { NextResponse } from "next/server";
import { Cart } from "@hart/server/models";
import { connectToDatabase } from "@hart/server/db/mongodb";

export async function POST(req: Request) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { drawingId, title, price, thumbnailName } = await req.json();

  if (!drawingId || !title || !thumbnailName || price == null) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await connectToDatabase();
  const cart = await Cart.findOneAndUpdate(
    { userId: user.id },
    {
      $addToSet: {
        items: { drawingId, title, price, thumbnailName },
      },
    },
    { upsert: true, new: true }
  );

  return NextResponse.json(cart);
}
