// src/hooks/useToast.ts
"use client";

import { ToastType } from "@hart/lib/types";

export const useToast = () => {
  const showToast = (
    message: string,
    type: ToastType = "success",
    duration: number = 3000
  ) => {
    const toast = document.createElement("div");
    toast.className = "toast toast-top toast-center md:toast-end z-50 fixed";

    toast.innerHTML = `
      <div class="alert alert-${type} shadow-lg">
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("opacity-0", "transition-opacity", "duration-300");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
  };

  return { showToast };
};
