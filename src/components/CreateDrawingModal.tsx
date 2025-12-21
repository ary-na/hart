// src/components/CreateDrawingModal.tsx

"use client";

import { cn } from "@hart/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Toast } from "@hart/lib/ui";
import { ModalProps } from "@hart/lib/types";
import { useDrawing } from "@hart/hooks/useProfile";
import {
  createDrawingSchema,
  CreateDrawingInput,
} from "@hart/lib/validators";
import { FormField, SubmitButton, CancelButton } from "@hart/lib/ui";

const CreateDrawingModal = ({ open, onClose }: ModalProps) => {
  const { createDrawing, loading, error } = useDrawing();
  const { showToast } = Toast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateDrawingInput>({
    resolver: zodResolver(createDrawingSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: CreateDrawingInput) => {
    const res = await createDrawing({
      title: data.title,
      description: data.description,
      file: data.file,
      price: data.price,
      tags: data.tags,
    });

    if (res) {
      onClose();
      reset();
      showToast("Drawing created successfully", "success");
    }
  };

  return (
    <dialog className="modal" open={open}>
      <div className="modal-box">
        <h3 className="mb-8!">Create Drawing</h3>
        <form onSubmit={handleSubmit(onSubmit)}>

        </form>
      </div>
    </dialog>
  );
};

export default CreateDrawingModal;
