// src/app/(site)/layout.tsx
import { Suspense } from "react";
import NavBar from "@hart/components/site/NavBar";
import Footer from "@hart/components/site/Footer";
import WelcomeToast from "@hart/components/auth/WelcomeToast";
import ScrollReveal from "@hart/components/site/ScrollReveal";
import AuthQueryOpener from "@hart/components/site/AuthQueryOpener";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-svh">
      <WelcomeToast />
      <ScrollReveal />
      <Suspense fallback={null}>
        <AuthQueryOpener />
      </Suspense>
      <NavBar />
      <main className="flex flex-col flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
