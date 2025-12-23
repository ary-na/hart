// src/components/CreateDrawingModal.tsx

"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@hart/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDrawings } from "@hart/hooks";
import { ModalProps } from "@hart/lib/types";
import { Toast, FormField, SubmitButton, CancelButton } from "@hart/lib/ui";
import { createDrawingSchema, CreateDrawingInput } from "@hart/lib/validators";

const CreateDrawingModal = ({ open, onClose }: ModalProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
    defaultValues: {
      title: "",
      description: "",
      file: undefined,
      price: 0,
      tags: "",
    },
  });

  const onSubmit = async (data: CreateDrawingInput) => {
    const ok = await createDrawing(data);

    if (ok) {
      showToast("Drawing created successfully.", "success");
      reset();
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      onClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setValue("file", e.target.files!, { shouldValidate: true });
    } else {
      setPreviewUrl(null);
      setValue("file", undefined, { shouldValidate: true });
    }
  };

  return (
    <dialog className="modal" open={open}>
      <div className="modal-box">
        <h3 className="mb-8!">Create Drawing</h3>

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
            error={(errors.file?.message as string) || undefined}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={cn(
                "file-input w-full",
                errors.file && "file-input-error"
              )}
              disabled={loading}
            />
            <p className="label mt-2 text-sm opacity-75">
              Max 50 MB • JPG, PNG, GIF, WebP
            </p>
            {previewUrl && (
              <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={previewUrl}
                  alt="Drawing preview"
                  width={1200}
                  height={800}
                  className="max-h-96 w-full object-cover transition-opacity duration-300"
                  unoptimized
                />
              </div>
            )}
          </FormField>

          <FormField label="Price" error={errors.price?.message}>
            <input
              {...register("price", { valueAsNumber: true })}
              type="number"
              placeholder="A$0.00"
              className={cn(
                "input w-full appearance-none",
                errors.price && "input-error"
              )}
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
            <p className="label mt-2 text-sm opacity-75">
              Separate multiple tags with commas.
            </p>
          </FormField>

          <div className="flex gap-2 justify-end mt-4">
            <CancelButton
              text="Cancel"
              onClick={() => {
                reset();
                if (previewUrl) URL.revokeObjectURL(previewUrl);
                setPreviewUrl(null);
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
