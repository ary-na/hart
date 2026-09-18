"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@hart/lib/ui";
import { cn } from "@hart/lib/utils";
import { useCurrentUser } from "@hart/hooks";
import { useEffect, useId, useRef, useState } from "react";
import { useSignout } from "@hart/hooks";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuId = useId();

  const { user } = useCurrentUser();
  const isAdmin = user?.role === "admin";
  const handleSignout = useSignout();
  const isHome = pathname === "/";

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    firstLinkRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

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
      <div className="container mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-[22px]">
        <Link href="/" aria-label="H♡ART home" className="flex shrink-0 items-center">
          <Logo
            className="h-12 w-auto cursor-pointer transition-colors hover:text-accent"
            width={128}
            height={56}
            aria-hidden
          />
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium leading-none opacity-80 transition-all hover:bg-base-200 hover:opacity-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {isAdmin && (
            <div className="dropdown dropdown-end ml-1 hidden lg:block">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-circle btn-sm"
                aria-label="Studio menu"
              >
                <FontAwesomeIcon icon={faUser} width={14} />
              </button>
              <ul
                tabIndex={-1}
                className="dropdown-content menu z-50 mt-3 w-44 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl"
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

          <div className={cn("relative lg:hidden", isMenuOpen && "dropdown-open")}>
            <button
              ref={menuButtonRef}
              type="button"
              className="btn btn-ghost btn-circle"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls={menuId}
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

            {isMenuOpen && (
              <div
                id={menuId}
                className="absolute right-0 z-50 mt-3 w-64 rounded-2xl border border-[#d9cfc3] bg-[#faf8f5] p-4 shadow-xl"
              >
                <nav aria-label="Primary">
                  <ul className="flex flex-col gap-0.5">
                    {navLinks.map((link, index) => (
                      <li key={link.href}>
                        <Link
                          ref={index === 0 ? firstLinkRef : undefined}
                          href={link.href}
                          onClick={closeMenu}
                          className="block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-base-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                {isAdmin && (
                  <div className="mt-3 border-t border-[#d9cfc3] pt-3">
                    <p className="h-kicker px-3 pb-1">Studio</p>
                    <Link
                      href="/admin"
                      onClick={closeMenu}
                      className="block rounded-xl px-3 py-2 text-sm hover:bg-base-200"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/user/profile"
                      onClick={closeMenu}
                      className="block rounded-xl px-3 py-2 text-sm hover:bg-base-200"
                    >
                      Profile
                    </Link>
                    <button
                      type="button"
                      className="block w-full rounded-xl px-3 py-2 text-left text-sm text-error"
                      onClick={(e) => {
                        handleSignout(e);
                        closeMenu();
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
