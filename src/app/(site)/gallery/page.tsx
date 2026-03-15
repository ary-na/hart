// src/app/(site)/gallery/page.tsx

import { auth } from "@hart/server/auth";
import { Breadcrumbs } from "@hart/lib/ui";
import { ModalController } from "@hart/lib/ui";
import GalleryGrid from "@hart/components/site/GalleryGrid";
import DrawingsProvider from "@hart/context/DrawingsContext";
import AddDrawingModal from "@hart/components/admin/AddDrawingModal";

export const metadata = {
  title: "Gallery",
  description:
    "A collection of drawings and creations that tell my story and passion through every stroke.",
};

const Gallery = async () => {
  const session = await auth();
  const isAdmin = session?.user?.role === "admin";

  return (
    <DrawingsProvider>
      <section className="h-flex-container my-10 py-20" aria-labelledby="gallery-heading">
        {/* Section header */}
        <header className="flex items-center justify-between mb-6">
          <div className="h-reveal">
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
              <p
                className="h-reveal"
                style={{ ["--reveal-delay" as never]: "120ms" }}
              >
                Raw, real, and deeply felt.
              </p>
            )}
          </div>
          {/* Admin action */}
          {isAdmin && (
            <ModalController
              trigger="Add Drawing"
              className="btn-secondary btn-sm text-primary-content h-reveal"
              ariaLabel="Add a new drawing"
              ModalComponent={AddDrawingModal}
            />
          )}
        </header>

        {/* Gallery grid */}
        <div
          role="region"
          className="flex-1 flex flex-col"
          aria-label="Gallery of artworks"
        >
          <GalleryGrid />
        </div>
      </section>
    </DrawingsProvider>
  );
};

export default Gallery;
