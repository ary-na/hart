// src/lib/ui/gallery/EmptyGallery.tsx

import { EmptyGalleryCanvas } from "./svgs/EmptyGalleryCanvas";

export function EmptyGallery({ ...props }) {
  return (
    <div
      className="flex flex-col flex-1 items-center justify-center text-center"
      {...props}
    >
      <EmptyGalleryCanvas
        className="mb-6"
        label="Illustration of an empty gallery with a blank canvas on an easel"
        title="Empty gallery – waiting for your first drawing"
      />

      <h2>Nothing here… yet.</h2>

      <p className="mt-3 text-muted-foreground max-w-md">
        No drawings have found their way here yet.
      </p>
    </div>
  );
}
