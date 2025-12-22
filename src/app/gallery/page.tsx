// src/app/shop/page.tsx

import { getCurrentUser } from "@hart/server/auth";
import CreateDrawingModalClient from "@hart/lib/ui/CreateDrawingModalClient";
const Shop = async () => {
  const user = await getCurrentUser();
  return (
    <section className="p-8">
      <h1>Gallery</h1>
      <p>See some of my latest drawings.</p>
      {user && user.role === "admin" && <CreateDrawingModalClient />}
    </section>
  );
};

export default Shop;
