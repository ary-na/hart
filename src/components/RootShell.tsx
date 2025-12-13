// src/components/RootShell.tsx

// Component imports
import NavBar from "./NavBar";
import Footer from "./Footer";

const RootShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="grow container max-w-3xl mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default RootShell;
