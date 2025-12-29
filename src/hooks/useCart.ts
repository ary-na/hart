// src/hooks/useCart.ts

"use client";

import { UseCartReturn } from "@hart/lib/types";
import { useState, useCallback, useRef } from "react";
import type { CartItem, CartDocument } from "@hart/lib/types";

export const useCart = (): UseCartReturn => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const isFetchingRef = useRef(false);

  const fetchCart = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/user/cart", { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`Failed to fetch cart (${res.status})`);
      }
      const data: CartDocument = await res.json();
      const itemsWithStringIds = (data.items ?? []).map((item) => ({
        ...item,
        drawingId: item.drawingId.toString(),
      }));

      setItems(itemsWithStringIds);
    } catch (err) {
      const e = err instanceof Error ? err : new Error("Unknown error");
      setError(e);
      console.error("useCart.fetchCart:", e);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  const addItem = useCallback(
    async (item: Omit<CartItem, "drawingId"> & { drawingId: string }) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/user/cart/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            errorData.error || `Failed to add item (${res.status})`
          );
        }
        const updatedCart: CartDocument = await res.json();
        const itemsWithStringIds = updatedCart.items.map((item) => ({
          ...item,
          drawingId: item.drawingId.toString(),
        }));
        setItems(itemsWithStringIds);
        return updatedCart;
      } catch (err) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);
        console.error("useCart.addItem:", e);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const removeItem = useCallback(async (drawingId: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/user/cart/items/${drawingId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Failed to remove item (${res.status})`
        );
      }
      setItems((prev) => prev.filter((item) => item.drawingId !== drawingId));
      return true;
    } catch (err) {
      const e = err instanceof Error ? err : new Error("Unknown error");
      setError(e);
      console.error("useCart.removeItem:", e);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/user/cart", {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Failed to clear cart (${res.status})`
        );
      }
      setItems([]);
      return true;
    } catch (err) {
      const e = err instanceof Error ? err : new Error("Unknown error");
      setError(e);
      console.error("useCart.clearCart:", e);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    items,
    loading,
    error,
    addItem,
    removeItem,
    clearCart,
    fetchCart,
    resetError,
  };
};
