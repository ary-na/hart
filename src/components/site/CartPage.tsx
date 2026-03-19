// src/components/site/CartPage.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useCartContext, useToast } from "@hart/hooks";

const CartPage = () => {
  const { items, loading, fetchCart, removeItem, clearCart } =
    useCartContext();
  const { showToast } = useToast();
  const [thumbnailUrls, setThumbnailUrls] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    let active = true;

    const loadThumbnails = async () => {
      if (items.length === 0) {
        await Promise.resolve();
        if (active) {
          setThumbnailUrls({});
        }
        return;
      }

      const nextUrls: Record<string, string> = {};

      await Promise.all(
        items.map(async (item) => {
          if (!item.thumbnailName) return;
          try {
            const res = await fetch(
              `/api/drawings/thumbnail/${encodeURIComponent(
                item.thumbnailName
              )}`,
              { cache: "no-store" }
            );
            if (!res.ok) return;
            const data = await res.json();
            if (data?.url) {
              nextUrls[item.drawingId] = data.url as string;
            }
          } catch {
            // ignore thumbnail failures
          }
        })
      );

      if (active) {
        setThumbnailUrls(nextUrls);
      }
    };

    void loadThumbnails();

    return () => {
      active = false;
    };
  }, [items]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items]
  );

  return (
    <section className="px-6 py-10 md:px-10 lg:px-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1>Cart</h1>
          <p className="opacity-70">Review your pieces before checkout.</p>
        </div>
        <Link href="/gallery" className="btn btn-ghost">
          Continue shopping
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          {items.length === 0 && !loading && (
            <div className="rounded-xl border border-base-300 bg-base-100 p-6 text-center">
              <p className="text-lg font-semibold">Your cart is empty.</p>
              <p className="opacity-70 mt-2">
                Add a few drawings to see them here.
              </p>
            </div>
          )}

          {items.map((item) => (
            <div
              key={item.drawingId}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-base-300 bg-base-100 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-lg bg-base-200">
                  {thumbnailUrls[item.drawingId] ? (
                    <Image
                      src={thumbnailUrls[item.drawingId]}
                      alt={item.title}
                      width={160}
                      height={160}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs opacity-60">
                      No image
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-lg font-semibold">{item.title}</p>
                  <p className="text-sm opacity-70">
                    ${item.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={async () => {
                  const ok = await removeItem(item.drawingId);
                  if (ok) {
                    showToast("Item removed.", "success");
                  } else {
                    showToast("Could not remove item.", "error");
                  }
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-xl border border-base-300 bg-base-100 p-6">
          <h2 className="text-xl font-semibold">Summary</h2>
          <div className="mt-4 flex items-center justify-between">
            <span className="opacity-70">Items</span>
            <span>{items.length}</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="opacity-70">Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>

          <div className="mt-6 grid gap-2">
            <Link
              href="/user/checkout"
              className={`btn btn-primary ${
                items.length === 0 ? "btn-disabled" : ""
              }`}
              aria-disabled={items.length === 0}
              tabIndex={items.length === 0 ? -1 : 0}
            >
              Checkout
            </Link>
            <button
              type="button"
              className="btn btn-ghost"
              disabled={items.length === 0}
              onClick={async () => {
                const ok = await clearCart();
                if (ok) {
                  showToast("Cart cleared.", "success");
                } else {
                  showToast("Could not clear cart.", "error");
                }
              }}
            >
              Clear cart
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default CartPage;
