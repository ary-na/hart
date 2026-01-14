// src/components/auth/Footer.tsx

// ! Code review completed.

import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="footer footer-center p-4 sm:p-8 text-xs opacity-75"
      role="contentinfo"
    >
      <div className="space-y-1">
        <p>Copyright © {currentYear} – All rights reserved by H♡ART</p>
        <p>
          Built with ☕ by{" "}
          <Link
            href="https://ariannyamchelo.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-primary hover:underline"
          >
            Arian Najafi Yamchelo
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
