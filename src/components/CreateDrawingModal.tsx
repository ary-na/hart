// src/components/CreateDrawingModal.tsx

"use client";

import { cn } from "@hart/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ModalProps } from "@hart/lib/types";
import { useDrawings } from "@hart/hooks";
import { createDrawingSchema, CreateDrawingInput } from "@hart/lib/validators";
import { Toast, FormField, SubmitButton, CancelButton } from "@hart/lib/ui";

const CreateDrawingModal = ({ open, onClose }: ModalProps) => {
  const { createDrawing, loading } = useDrawings();
  const { showToast } = Toast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateDrawingInput>({
    resolver: zodResolver(createDrawingSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: CreateDrawingInput) => {
    const ok = await createDrawing(data);

    if (ok) {
      showToast("Drawing created successfully.", "success");
      reset();
      onClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("file", e.target.files, { shouldValidate: true });
  };

  return (
    <dialog className="modal" open={open}>
      <div className="modal-box">
        <h3 className="mb-6 text-lg font-semibold">Create Drawing</h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4"
          noValidate
        >
          <FormField label="Title" error={errors.title?.message}>
            <input
              {...register("title")}
              type="text"
              placeholder="Enter drawing title..."
              className={cn("input w-full", errors.title && "input-error")}
              disabled={loading}
            />
          </FormField>

          <FormField label="Description" error={errors.description?.message}>
            <textarea
              {...register("description")}
              placeholder="Enter description..."
              className={cn(
                "textarea w-full",
                errors.description && "textarea-error"
              )}
              disabled={loading}
            />
          </FormField>

          <FormField
            label="Drawing File"
            error={errors.file?.message as string}
          >
            <input
              type="file"
              onChange={handleFileChange}
              className={cn(
                "file-input w-full",
                errors.file && "file-input-error"
              )}
              disabled={loading}
              accept="image/*"
            />
          </FormField>

          <FormField label="Price" error={errors.price?.message}>
            <input
              {...register("price", { valueAsNumber: true })}
              type="number"
              placeholder="0.00"
              className={cn("input w-full", errors.price && "input-error")}
              disabled={loading}
            />
          </FormField>

          <FormField label="Tags" error={errors.tags?.message}>
            <input
              {...register("tags")}
              type="text"
              placeholder="e.g. portrait, ink, abstract"
              className={cn("input w-full", errors.tags && "input-error")}
              disabled={loading}
            />
          </FormField>

          <div className="flex gap-2 justify-end mt-4">
            <CancelButton
              text="Cancel"
              onClick={() => {
                reset();
                onClose();
              }}
              disabled={loading}
            />
            <SubmitButton
              isLoading={loading}
              text="Create"
              loadingText="Creating..."
            />
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateDrawingModal;
