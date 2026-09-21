"use client";

type ToastType = "success" | "error" | "info";

export const useToast = () => {
  const showToast = (
    message: string,
    type: ToastType = "success",
    duration: number = 3000,
  ) => {
    const toast = document.createElement("div");
    toast.className = "toast toast-top toast-center md:toast-end z-50 fixed";
    toast.setAttribute("role", type === "error" ? "alert" : "status");
    toast.setAttribute("aria-live", type === "error" ? "assertive" : "polite");
    toast.setAttribute("aria-atomic", "true");

    const alert = document.createElement("div");
    alert.className = `alert alert-${type} shadow-lg`;
    const span = document.createElement("span");
    span.textContent = message;
    alert.appendChild(span);
    toast.appendChild(alert);

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
