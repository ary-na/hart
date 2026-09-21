import Link from "next/link";
import NavBar from "@hart/components/site/NavBar";
import Footer from "@hart/components/site/Footer";
import SkipLink from "@hart/components/site/SkipLink";

const NotFound = () => {
  return (
    <div className="flex min-h-svh flex-col bg-[#faf8f5] text-[#3d342c]">
      <SkipLink />
      <NavBar />
      <main id="main-content" className="flex flex-1 flex-col">
        <section
          className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-20"
          aria-labelledby="not-found-heading"
        >
          <header className="h-page-header">
            <h1 id="not-found-heading" className="h-page-title">
              This page wandered off.
            </h1>
            <p className="h-page-lede">
              The page you’re looking for isn’t here. Take a quiet look through
              the gallery instead.
            </p>
          </header>
          <Link href="/" className="btn btn-primary rounded-full px-6">
            Back to Home
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
