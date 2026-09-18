// src/components/auth/NavBar.tsx

import Link from "next/link";
import { Logo } from "@hart/lib/ui";

const NavBar = () => {
  return (
    <header className="border-b border-[#d9cfc3] bg-[#faf8f5]">
      <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-[22px]">
        <Link href="/" aria-label="H♡ART home" className="flex items-center">
          <Logo
            className="h-12 w-auto"
            width={128}
            height={56}
            aria-hidden
          />
        </Link>
        <nav aria-label="Primary">
          <Link href="/" className="inline-flex items-center text-sm leading-none opacity-80 hover:opacity-100">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
