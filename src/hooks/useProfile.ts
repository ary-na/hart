"use client";

import { useState } from "react";
import { UpdatePasswordPayload } from "@hart/lib/types";

export const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const changePassword = async (payload: UpdatePasswordPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/user/profile/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: { message?: string } = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update password");
      }

      setSuccess(true);
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    changePassword,
    loading,
    error,
    success,
  };
};
