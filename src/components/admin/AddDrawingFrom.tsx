// src/components/admin/CreateDrawingForm.tsx

"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { cn } from "@hart/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast, useDrawingsContext } from "@hart/hooks";
import {
  FormField,
  SubmitButton,
  CancelButton,
  ConfirmModal,
} from "@hart/lib/ui";
import {
  addDrawingSchema,
  updateDrawingSchema,
  AddDrawingInput,
  UpdateDrawingInput,
} from "@hart/lib/validators";
import { Drawing } from "@hart/lib/types";

type Props = {
  onClose: () => void;
  initialDrawing?: Drawing | null;
};

type DrawingFormInput = AddDrawingInput | UpdateDrawingInput;

const AddDrawingForm = ({ onClose, initialDrawing }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [deletePending, setDeletePending] = useState(false);
  const {
    addDrawing,
    updateDrawing,
    deleteDrawing,
    creating,
    updating,
    deletingIds,
  } = useDrawingsContext();
  const { showToast } = useToast();
  const isEdit = Boolean(initialDrawing?._id);
  const isSaving = creating || updating;
  const resolverSchema = useMemo(
    () => (isEdit ? updateDrawingSchema : addDrawingSchema),
    [isEdit]
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<DrawingFormInput>({
    resolver: zodResolver(resolverSchema),
    mode: "onSubmit",
    defaultValues: {
      title: initialDrawing?.title ?? "",
      description: initialDrawing?.description ?? "",
      file: undefined,
      price: initialDrawing?.price ?? 0,
      tags: initialDrawing?.tags?.join(", ") ?? "",
    },
  });

  const onSubmit = async (data: DrawingFormInput) => {
    const ok = isEdit && initialDrawing
      ? await updateDrawing(initialDrawing._id, data as UpdateDrawingInput)
      : await addDrawing(data as AddDrawingInput);

    if (ok) {
      showToast(
        isEdit ? "Drawing updated successfully." : "Drawing added successfully.",
        "success"
      );
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      reset();
      onClose?.();
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

  const existingPreviewUrl =
    initialDrawing?.thumbnailUrl || initialDrawing?.fileUrl || null;
  const displayPreviewUrl = previewUrl ?? existingPreviewUrl;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
      {/* Drawing title field */}
      <FormField
        id="title"
        label="Title"
        type="text"
        placeholder="Drawing title"
        registerProps={register("title")}
        error={errors.title?.message}
        iconSvg={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 opacity-70"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        }
      />

      {/* Drawing description field */}
      <FormField
        id="description"
        label="Description"
        placeholder="Enter description..."
        registerProps={register("description")}
        error={errors.description?.message}
        iconSvg={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="h-4 w-4 opacity-70"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
            <line x1="8" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="16" y2="14" />
          </svg>
        }
      />

      {/* Drawing file upload field */}
      <div className="form-control w-full">
        <label className="label mb-2">
          <span className="label-text">
            {isEdit ? "Replace Drawing File" : "Drawing File"}
          </span>
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={cn("file-input w-full", errors.file && "file-input-error")}
          disabled={isSaving}
        />

        <p className="label mt-2 text-sm! opacity-75 mb-0!">
          Max 50 MB • JPG, PNG, GIF, WebP
        </p>

        {errors.file?.message && (
          <p className="label-text-alt text-error mt-1">
            {errors.file.message as string}
          </p>
        )}

        {displayPreviewUrl && (
          <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
            <Image
              src={displayPreviewUrl}
              alt="Drawing preview"
              width={1200}
              height={800}
              className="max-h-96 w-full object-cover"
              unoptimized
            />
          </div>
        )}
      </div>

      {/* Price field */}
      <FormField
        id="price"
        label="Price"
        type="number"
        placeholder="A$0.00"
        registerProps={register("price", { valueAsNumber: true })}
        error={errors.price?.message}
        iconSvg={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-4 w-4 opacity-70"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        }
      />

      {/* Tags field */}
      <FormField
        id="tags"
        label="Tags"
        placeholder="e.g. portrait, ink, abstract"
        registerProps={register("tags")}
        error={errors.tags?.message}
        required={false}
        iconSvg={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="h-4 w-4 opacity-70"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>
            <path d="M7 7h.01"></path>
          </svg>
        }
      />

      <p className="label text-sm! opacity-75 mb-0!">
        Separate multiple tags with commas.
      </p>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
        {isEdit && initialDrawing && (
          <button
            type="button"
            className="btn btn-error"
            onClick={() => setDeletePending(true)}
            disabled={deletingIds.has(initialDrawing._id) || isSaving}
          >
            {deletingIds.has(initialDrawing._id) ? "Deleting..." : "Delete"}
          </button>
        )}

        <div className="flex justify-end gap-2 ml-auto">
          <CancelButton
            text="Cancel"
            onClick={() => {
              if (previewUrl) URL.revokeObjectURL(previewUrl);
              onClose();
            }}
            disabled={isSaving}
          />

          <SubmitButton
            isLoading={isSaving}
            text={isEdit ? "Save" : "Add"}
            loadingText={isEdit ? "Saving..." : "Adding..."}
          />
        </div>
      </div>

      <ConfirmModal
        open={deletePending}
        title="Delete this drawing?"
        message={`Are you sure you want to delete \"${initialDrawing?.title}\"? This action cannot be undone.`}
        loading={initialDrawing ? deletingIds.has(initialDrawing._id) : false}
        onConfirm={async () => {
          if (!initialDrawing) return;
          const ok = await deleteDrawing(initialDrawing._id);
          if (ok) {
            showToast("Drawing deleted.", "success");
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            onClose();
          } else {
            showToast("Failed to delete drawing.", "error");
          }
          setDeletePending(false);
        }}
        onCancel={() => setDeletePending(false)}
      />
    </form>
  );
};

export default AddDrawingForm;
