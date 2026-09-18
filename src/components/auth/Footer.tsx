import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#d9cfc3] bg-[#faf8f5] px-4 py-6 text-xs text-[#3d342c]" role="contentinfo">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 lg:flex-row">
        <p className="opacity-70">© {currentYear} H♡ART. All rights reserved.</p>
        <p className="opacity-70">
          Built with ☕ by{" "}
          <Link
            href="https://arii.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="h-inline-link italic"
          >
            Arian Najafi Yamchelo
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
