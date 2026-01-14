// src/app/(auth)/layout.tsx

// ! Code review in progress.

import NavBar from "@hart/components/auth/NavBar";
import Footer from "@hart/components/auth/Footer";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-svh">
      <NavBar />
      <main className="flex-1 flex">{children}</main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
