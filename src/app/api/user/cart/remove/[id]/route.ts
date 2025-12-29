// src/app/api/user/cart/remove/[id]/route.ts

import { NextResponse } from "next/server";
import { Cart } from "@hart/server/models/Cart";
import { getCurrentUser } from "@hart/server/auth";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await Cart.updateOne(
    { userId: user._id },
    { $pull: { items: { drawingId: params.id } } }
  );

  return NextResponse.json({ success: true });
}
