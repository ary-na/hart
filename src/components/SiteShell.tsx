// src/components/SiteShell.tsx

import NavBar from "./NavBar";
import Footer from "./Footer";

const SiteShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="grow flex flex-col">{children}</main>
      <Footer />
    </div>
  );
};

export default SiteShell;
