"use client";

import { useState } from "react";
import { changePasswordSchema } from "@hart/lib/validators";
import { useChangePassword } from "@hart/hooks/useProfile";

type Props = {
  onClose: () => void;
};

export default function ChangePasswordModal({ onClose }: Props) {
  const { changePassword, loading, error } = useChangePassword();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState<
    Record<string, string[]>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Zod validation
    const result = changePasswordSchema.safeParse(form);

    if (!result.success) {
      setFormErrors(result.error.flatten().fieldErrors);
      return;
    }

    setFormErrors({});

    const success = await changePassword({
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
    });

    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Change Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current password"
              className="input input-bordered w-full"
              onChange={handleChange}
            />
            {formErrors.currentPassword && (
              <p className="text-red-500 text-sm">
                {formErrors.currentPassword[0]}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="newPassword"
              placeholder="New password"
              className="input input-bordered w-full"
              onChange={handleChange}
            />
            {formErrors.newPassword && (
              <p className="text-red-500 text-sm">
                {formErrors.newPassword[0]}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              className="input input-bordered w-full"
              onChange={handleChange}
            />
            {formErrors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {formErrors.confirmPassword[0]}
              </p>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? "Saving..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
