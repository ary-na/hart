// src/app/(site)/layout.tsx
import NavBar from "@hart/components/site/NavBar";
import Footer from "@hart/components/site/Footer";
import WelcomeToast from "@hart/components/auth/WelcomeToast";
import ScrollReveal from "@hart/components/site/ScrollReveal";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-svh">
      <WelcomeToast />
      <ScrollReveal />
      <NavBar />
      <main className="flex flex-col flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
