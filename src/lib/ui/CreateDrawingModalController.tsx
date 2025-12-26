// src/lib/ui/CreateDrawingModalController.tsx

"use client";

import { useState } from "react";
import CreateDrawingModal from "@hart/components/CreateDrawingModal";

export const CreateDrawingModalController = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn btn-primary"
        aria-label="Add a new drawing"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add Drawing
      </button>

      <CreateDrawingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
