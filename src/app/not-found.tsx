// src/app/not-found.tsx

// ! Code review completed.

import Link from "next/link";
import { QuestionMarkCanvas } from "@hart/lib/ui/svgs/QuestionMarkCanvas";

const NotFound = () => {
  return (
    <main>
      <section
        className="min-h-screen flex flex-col items-center justify-center gap-8"
        aria-labelledby="not-found-heading"
      >
        {/* Page header */}
        <header className="flex flex-col items-center text-center gap-2">
          <QuestionMarkCanvas
            width={200}
            height={221}
            alt=""
            className="mb-6"
            aria-hidden="true"
            title="Decorative question mark illustration for not found page."
          />

          <h1 id="not-found-heading">Page Not Found!</h1>

          <p className="max-w-md">
            The page you&apos;re looking for seems to have wandered off the
            canvas.
          </p>
        </header>

        {/* Action */}
        <Link
          href="/"
          className="btn btn-primary"
          aria-label="Return to the home page"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
};
export default NotFound;
