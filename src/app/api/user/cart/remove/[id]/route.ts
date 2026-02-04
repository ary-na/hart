// src/app/api/user/cart/remove/[id]/route.ts

import {auth} from "@hart/server/auth/auth";
import { NextResponse } from "next/server";
import { Cart } from "@hart/server/models/Cart";

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

     const session = await auth()
      const user = session?.user;
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await Cart.updateOne(
    { userId: user.id },
    { $pull: { items: { drawingId: id } } }
  );

  return NextResponse.json({ success: true });
}
