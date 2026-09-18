// src/components/auth/NavBar.tsx

import Link from "next/link";
import { Logo } from "@hart/lib/ui";

const NavBar = () => {
  return (
    <div className="border-b border-[#d9cfc3] bg-[#faf8f5]">
      <div className="container mx-auto flex min-h-20 max-w-6xl items-center justify-between px-4 py-5">
        <Link href="/" aria-label="H♡ART home">
          <Logo width={128} height={56} title="H♡ART, Hilda loves Art" />
        </Link>
        <Link href="/" className="text-sm opacity-70 hover:opacity-100">
          Home
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
