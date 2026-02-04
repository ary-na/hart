// src/lib/ui/gallery/EmptyGallery.tsx

import { EmptyGalleryCanvas } from "./svgs/EmptyGalleryCanvas";

export function EmptyGallery({ ...props }) {
  return (
    <div
      className="flex flex-col flex-1 items-center justify-center text-center"
      {...props}
    >
      <EmptyGalleryCanvas className="mb-6 w-20" />

      <h2>NOTHING here… YET.</h2>

      <p className="mt-2 max-w-md">
        No drawings have found their way here yet.
      </p>
    </div>
  );
}
