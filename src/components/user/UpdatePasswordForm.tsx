// src/components/user/UpdatePasswordForm.tsx

"use client";

import { useToast } from "@hart/hooks";
import { useForm } from "react-hook-form";
import { useProfile } from "@hart/hooks/useProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, SubmitButton, CancelButton } from "@hart/lib/ui";
import {
  updatePasswordSchema,
  UpdatePasswordInput,
} from "@hart/lib/validators";

type Props = {
  onClose: () => void;
};

const UpdatePasswordForm = ({ onClose }: Props) => {
  const { updatePassword, loading, error } = useProfile();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: UpdatePasswordInput) => {
    const ok = await updatePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    if (ok) {
      showToast("Password updated successfully", "success");
      onClose?.();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
      {/* Current password field */}
      <FormField
        id="currentPassword"
        label="Current password"
        type="password"
        placeholder="Your current password"
        registerProps={register("currentPassword")}
        error={errors.currentPassword?.message}
        showToggle
      />

      <FormField
        id="newPassword"
        label="New password"
        type="password"
        placeholder="Enter your new password..."
        registerProps={register("newPassword")}
        error={errors.newPassword?.message}
        showToggle
      />

      <FormField
        id="confirmPassword"
        label="Confirm new password"
        type="password"
        placeholder="Confirm your new password..."
        registerProps={register("confirmPassword")}
        error={errors.confirmPassword?.message}
        showToggle
      />

      {error && (
        <p className="text-error text-sm mt-1" role="alert">
          {error}
        </p>
      )}

      <div className="modal-action">
        <CancelButton onClick={onClose} disabled={loading} />
        <SubmitButton
          isLoading={loading}
          text="Update"
          loadingText="Updating..."
        />
      </div>
    </form>
  );
};

export default UpdatePasswordForm;
