// src/components/NavBar.tsx

"use client";

import Link from "next/link";
import { cn } from "@hart/lib/utils";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Logo } from "@hart/lib/ui";
import { useCurrentUser } from "@hart/hooks";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, isAuthenticated, isLoading, isUnauthenticated } =
    useCurrentUser();

  const userRole = user?.role;

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    signOut({ callbackUrl: "/login" });
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    (document.activeElement as HTMLElement)?.blur();
  };

  return (
    <div className="navbar">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
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
            <li className="mb-2">
              <Link href="/contact" onClick={closeMenu}>
                Contact
              </Link>
            </li>
              <div className="flex gap-4">
                <Link
                  href="/signup"
                  onClick={closeMenu}
                  className="btn btn-info btn-xs grow"
                >
                  Sign up
                </Link>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="btn btn-primary btn-xs grow"
                >
                  Sign in
                </Link>
              </div>
          </ul>
        </div>

        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/gallery">Gallery</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-center">
        <Link href="/">
          <Logo
            className="cursor-pointer hover:text-accent"
            width={144}
            height={64}
            alt="Logo"
            title="This is Hilda Art's website logo."
          />
        </Link>
      </div>
      <div className="navbar-end flex gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
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
              <span className="badge badge-sm indicator-item">0</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">0 Items</span>
              <span className="text-info">Subtotal: $0</span>
              <div className="card-actions">
                <Link
                  href="/gallery/cart"
                  className="btn btn-primary btn-block"
                >
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>

        {isLoading && <span className="loading loading-ring loading-md"></span>}
        {isUnauthenticated && (
          <Link href="/login" className="btn btn-ghost btn-xs">
            Login
          </Link>
        )}
        {isAuthenticated && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar flex items-center justify-center h-10 w-10"
            >
              <FontAwesomeIcon icon={faUser} width="20" />
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {userRole === "admin" && (
                <li>
                  <Link href="/admin">Dashboard</Link>
                </li>
              )}
              <li>
                <Link href="/user/profile">Profile</Link>
              </li>
              <li>
                <Link
                  href="#"
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
