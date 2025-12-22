// src/lib/ui/CreateDrawingModalClient.tsx

"use client";

import { useState } from "react";
import CreateDrawingModal from "@hart/components/CreateDrawingModal";

const CreateDrawingModalClient = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn btn-outline"
      >
        Create
      </button>

      <CreateDrawingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default CreateDrawingModalClient;
