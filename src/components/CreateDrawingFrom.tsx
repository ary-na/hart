// src/components/CreateDrawingForm.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@hart/lib/utils";
import { useDrawingsContext } from "@hart/hooks";
import { Toast, FormField, SubmitButton, CancelButton } from "@hart/lib/ui";
import { createDrawingSchema, CreateDrawingInput } from "@hart/lib/validators";

type Props = {
  onClose: () => void;
};

const CreateDrawingForm = ({ onClose }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { createDrawing, loading } = useDrawingsContext();
  const { showToast } = Toast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateDrawingInput>({
    resolver: zodResolver(createDrawingSchema),
    mode: "onSubmit", // ✅ standard for modals
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
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      onClose(); // 🔑 unmounts form → full reset
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
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
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
        error={errors.file?.message as string | undefined}
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
              className="max-h-96 w-full object-cover"
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
        <p className="label mt-2 text-sm opacity-75">
          Separate multiple tags with commas.
        </p>
      </FormField>

      <div className="flex justify-end gap-2 mt-4">
        <CancelButton
          text="Cancel"
          onClick={() => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
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
  );
};

export default CreateDrawingForm;
