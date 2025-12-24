// src/components/ChangePasswordModal.tsx

"use client";

import { cn } from "@hart/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@hart/hooks";
import { ModalProps } from "@hart/lib/types";
import { useProfile } from "@hart/hooks/useProfile";
import { ChangePasswordPayload } from "@hart/lib/types";
import {
  updatePasswordSchema,
  UpdatePasswordInput,
} from "@hart/lib/validators";
import { FormField, SubmitButton, CancelButton } from "@hart/lib/ui";

const UpdatePasswordModal = ({ open, onClose }: ModalProps) => {
  const { changePassword, loading, error } = useProfile();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ChangePasswordPayload) => {
    const res = await changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    if (res) {
      onClose();
      reset();
      showToast("Password updated successfully", "success");
    }
  };

  return (
    <dialog className="modal" open={open}>
      <div className="modal-box">
        <h3 className="mb-8!">Update password</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            label="Current password"
            error={errors.currentPassword?.message}
          >
            <input
              {...register("currentPassword")}
              type="password"
              placeholder="Enter your current password..."
              className={cn(
                "input w-full",
                errors.currentPassword && "input-error"
              )}
            />
          </FormField>

          <FormField label="New password" error={errors.newPassword?.message}>
            <input
              {...register("newPassword")}
              type="password"
              placeholder="Enter your new password..."
              className={cn(
                "input w-full",
                errors.newPassword && "input-error"
              )}
            />
          </FormField>

          <FormField
            label="Confirm new password"
            error={errors.confirmPassword?.message}
          >
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm your new password..."
              className={cn(
                "input w-full",
                errors.confirmPassword && "input-error"
              )}
            />
          </FormField>

          {error && <p className="text-error mt-2 text-sm">{error}</p>}

          <div className="modal-action">
            <CancelButton onClick={onClose}/>
            <SubmitButton
              isLoading={loading}
              text="Update"
              loadingText="Updating..."
            />
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdatePasswordModal;
