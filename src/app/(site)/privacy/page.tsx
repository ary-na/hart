// src/app/privacy/page.tsx

import Link from "next/link";

export const metadata = {
  title: "Privacy & Data Policy",
};

const Privacy = () => {
  return (
    <article>
      {/* ── Hero ─────────────────────────────────────────── */}
      <header className="h-container py-20 h-reveal">
        <p className="text-xs uppercase tracking-[0.4em] opacity-50 mb-2">Legal</p>
        <h1>Privacy &amp; Data Policy</h1>
        <p className="mt-3 italic text-sm opacity-60">Last updated: January 2026</p>
        <p className="mt-4 max-w-xl opacity-75 text-base leading-relaxed">
          We respect your privacy and are committed to protecting your personal data.
          This policy explains what we collect, why, and how you can exercise your rights.
        </p>
      </header>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-4 pb-24">

        {/* Summary callout */}
        <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm mb-4 h-reveal">
          <p className="text-xs uppercase tracking-[0.4em] opacity-50 mb-4">At a glance</p>
          <ul className="space-y-2 text-sm leading-relaxed">
            <li>We collect only the data necessary to provide and improve our services.</li>
            <li>Your data is stored securely and never sold or traded to third parties.</li>
            <li>You have rights to access, correct, or delete your personal information.</li>
            <li>We use cookies to enhance your experience, which you can disable in your browser.</li>
            <li>Your data may be transferred internationally, but we maintain strong safeguards.</li>
            <li>If you have questions or want to exercise your rights, contact us anytime.</li>
          </ul>
        </div>

        {/* Section 1 */}
        <div
          className="relative py-10 border-b border-base-300 h-reveal"
          style={{ ["--reveal-delay" as never]: "60ms" }}
        >
          <span aria-hidden className="pointer-events-none select-none absolute top-6 right-0 text-[7rem] font-bold leading-none opacity-[0.04]">01</span>
          <h2 className="text-xl font-semibold tracking-normal mb-4">Introduction</h2>
          <p>
            Welcome to <strong>Hart</strong> (the "Site", "we", "us", or "our").
            This Privacy &amp; Data Policy explains how we collect, use, disclose,
            and protect information when you visit or use our website (
            <Link href="https://hildart.vercel.app" className="link" aria-label="Visit the Hart official website">
              hildart.vercel.app
            </Link>
            ) or any related services. By using our Site, you agree to the
            collection and use of information in accordance with this policy.
          </p>
          <p className="font-medium text-error mt-4">
            If you do not agree with this policy, please refrain from using the Site.
          </p>
        </div>

        {/* Section 2 */}
        <div
          className="relative py-10 border-b border-base-300 h-reveal"
          style={{ ["--reveal-delay" as never]: "100ms" }}
        >
          <span aria-hidden className="pointer-events-none select-none absolute top-6 right-0 text-[7rem] font-bold leading-none opacity-[0.04]">02</span>
          <h2 className="text-xl font-semibold tracking-normal mb-4">What Data We Collect</h2>

          <h3 className="text-base font-semibold tracking-normal mt-6 mb-2 opacity-80">Data you provide</h3>
          <p className="text-sm opacity-75 mb-2">When you sign up, log in, purchase, or contact us, we may collect:</p>
          <ul className="text-sm space-y-1">
            <li><strong>Username</strong> — when you register or log in.</li>
            <li><strong>Email address</strong> — for account management, receipts, and communication.</li>
            <li><strong>Password</strong> — stored securely (hashed), used for authentication.</li>
            <li><strong>Billing or shipping address</strong> — if you order an artwork.</li>
            <li><strong>Order &amp; purchase details</strong> — items, quantity, date, payment data.</li>
            <li><strong>Any content you submit</strong> — messages, contact forms, preferences.</li>
          </ul>

          <h3 className="text-base font-semibold tracking-normal mt-6 mb-2 opacity-80">Automatically collected data</h3>
          <p className="text-sm opacity-75 mb-2">When you visit the Site, we may automatically collect:</p>
          <ul className="text-sm space-y-1">
            <li><strong>IP address &amp; geolocation</strong> — for security, fraud detection, analytics.</li>
            <li><strong>Device information</strong> — browser, OS, device type, screen resolution.</li>
            <li><strong>Usage data</strong> — pages viewed, time spent, clicks, interactions.</li>
            <li><strong>Cookies &amp; similar technologies</strong> — see Section 6 below.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div
          className="relative py-10 border-b border-base-300 h-reveal"
          style={{ ["--reveal-delay" as never]: "120ms" }}
        >
          <span aria-hidden className="pointer-events-none select-none absolute top-6 right-0 text-[7rem] font-bold leading-none opacity-[0.04]">03</span>
          <h2 className="text-xl font-semibold tracking-normal mb-4">Why We Collect the Data</h2>
          <p className="text-sm opacity-75 mb-3">We use collected data for:</p>
          <ul className="text-sm space-y-1">
            <li><strong>Account management</strong> — registration, login, authentication, password reset.</li>
            <li><strong>Order processing</strong> — fulfilling purchases, shipping, billing, receipts.</li>
            <li><strong>Site functionality</strong> — personalised content, preferences, smooth navigation.</li>
            <li><strong>Communications</strong> — responding to enquiries, purchase confirmations, opt-in newsletters.</li>
            <li><strong>Security &amp; fraud prevention</strong> — detecting suspicious behaviour, protecting against abuse.</li>
            <li><strong>Analytics &amp; performance</strong> — understanding usage, improving content and design.</li>
          </ul>
          <p className="mt-4 text-sm">
            We will <strong>never</strong> process more data than needed, and we do not sell or trade your personal data to third parties for marketing.
          </p>
        </div>

        {/* Section 4 */}
        <div
          className="relative py-10 border-b border-base-300 h-reveal"
          style={{ ["--reveal-delay" as never]: "60ms" }}
        >
          <span aria-hidden className="pointer-events-none select-none absolute top-6 right-0 text-[7rem] font-bold leading-none opacity-[0.04]">04</span>
          <h2 className="text-xl font-semibold tracking-normal mb-4">Legal &amp; Compliance</h2>
          <p className="text-sm">
            Depending on your location, relevant data-protection laws may apply — e.g. the Privacy Act 1988 (Cth) &amp;
            Australian Privacy Principles, or international regulations like GDPR / CCPA. We endeavour to meet or exceed
            all applicable standards.
          </p>
          <p className="mt-4 text-sm">
            If you are browsing from a country with strict data-protection laws, you may have additional rights (see Section 9).
          </p>
        </div>

        {/* Section 5 */}
        <div
          className="relative py-10 border-b border-base-300 h-reveal"
          style={{ ["--reveal-delay" as never]: "80ms" }}
        >
          <span aria-hidden className="pointer-events-none select-none absolute top-6 right-0 text-[7rem] font-bold leading-none opacity-[0.04]">05</span>
          <h2 className="text-xl font-semibold tracking-normal mb-4">Data Sharing &amp; Disclosure</h2>
          <p className="text-sm opacity-75 mb-3">We may share your data only in the following circumstances:</p>
          <ul className="text-sm space-y-1">
            <li>With <strong>service providers</strong> (payment processors, shipping partners) — only as needed, under strict confidentiality.</li>
            <li>With <strong>law enforcement or legal authorities</strong>, if required by law.</li>
            <li>In the case of a <strong>merger, acquisition, or sale</strong> — we will notify you and provide an opt-out if required.</li>
            <li>Aggregated &amp; anonymised data may be used for analytics or reporting.</li>
          </ul>
          <p className="mt-4 text-sm">
            We will <strong>never</strong> sell, rent, or trade your personal information for advertising or marketing.
          </p>
        </div>

        {/* Section 6 */}
        <div
          className="relative py-10 border-b border-base-300 h-reveal"
          style={{ ["--reveal-delay" as never]: "60ms" }}
        >
          <span aria-hidden className="pointer-events-none select-none absolute top-6 right-0 text-[7rem] font-bold leading-none opacity-[0.04]">06</span>
          <h2 className="text-xl font-semibold tracking-normal mb-4">Cookies &amp; Tracking Technologies</h2>
          <p className="text-sm opacity-75 mb-3">We use cookies and similar technologies for:</p>
          <ul className="text-sm space-y-1">
            <li>Session management (keeping you logged in).</li>
            <li>Site functionality (shopping cart, user preferences).</li>
            <li>Analytics (understanding site usage).</li>
          </ul>
          <p className="mt-4 text-sm">
            <strong>You can disable cookies</strong> through your browser settings, though this may affect login, cart, and preference features.
          </p>
        </div>

        {/* Section 7 */}
        <div
          className="relative py-10 border-b border-base-300 h-reveal"
          style={{ ["--reveal-delay" as never]: "60ms" }}
        >
          <span aria-hidden className="pointer-events-none select-none absolute top-6 right-0 text-[7rem] font-bold leading-none opacity-[0.04]">07</span>
          <h2 className="text-xl font-semibold tracking-normal mb-4">Data Storage &amp; Security</h2>
          <ul className="text-sm space-y-1">
            <li>Data is stored securely using industry-standard encryption and hashing (especially for passwords).</li>
            <li>Access to your personal data is restricted to authorised personnel only.</li>
            <li>We use secure transport (HTTPS) in transit.</li>
            <li>In the event of a breach, we will notify affected users promptly as required by law.</li>
            <li>We do <strong>not</strong> store sensitive data (e.g. full card numbers) unless via secure third-party processors.</li>
          </ul>
        </div>

        {/* Section 8 */}
        <div
          className="relative py-10 border-b border-base-300 h-reveal"
          style={{ ["--reveal-delay" as never]: "60ms" }}
        >
          <span aria-hidden className="pointer-events-none select-none absolute top-6 right-0 text-[7rem] font-bold leading-none opacity-[0.04]">08</span>
          <h2 className="text-xl font-semibold tracking-normal mb-4">Data Retention &amp; Deletion</h2>
          <p className="text-sm">We keep your account and order data as long as you maintain your account.</p>
          <p className="mt-3 text-sm">
            If you request account deletion, we will permanently delete your personal data (except aggregated anonymised analytics data).
          </p>
          <p className="mt-3 text-sm">
            You can also request partial deletion — contact us using the details in Section 13.
          </p>
        </div>

        {/* Section 9 */}
        <div
          className="relative py-10 border-b border-base-300 h-reveal"
          style={{ ["--reveal-delay" as never]: "60ms" }}
        >
          <span aria-hidden className="pointer-events-none select-none absolute top-6 right-0 text-[7rem] font-bold leading-none opacity-[0.04]">09</span>
          <h2 className="text-xl font-semibold tracking-normal mb-4">Your Rights</h2>
          <p className="text-sm opacity-75 mb-3">Depending on your jurisdiction, you may have the right to:</p>
          <ul className="text-sm space-y-1">
            <li>Access personal data we hold about you.</li>
            <li>Correct or update inaccurate or incomplete data.</li>
            <li>Request deletion of your data ("right to be forgotten").</li>
            <li>Object to or restrict processing.</li>
            <li>Obtain a portable copy of your data.</li>
            <li>Revoke consent for optional processing or marketing.</li>
          </ul>
          <p className="mt-4 text-sm">
            If you live in Australia, the UK, EU, California, or another regulated area — contact us to exercise these rights.
          </p>
        </div>

        {/* Section 10 */}
        <div
          className="relative py-10 border-b border-base-300 h-reveal"
          style={{ ["--reveal-delay" as never]: "60ms" }}
        >
          <span aria-hidden className="pointer-events-none select-none absolute top-6 right-0 text-[7rem] font-bold leading-none opacity-[0.04]">10</span>
          <h2 className="text-xl font-semibold tracking-normal mb-4">Age &amp; Children Policy</h2>
          <p className="text-sm">Hart is intended for users 13 years old and above.</p>
          <p className="mt-3 text-sm">We do <strong>not knowingly</strong> collect personal data from children under 13. If we become aware of such data, we will promptly delete it.</p>
        </div>

        {/* Section 11 */}
        <div
          className="relative py-10 border-b border-base-300 h-reveal"
          style={{ ["--reveal-delay" as never]: "60ms" }}
        >
          <span aria-hidden className="pointer-events-none select-none absolute top-6 right-0 text-[7rem] font-bold leading-none opacity-[0.04]">11</span>
          <h2 className="text-xl font-semibold tracking-normal mb-4">International Transfer of Data</h2>
          <p className="text-sm">
            Your information may be stored and processed on servers located outside your country (e.g. Vercel infrastructure, databases in the US or Asia).
          </p>
          <p className="mt-3 text-sm">By using the Site, you consent to cross-border data transfer. We maintain adequate safeguards to protect your data.</p>
        </div>

        {/* Section 12 */}
        <div
          className="relative py-10 border-b border-base-300 h-reveal"
          style={{ ["--reveal-delay" as never]: "60ms" }}
        >
          <span aria-hidden className="pointer-events-none select-none absolute top-6 right-0 text-[7rem] font-bold leading-none opacity-[0.04]">12</span>
          <h2 className="text-xl font-semibold tracking-normal mb-4">Changes to This Policy</h2>
          <p className="text-sm">
            We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page.
          </p>
          <p className="mt-3 text-sm">We recommend reviewing this page periodically. Continued use of Hart after changes constitutes acceptance of the updated policy.</p>
        </div>

        {/* Section 13 */}
        <div
          className="relative py-10 h-reveal"
          style={{ ["--reveal-delay" as never]: "60ms" }}
        >
          <span aria-hidden className="pointer-events-none select-none absolute top-6 right-0 text-[7rem] font-bold leading-none opacity-[0.04]">13</span>
          <h2 className="text-xl font-semibold tracking-normal mb-4">Contact Us</h2>
          <p className="text-sm mb-4">If you have questions, concerns, or want to exercise your data rights:</p>
          <div className="flex flex-col gap-2 text-sm">
            <Link
              href="mailto:admin@hart.com.au"
              className="link link-primary"
              aria-label="Email Hart support"
            >
              admin@hart.com.au
            </Link>
            <Link href="/contact" className="link link-primary" aria-label="Go to the contact form">
              Contact form
            </Link>
          </div>
        </div>

      </div>
    </article>
  );
};

export default Privacy;
