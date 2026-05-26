// src/app/terms/page.tsx

import Link from "next/link";

export const metadata = {
  title: "Terms of Service",
};

const Terms = () => {
  return (
    <article>
      {/* ── Hero ─────────────────────────────────────────── */}
      <header className="h-container py-20 h-reveal">
        <p className="text-xs uppercase tracking-[0.4em] opacity-50 mb-2">Legal</p>
        <h1>Terms of Service</h1>
        <p className="mt-3 italic text-sm opacity-60">Last updated: January 12, 2026</p>
        <p className="mt-4 max-w-xl opacity-75 text-base leading-relaxed">
          By accessing or using Hart, or by purchasing any artwork, you agree to be bound by these Terms.
          If you do not agree, please do not use the Site.
        </p>
      </header>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-4 pb-24">

        {/* Section 1 */}
        <div className="relative py-10 border-b border-base-300 h-reveal">
          <span aria-hidden className="pointer-events-none select-none absolute top-6 right-0 text-[7rem] font-bold leading-none opacity-[0.04]">01</span>
          <h2 className="text-xl font-semibold tracking-normal mb-4">Introduction</h2>
          <p className="text-sm">
            Welcome to Hart (<strong>we</strong>, <strong>us</strong>, or <strong>our</strong>).
            These Terms of Service ("Terms") govern your access to and use of hildart.vercel.app (the "Site")
            and the purchase of artwork from me, the sole artist and operator.
          </p>
        </div>

        {/* Section 2 */}
        <div
          className="relative py-10 border-b border-base-300 h-reveal"
          style={{ ["--reveal-delay" as never]: "60ms" }}
        >
          <span aria-hidden className="pointer-events-none select-none absolute top-6 right-0 text-[7rem] font-bold leading-none opacity-[0.04]">02</span>
          <h2 className="text-xl font-semibold tracking-normal mb-4">Use of the Site</h2>
          <ul className="text-sm space-y-1">
            <li>You must be at least 13 years old to use the Site.</li>
            <li>You agree not to misuse the Site (e.g. no scraping, hacking, or spam).</li>
            <li>All artwork displayed is owned by me (copyright © Hart 2026).</li>
            <li>You may not reproduce, distribute, or sell my artwork without written permission.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div
          className="relative py-10 border-b border-base-300 h-reveal"
          style={{ ["--reveal-delay" as never]: "80ms" }}
        >
          <span aria-hidden className="pointer-events-none select-none absolute top-6 right-0 text-[7rem] font-bold leading-none opacity-[0.04]">03</span>
          <h2 className="text-xl font-semibold tracking-normal mb-4">Purchases &amp; Payments</h2>
          <ul className="text-sm space-y-1">
            <li>All prices are in AUD and include GST where applicable.</li>
            <li>Payment is processed securely via third-party providers (e.g. Stripe).</li>
            <li>Once payment is confirmed, orders are non-refundable except as required by Australian Consumer Law.</li>
            <li>Shipping times and costs are displayed at checkout; we are not liable for carrier delays.</li>
            <li>Title to artwork passes to you upon full payment.</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div
          className="relative py-10 border-b border-base-300 h-reveal"
          style={{ ["--reveal-delay" as never]: "60ms" }}
        >
          <span aria-hidden className="pointer-events-none select-none absolute top-6 right-0 text-[7rem] font-bold leading-none opacity-[0.04]">04</span>
          <h2 className="text-xl font-semibold tracking-normal mb-4">Intellectual Property</h2>
          <p className="text-sm">
            All artwork, images, text, design, and content on the Site are owned by Hart and protected
            by copyright and other intellectual property laws.
          </p>
          <p className="mt-3 text-sm">
            Purchasing a physical artwork grants you ownership of that physical item only — not the copyright or reproduction rights.
          </p>
        </div>

        {/* Section 5 */}
        <div
          className="relative py-10 border-b border-base-300 h-reveal"
          style={{ ["--reveal-delay" as never]: "60ms" }}
        >
          <span aria-hidden className="pointer-events-none select-none absolute top-6 right-0 text-[7rem] font-bold leading-none opacity-[0.04]">05</span>
          <h2 className="text-xl font-semibold tracking-normal mb-4">Limitation of Liability</h2>
          <p className="text-sm">
            To the maximum extent permitted by law, Hart is not liable for any indirect, incidental, special,
            or consequential damages arising from use of the Site or purchase of artwork.
          </p>
          <p className="mt-3 text-sm">
            Our total liability shall not exceed the amount you paid for the relevant artwork.
          </p>
        </div>

        {/* Section 6 */}
        <div
          className="relative py-10 border-b border-base-300 h-reveal"
          style={{ ["--reveal-delay" as never]: "60ms" }}
        >
          <span aria-hidden className="pointer-events-none select-none absolute top-6 right-0 text-[7rem] font-bold leading-none opacity-[0.04]">06</span>
          <h2 className="text-xl font-semibold tracking-normal mb-4">Australian Consumer Law</h2>
          <p className="text-sm">
            Nothing in these Terms excludes, restricts, or modifies any right or remedy you may have under
            the Australian Consumer Law (Schedule 2 of the Competition and Consumer Act 2010 (Cth)) that
            cannot lawfully be excluded.
          </p>
        </div>

        {/* Section 7 */}
        <div
          className="relative py-10 border-b border-base-300 h-reveal"
          style={{ ["--reveal-delay" as never]: "60ms" }}
        >
          <span aria-hidden className="pointer-events-none select-none absolute top-6 right-0 text-[7rem] font-bold leading-none opacity-[0.04]">07</span>
          <h2 className="text-xl font-semibold tracking-normal mb-4">Changes to Terms</h2>
          <p className="text-sm">
            We may update these Terms from time to time. The updated version will be posted here with a new
            "Last updated" date. Continued use of the Site after changes constitutes acceptance.
          </p>
        </div>

        {/* Section 8 */}
        <div
          className="relative py-10 h-reveal"
          style={{ ["--reveal-delay" as never]: "60ms" }}
        >
          <span aria-hidden className="pointer-events-none select-none absolute top-6 right-0 text-[7rem] font-bold leading-none opacity-[0.04]">08</span>
          <h2 className="text-xl font-semibold tracking-normal mb-4">Contact Us</h2>
          <p className="text-sm mb-4">Questions about these Terms? Reach out:</p>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="mailto:admin@hart.com.au" className="link link-primary">
              admin@hart.com.au
            </Link>
            <Link href="/contact" className="link link-primary">
              Contact form
            </Link>
          </div>
        </div>

      </div>
    </article>
  );
};

export default Terms;
