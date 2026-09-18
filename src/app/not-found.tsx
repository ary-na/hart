import Link from "next/link";

const NotFound = () => {
  return (
    <main className="min-h-svh bg-[#faf8f5] text-[#3d342c]">
      <section
        className="flex min-h-svh flex-col items-center justify-center gap-8 px-4"
        aria-labelledby="not-found-heading"
      >
        <header className="flex max-w-md flex-col items-center gap-3 text-center">
          <h1 id="not-found-heading" className="text-3xl md:text-4xl">
            This page wandered off.
          </h1>
          <p className="leading-relaxed opacity-75">
            The page you’re looking for isn’t here. Take a quiet look through
            the gallery instead.
          </p>
        </header>
        <Link href="/" className="btn btn-primary rounded-full px-6">
          Back to Home
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
