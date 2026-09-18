// src/app/(site)/gallery/page.tsx

import { auth } from "@hart/server/auth";
import { Breadcrumbs } from "@hart/lib/ui";
import { ModalController } from "@hart/lib/ui";
import GalleryGrid from "@hart/components/site/GalleryGrid";
import DrawingsProvider from "@hart/context/DrawingsContext";
import AddDrawingModal from "@hart/components/admin/AddDrawingModal";

export const metadata = {
  title: "Gallery",
  description: "Gentle animal portraits, made to live with.",
};

const Gallery = async () => {
  const session = await auth();
  const isAdmin = session?.user?.role === "admin";

  return (
    <DrawingsProvider>
      <section
        className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10 md:pb-28 md:pt-16"
        aria-labelledby="gallery-heading"
      >
        <header className="mb-10 flex items-end justify-between gap-4">
          <div className="h-reveal">
            <h1 id="gallery-heading" className="h-heading-rose text-3xl md:text-4xl">
              Gallery
            </h1>
            {isAdmin ? (
              <div className="mt-4">
                <Breadcrumbs
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Dashboard", href: "/admin" },
                    { label: "Gallery" },
                  ]}
                />
              </div>
            ) : (
              <p
                className="mt-6 max-w-md text-base leading-relaxed opacity-75"
                style={{ ["--reveal-delay" as never]: "80ms" }}
              >
                Gentle animal portraits, made to live with.
              </p>
            )}
          </div>
          {isAdmin && (
            <ModalController
              trigger="Add Drawing"
              className="btn-primary btn-sm h-reveal rounded-full"
              ariaLabel="Add a new drawing"
              ModalComponent={AddDrawingModal}
            />
          )}
        </header>

        <div role="region" aria-label="Gallery of artworks">
          <GalleryGrid />
        </div>
      </section>
    </DrawingsProvider>
  );
};

export default Gallery;
