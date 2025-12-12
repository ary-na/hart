// src/components/NavBar.tsx

"use client";

// Next.js import
import Link from "next/link";

// NextAuth session import
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

// UI imports
import { Logo } from "@hart/lib/ui";

// Font Awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const isLoading = status === "loading";
  const isUnauthenticated = status === "unauthenticated";

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle lg:hidden"
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
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
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
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>

        {isLoading && <span className="loading loading-ring loading-md"></span>}
        {isUnauthenticated && (
          <Link href="/login" className="btn btn-ghost">
            Login
          </Link>
        )}
        {isLoggedIn && (
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
              <li>
                <a className="justify-between">
                  Profile (coming soon)
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <Link href="/admin">Admin Dashboard</Link>
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
