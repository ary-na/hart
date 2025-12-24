// src/components/ContactMeForm.tsx

"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@hart/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@hart/hooks";
import { FormField, SubmitButton } from "@hart/lib/ui";
import { contactMeSchema, ContactMeInput } from "@hart/lib/validators";

export default function ContactMeForm() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactMeInput>({
    resolver: zodResolver(contactMeSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactMeInput) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("enquiry", data.enquiry);
    if (data.file?.[0]) formData.append("file", data.file[0]);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        showToast("Message sent successfully.", "success");
        reset();
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      } else {
        const text = await res.text();
        showToast(text, "error");
      }
    } catch {
      showToast("Failed to submit the  message.", "error");
    } finally {
      setIsLoading(false);
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
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Name" error={errors.name?.message}>
          <input
            {...register("name")}
            type="text"
            placeholder="Enter your name..."
            className={cn("input w-full", errors.name && "input-error")}
          />
        </FormField>

        <FormField label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email..."
            className={cn("input w-full", errors.email && "input-error")}
          />
        </FormField>
      </div>

      <FormField label="Enquiry" error={errors.enquiry?.message}>
        <textarea
          {...register("enquiry")}
          rows={6}
          placeholder="Tell me about your project, timeline, budget..."
          className={cn("textarea w-full", errors.enquiry && "textarea-error")}
        />
        <p className="label opacity-80">
          The more details you give, the better I can help
        </p>
      </FormField>

      <FormField
        label="Upload image (optional)"
        error={(errors.file?.message as string) || undefined}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isLoading}
          className="file-input w-full"
        />
        <p className="label mt-2 text-sm opacity-75">
          Max 20 MB • JPG, PNG, GIF, WebP
        </p>

        {previewUrl && (
          <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
            <Image
              src={previewUrl}
              alt="Reference preview"
              width={1200}
              height={800}
              className="max-h-96 w-full object-cover transition-opacity duration-300"
              unoptimized
            />
          </div>
        )}
      </FormField>

      <SubmitButton
        isLoading={isLoading}
        text="Send"
        loadingText="Sending..."
      />
    </form>
  );
}
