// src/app/(site)/gallery/page.tsx

import { auth } from "@hart/server/auth";
import { Breadcrumbs } from "@hart/lib/ui";
import { ModalController } from "@hart/lib/ui";
import GalleryGrid from "@hart/components/site/GalleryGrid";
import PageHeader from "@hart/components/site/PageHeader";
import DrawingsProvider from "@hart/context/DrawingsContext";
import AddDrawingModal from "@hart/components/admin/AddDrawingModal";

export const metadata = {
  title: "Gallery",
  description: "Gentle animal portraits.",
};

const Gallery = async () => {
  const session = await auth();
  const isAdmin = session?.user?.role === "admin";

  return (
    <DrawingsProvider>
      <section
        className="mx-auto w-full max-w-6xl px-4 pb-20 pt-16 md:pb-28 md:pt-24"
        aria-labelledby="gallery-heading"
      >
        <PageHeader
          id="gallery-heading"
          title="Gallery"
          lede="Gentle animal portraits."
        >
          {isAdmin ? (
            <div className="mt-8 flex flex-col items-center gap-4">
              <Breadcrumbs
                className="mb-0 w-fit"
                items={[
                  { label: "Home", href: "/" },
                  { label: "Dashboard", href: "/admin" },
                  { label: "Gallery" },
                ]}
              />
              <ModalController
                trigger="Add Drawing"
                className="btn-primary btn-sm rounded-full"
                ariaLabel="Add a new drawing"
                ModalComponent={AddDrawingModal}
              />
            </div>
          ) : null}
        </PageHeader>

        <div role="region" aria-label="Gallery of artworks">
          <GalleryGrid />
        </div>
      </section>
    </DrawingsProvider>
  );
};

export default Gallery;
