// src/lib/ui/Toast.ts

"use client";

type ToastType = "success" | "error" | "info";

export const Toast = () => {
  const showToast = (
    message: string,
    type: ToastType = "success",
    duration = 3000
  ) => {
    const toast = document.createElement("div");

    toast.className = `
      toast toast-bottom toast-top z-50
    `;
    toast.innerHTML = `
      <div class="alert alert-${type}">
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, duration);
  };

  return { showToast };
};
