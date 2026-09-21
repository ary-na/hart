import Link from "next/link";
import PageHeader from "@hart/components/site/PageHeader";

export const metadata = {
  title: "Privacy Policy",
};

const sections = [
  {
    title: "At a glance",
    body: "This site is an art gallery and commission enquiry space for H♡ART. We do not run public customer accounts or online checkout right now. We only collect what we need to show the gallery, answer your messages, and run the studio.",
  },
  {
    title: "Who we are",
    body: "H♡ART (Hart) is operated from Melbourne, Australia. The site is hlovesart.com.au (and any preview or temporary hosting we use while the domain is connected).",
  },
  {
    title: "What we collect",
    body: "When you use the contact or commission form, you may send us your name, email, message, and optional images or details about an animal portrait. When you visit the site, our hosting and security tools may collect technical data such as IP address, browser type, and pages viewed. Admin sign-in (studio only) uses an email and password for people who manage the site. There is no public sign-up.",
  },
  {
    title: "What we do not collect for now",
    body: "We do not take online payments on this site. We do not ask the public to create customer accounts. We do not store shopping carts or card details here.",
  },
  {
    title: "Why we use your data",
    body: "To reply to enquiries and commission requests. To show and improve the gallery. To keep the site secure and working. To run the admin studio.",
  },
  {
    title: "Sharing",
    body: "We may use trusted providers to host the site, store images, and send or receive form messages. We do not sell your personal information. We may share data if the law requires it.",
  },
  {
    title: "Cookies",
    body: "We may use cookies or similar tools for basic site function, security, and understanding how the gallery is used. You can limit cookies in your browser. Some parts of the site may work less smoothly if you do.",
  },
  {
    title: "Storage and security",
    body: "We aim to keep personal information secure with standard protections (including HTTPS). Access to admin tools is limited to authorised studio users.",
  },
  {
    title: "How long we keep it",
    body: "Enquiry and commission messages are kept as long as needed to reply and manage the request, unless you ask us to delete them sooner where we can. Technical logs are kept only as long as useful for security and operations.",
  },
  {
    title: "Your rights",
    body: "If you are in Australia, the Privacy Act 1988 (Cth) and Australian Privacy Principles may apply. You can ask what personal information we hold about you, ask us to correct it, or ask us to delete it where appropriate. Contact us using the details below.",
  },
  {
    title: "Children",
    body: "This site is not aimed at children under 13. We do not knowingly collect their personal information.",
  },
  {
    title: "Overseas storage",
    body: "Hosting and image storage may use servers outside Australia. By using the site, you understand your information may be processed in those places with appropriate safeguards where required.",
  },
  {
    title: "Changes",
    body: "We may update this policy. We will change the “Last updated” date when we do.",
  },
];

const Privacy = () => {
  return (
    <article className="mx-auto w-full max-w-[65ch] px-4 pb-16 pt-16 md:pb-24 md:pt-24">
      <PageHeader title="Privacy Policy" lede="Last updated: 18 September 2026" />

      <div className="h-studio-card space-y-10 px-6 py-8 md:px-10 md:py-12">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl">{section.title}</h2>
            <p className="mt-3 text-base leading-8 opacity-80">{section.body}</p>
          </section>
        ))}

        <section>
          <h2 className="text-xl">Contact</h2>
          <p className="mt-3 text-base leading-8 opacity-80">
            Questions about privacy: use the{" "}
            <Link href="/contact" className="h-inline-link">
              Contact form
            </Link>{" "}
            on this site.
          </p>
        </section>
      </div>
    </article>
  );
};

export default Privacy;
