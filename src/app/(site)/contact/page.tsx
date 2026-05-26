// src/app/contact/page.tsx

import ContactMeForm from "@hart/components/site/ContactMeForm";

export const metadata = {
  title: "Contact me",
};

const Contact = () => {
  return (
    <section className="my-10">
      <header className="h-container py-20 h-reveal">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] opacity-50">Contact me</p>
          <h1>Send a Note, Say Hello!</h1>
          <p
            className="h-reveal"
            style={{ ["--reveal-delay" as never]: "120ms" }}
          >
            Whether it&apos;s a collaboration or a simple hello, I look forward
            to hearing from you.
          </p>
        </div>
      </header>

      <div className="h-container py-20">
        <div className="rounded-2xl bg-base-100 p-8 shadow-sm border border-base-300 h-reveal">
          <ContactMeForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
