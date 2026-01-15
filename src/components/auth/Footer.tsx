// src/components/auth/Footer.tsx

import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="p-4 sm:p-8 text-xs opacity-75" role="contentinfo">
      <div className="flex flex-col gap-2 justify-between items-center lg:flex-row">
        <p>Copyright © {currentYear} – All rights reserved by H♡ART</p>
        <p>
          Built with ☕ by{" "}
          <Link
            href="https://ariannyamchelo.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-accent italic"
          >
            Arian Najafi Yamchelo
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
