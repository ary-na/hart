// src/app/(site)/layout.tsx
import { Suspense } from "react";
import NavBar from "@hart/components/site/NavBar";
import Footer from "@hart/components/site/Footer";
import SkipLink from "@hart/components/site/SkipLink";
import WelcomeToast from "@hart/components/auth/WelcomeToast";
import ScrollReveal from "@hart/components/site/ScrollReveal";
import AuthQueryOpener from "@hart/components/site/AuthQueryOpener";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-svh flex-col">
      <SkipLink />
      <WelcomeToast />
      <ScrollReveal />
      <Suspense fallback={null}>
        <AuthQueryOpener />
      </Suspense>
      <NavBar />
      <main id="main-content" className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
