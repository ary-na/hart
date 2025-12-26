// src/app/gallery/page.tsx

import { Breadcrumbs } from "@hart/lib/ui";
import { getCurrentUser } from "@hart/server/auth";
import GalleryGrid from "@hart/components/GalleryGrid";
import { ModalWrapper } from "@hart/lib/ui";
import AddDrawingModal from "@hart/components/AddDrawingModal";

const Gallery = async () => {
  const user = await getCurrentUser();
  const isAdmin = user?.role === "admin";

  return (
    <section className="h-container" aria-labelledby="gallery-heading">
      {/* Section header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 id="gallery-heading">Gallery</h1>
          {isAdmin ? (
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Dashboard", href: "/admin" },
                { label: "Gallery" },
              ]}
            />
          ) : (
            <p>Raw, real, and deeply felt.</p>
          )}
        </div>
        {/* Admin action */}
        {isAdmin && (
          <ModalWrapper
            trigger="Add Drawing"
            className="btn-secondary btn-sm"
            ariaLabel="Add a new drawing"
            ModalComponent={AddDrawingModal}
          />
        )}
      </header>

      {/* Gallery grid */}
      <div role="region" aria-label="Gallery of artworks">
        <GalleryGrid />
      </div>
    </section>
  );
};

export default Gallery;
