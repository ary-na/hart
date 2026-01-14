// src/components/auth/NavBar.tsx

// ! Code review completed.

import Link from "next/link";

const NavBar = () => {
  return (
    <div className="navbar py-3">
      <div className="navbar-start">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">← Go Home</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
