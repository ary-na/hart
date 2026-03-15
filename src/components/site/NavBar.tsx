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

  const { user, isAuthenticated, isLoading, isUnauthenticated } =
    useCurrentUser();
  const { items, fetchCart } = useCartContext();

  const userRole = user?.role;

  const handleSignout = useSignout();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  const cartTotals = useMemo(() => {
    const count = items.length;
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    return { count, subtotal };
  }, [items]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-start">
        <div className={cn("dropdown", isMenuOpen && "dropdown-open")}>
          <button
            tabIndex={0}
            className="btn btn-ghost btn-circle lg:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </button>
          <ul
            tabIndex={-1}
            className="menu dropdown-content bg-base-300 rounded-box z-1 mt-3 w-50 p-2 shadow focus:outline-none [&_a]:outline-none"
          >
            <li>
              <Link href="/" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/gallery" onClick={closeMenu}>
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={closeMenu}>
                About
              </Link>
            </li>
            {userRole !== "admin" && (
              <li className="mb-2">
                <Link href="/contact" onClick={closeMenu}>
                  Contact
                </Link>
              </li>
            )}
            {isUnauthenticated && (
              <div className="flex flex-col gap-2">
                <Link
                  href="/signin"
                  onClick={closeMenu}
                  className="btn btn-outline btn-sm grow"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMenu}
                  className="btn btn-primary btn-sm grow"
                >
                  Sign up
                </Link>
              </div>
            )}
          </ul>
        </div>

        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/" className="flex items-center gap-2">
                Home
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="flex items-center gap-2">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/about" className="flex items-center gap-2">
                About
              </Link>
            </li>
            {userRole !== "admin" && (
              <li>
                <Link href="/contact" className="flex items-center gap-2">
                  Contact
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="navbar-center">
        <Link href="/">
          <Logo
            className="cursor-pointer hover:text-accent"
            width={144}
            height={64}
            title="This is Hilda Art's website logo."
          />
        </Link>
      </div>
      <div className="navbar-end flex">
        {isAuthenticated && userRole !== "admin" && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />{" "}
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cartTotals.count}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-300 z-1 mt-3 w-60 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">
                  {cartTotals.count} Items
                </span>
                <span className="text-info">
                  Subtotal: ${cartTotals.subtotal.toLocaleString()}
                </span>
                <div className="card-actions">
                  <Link href="/user/cart" className="btn btn-primary btn-block">
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {isLoading && <span className="loading loading-ring loading-md"></span>}
        {isUnauthenticated && (
          <div className="hidden lg:flex gap-2">
            <Link href="/signin" className="btn btn-ghost btn-xs">
              Sign in
            </Link>
            <Link href="/signup" className="btn btn-primary btn-xs">
              Sign up
            </Link>
          </div>
        )}
        {isAuthenticated && (
          <div className="dropdown menu dropdown-end focus:outline-none [&_a]:outline-none">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar flex items-center justify-center h-10 w-10"
            >
              <FontAwesomeIcon icon={faUser} width="20" />
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-40 p-2 shadow"
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
                  onClick={(e) => {
                    handleSignout(e);
                    closeMenu();
                  }}
                  className="cursor-pointer"
                >
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
