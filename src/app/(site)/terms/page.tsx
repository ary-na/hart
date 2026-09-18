import Link from "next/link";

export const metadata = {
  title: "Terms of Service",
};

const sections = [
  {
    title: "Agreement",
    body: "By using H♡ART at hlovesart.com.au (the Site), you agree to these Terms. If you do not agree, please do not use the Site.",
  },
  {
    title: "What the Site is",
    body: "The Site shows original animal paintings and lets you send commission or contact enquiries. It is not an online shop with checkout right now. Public customer accounts are not offered. Studio admin access is for authorised people only.",
  },
  {
    title: "Who may use it",
    body: "You should be at least 13 years old to use the Site. Do not misuse the Site (including scraping, hacking, spam, or trying to access admin areas without permission).",
  },
  {
    title: "Artwork and copyright",
    body: "All paintings, photos of paintings, text, and design on the Site belong to H♡ART / Hilda unless we say otherwise. You may view and share links to the Site for personal, non-commercial use. You may not copy, sell, or reproduce the artwork or site content without written permission.",
  },
  {
    title: "Commissions and enquiries",
    body: "Sending a form does not create a binding order by itself. If we agree a commission, price, timing, and delivery will be confirmed between us in writing (for example by email). Until online checkout exists, payment arrangements are handled off the Site.",
  },
  {
    title: "Prices",
    body: "Any price you see on the Site (if shown later) is a guide only unless we confirm it for a specific sale or commission. Currency is Australian dollars (AUD) unless we say otherwise.",
  },
  {
    title: "Australian Consumer Law",
    body: "Nothing in these Terms limits rights you cannot lawfully give up under the Australian Consumer Law.",
  },
  {
    title: "Liability",
    body: "To the extent allowed by law, we are not liable for indirect or consequential loss from using the Site. For a paid artwork or commission, our liability is limited to what you paid for that work, except where Australian Consumer Law says otherwise.",
  },
  {
    title: "Social links",
    body: "Instagram and TikTok links (when live) take you to third-party sites with their own terms and privacy rules.",
  },
  {
    title: "Changes",
    body: "We may update these Terms and will refresh the “Last updated” date when we do. Keep using the Site after a change means you accept the updated Terms.",
  },
];

const Terms = () => {
  return (
    <article className="mx-auto w-full max-w-[65ch] px-4 py-16 md:py-24">
      <header className="h-reveal">
        <p className="text-xs uppercase tracking-[0.35em] text-[#e8a4a8]">
          Legal
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl">Terms of Service</h1>
        <p className="mt-3 text-sm opacity-60">Last updated: 18 September 2026</p>
      </header>

      <div className="h-studio-card mt-10 space-y-10 px-6 py-8 md:px-10 md:py-12">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl">{section.title}</h2>
            <p className="mt-3 text-base leading-8 opacity-80">{section.body}</p>
          </section>
        ))}

        <section>
          <h2 className="text-xl">Contact</h2>
          <p className="mt-3 text-base leading-8 opacity-80">
            Questions about these Terms: use the{" "}
            <Link href="/contact" className="link link-primary">
              Contact form
            </Link>{" "}
            on this site.
          </p>
        </section>
      </div>
    </article>
  );
};

export default Terms;
