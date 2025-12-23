// src/app/gallery/page.tsx

import { getCurrentUser } from "@hart/server/auth";
import GalleryGrid from "@hart/components/GalleryGrid";
import CreateDrawingModalClient from "@hart/lib/ui/CreateDrawingModalClient";

const Shop = async () => {
  const user = await getCurrentUser();
  return (
    <section className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gallery</h1>
          <p className="mt-2 opacity-70">See some of my latest drawings.</p>
        </div>
        {user && user.role === "admin" && <CreateDrawingModalClient />}
      </div>
      <GalleryGrid />
    </section>
  );
};

export default Shop;
