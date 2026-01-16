// src/app/terms/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Terms of Service",
};

const Terms = () => {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-4xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm opacity-70 italic">
          Last updated: January 12, 2026
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p>
          Welcome to Hart (<strong>we</strong>, <strong>us</strong>, or
          <strong> our</strong>). These Terms of Service (“Terms”) govern your
          access to and use of hildart.vercel.app (the “Site”) and the purchase
          of artwork from me, the sole artist and operator.
        </p>
        <p className="mt-4 font-medium text-error">
          By accessing or using the Site, or by purchasing any artwork, you
          agree to be bound by these Terms. If you do not agree, do not use the
          Site or make purchases.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. Use of the Site</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>You must be at least 13 years old to use the Site.</li>
          <li>You agree not to misuse the Site (e.g. no scraping, hacking, spam).</li>
          <li>All artwork displayed is owned by me (copyright © Hart 2026).</li>
          <li>You may not reproduce, distribute or sell my artwork without written permission.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">3. Purchases & Payments</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>All prices are in AUD and include GST where applicable.</li>
          <li>Payment is processed securely via third-party providers (e.g. Stripe).</li>
          <li>Once payment is confirmed, orders are non-refundable except as required by Australian Consumer Law.</li>
          <li>Shipping times and costs are displayed at checkout; we are not liable for delays caused by carriers.</li>
          <li>Title to artwork passes to you upon full payment.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
        <p>
          All artwork, images, text, design and content on the Site are owned by
          Hart and protected by copyright and other intellectual property laws.
        </p>
        <p className="mt-4">
          Purchasing a physical artwork grants you ownership of that physical
          item only — not the copyright or reproduction rights.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Hart is not liable for any
          indirect, incidental, special or consequential damages arising from
          use of the Site or purchase of artwork.
        </p>
        <p className="mt-4">
          Our total liability shall not exceed the amount you paid for the
          relevant artwork.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">6. Australian Consumer Law</h2>
        <p>
          Nothing in these Terms excludes, restricts or modifies any right or
          remedy you may have under the Australian Consumer Law (Schedule 2 of
          the Competition and Consumer Act 2010 (Cth)) that cannot lawfully be
          excluded.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. The updated version will
          be posted here with a new “Last updated” date. Continued use of the
          Site after changes constitutes acceptance.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
        <p>
          Questions about these Terms? Reach out:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>
            Email:{" "}
            <Link href="mailto:admin@hart.com.au" className="link">
              admin@hart.com.au
            </Link>
          </li>
          <li>
            Contact form:{" "}
            <Link href="/contact" className="link">
              /contact
            </Link>
          </li>
        </ul>
      </section>
    </article>
  );
};

export default Terms;
