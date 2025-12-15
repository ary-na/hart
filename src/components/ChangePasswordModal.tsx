"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  ChangePasswordInput,
} from "@hart/lib/validators";
import { ChangePasswordPayload } from "@hart/lib/types";
import { useProfile } from "@hart/hooks/useProfile";
import { Toast } from "@hart/lib/ui";
import { ModalProps } from "@hart/lib/types";

export default function ChangePasswordModal({ open, onClose }: ModalProps) {
  const { changePassword, loading, error } = useProfile();
  const { showToast } = Toast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ChangePasswordPayload) => {
    const ok = await changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    if (ok) {
      onClose();
      reset();
      showToast("Password updated successfully", "success");
    }
  };

  return (
    <dialog className="modal" open={open}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Change Password</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Current password"
              className={`input input-bordered w-full ${
                errors.currentPassword ? "input-error" : ""
              }`}
              {...register("currentPassword")}
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="New password"
              className={`input input-bordered w-full ${
                errors.newPassword ? "input-error" : ""
              }`}
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm new password"
              className={`input input-bordered w-full ${
                errors.confirmPassword ? "input-error" : ""
              }`}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn btn-ghost">
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
    </dialog>
  );
}
