// src/components/NavBar.tsx

"use client";

import Link from "next/link";
import { Logo } from "@hart/lib/ui";
import { cn } from "@hart/lib/utils";
import { useCurrentUser } from "@hart/hooks";
import { useEffect, useMemo, useState } from "react";
import { useSignout, useCartContext } from "@hart/hooks";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, isAuthenticated, isLoading, isUnauthenticated } = useCurrentUser();
  const { items, fetchCart } = useCartContext();
  const userRole = user?.role;
  const handleSignout = useSignout();

  useEffect(() => {
    if (isAuthenticated) fetchCart();
  }, [isAuthenticated, fetchCart]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cartTotals = useMemo(
    () => ({
      count: items.length,
      subtotal: items.reduce((sum, item) => sum + item.price, 0),
    }),
    [items]
  );

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    ...(userRole !== "admin" ? [{ href: "/contact", label: "Contact" }] : []),
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-base-100/90 backdrop-blur-xl border-b border-base-300 shadow-sm"
          : "bg-base-100/60 backdrop-blur-md border-b border-transparent"
      )}
    >
      <div className="navbar container mx-auto px-4 max-w-6xl min-h-16">

        {/* Left: hamburger + desktop nav */}
        <div className="navbar-start gap-2">

          {/* Mobile hamburger */}
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

            {/* Mobile panel */}
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
              {isUnauthenticated && (
                <div className="mt-4 flex flex-col gap-2 border-t border-base-300 pt-4">
                  <Link href="/signin" onClick={closeMenu} className="btn btn-ghost btn-sm w-full">
                    Sign in
                  </Link>
                  <Link href="/signup" onClick={closeMenu} className="btn btn-primary btn-sm w-full">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Desktop nav */}
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

        {/* Center: logo */}
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

        {/* Right: cart + auth */}
        <div className="navbar-end flex items-center gap-1">
          {isLoading && (
            <span className="loading loading-ring loading-sm opacity-40" />
          )}

          {/* Cart */}
          {isAuthenticated && userRole !== "admin" && (
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-circle relative"
                aria-label={`Cart – ${cartTotals.count} items`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartTotals.count > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white leading-none">
                    {cartTotals.count}
                  </span>
                )}
              </button>
              <div tabIndex={0} className="dropdown-content z-50 mt-3 w-60 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-xl">
                <p className="font-semibold">
                  {cartTotals.count} {cartTotals.count === 1 ? "item" : "items"}
                </p>
                <p className="mt-1 text-sm opacity-60">
                  Subtotal: ${cartTotals.subtotal.toLocaleString()}
                </p>
                <Link href="/user/cart" className="btn btn-primary btn-sm btn-block mt-3">
                  View cart
                </Link>
              </div>
            </div>
          )}

          {/* Sign in / up – unauthenticated desktop */}
          {isUnauthenticated && (
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/signin" className="btn btn-ghost btn-sm">
                Sign in
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm">
                Sign up
              </Link>
            </div>
          )}

          {/* User dropdown */}
          {isAuthenticated && (
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-circle"
                aria-label="User menu"
              >
                <FontAwesomeIcon icon={faUser} width={18} />
              </button>
              <ul
                tabIndex={-1}
                className="dropdown-content menu z-50 mt-3 w-44 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl [&_a]:outline-none"
              >
                {userRole === "admin" && (
                  <li>
                    <Link href="/admin" onClick={closeMenu}>
                      Dashboard
                    </Link>
                  </li>
                )}
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
