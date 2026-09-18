// src/components/NavBar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@hart/lib/ui";
import { cn } from "@hart/lib/utils";
import { useCurrentUser } from "@hart/hooks";
import { useEffect, useState } from "react";
import { useSignout } from "@hart/hooks";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, isLoading } = useCurrentUser();
  const userRole = user?.role;
  const isAdmin = userRole === "admin";
  const handleSignout = useSignout();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    ...(!isAdmin ? [{ href: "/contact", label: "Contact" }] : []),
  ];

  return (
    <header
      className={cn(
        "z-50 transition-all duration-300",
        isHome ? "fixed inset-x-0 top-0" : "sticky top-0",
        scrolled || !isHome
          ? "bg-[#faf8f5]/92 backdrop-blur-xl border-b border-[#d9cfc3]/80"
          : "bg-[#faf8f5]/30 backdrop-blur-[2px] border-b border-transparent"
      )}
    >
      <div className="navbar container mx-auto px-4 max-w-6xl min-h-14">
        <div className="navbar-start gap-2">
          <div className={cn("dropdown lg:hidden", isMenuOpen && "dropdown-open")}>
            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((p) => !p)}
            >
              {isMenuOpen ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              )}
            </button>

            <div className="dropdown-content mt-3 w-72 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-xl z-50">
              <nav className="flex flex-col gap-0.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-base-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium opacity-80 transition-all hover:opacity-100 hover:bg-base-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="navbar-center">
          <Link href="/" aria-label="H♡ART home">
            <Logo
              className="cursor-pointer transition-colors hover:text-accent"
              width={128}
              height={56}
              title="H♡ART – Hilda loves Art"
            />
          </Link>
        </div>

        <div className="navbar-end flex items-center gap-1">
          {isLoading && (
            <span className="loading loading-ring loading-sm opacity-40" />
          )}

          {isAdmin && (
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-circle"
                aria-label="Studio menu"
              >
                <FontAwesomeIcon icon={faUser} width={18} />
              </button>
              <ul
                tabIndex={-1}
                className="dropdown-content menu z-50 mt-3 w-44 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl [&_a]:outline-none"
              >
                <li>
                  <Link href="/admin" onClick={closeMenu}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/user/profile" onClick={closeMenu}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-error focus:text-error"
                    onClick={(e) => {
                      handleSignout(e);
                      closeMenu();
                    }}
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
