// src/app/contact/page.tsx

import ContactMeForm from "@hart/components/site/ContactMeForm";

export const metadata = {
  title: "Contact me",
};

const Contact = () => {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16 md:py-24">
      <header className="h-reveal max-w-xl">
        <p className="h-kicker">Contact</p>
        <h1 className="h-heading-rose mt-3 text-3xl md:text-4xl">
          I’d love to paint your animal.
        </h1>
        <p className="mt-6 text-base leading-8 opacity-80 md:text-lg">
          Tell me who they are, and the mood you want in the piece. A clear
          photo, a name, and a mood is a good place to start.
        </p>
      </header>

      <div className="h-studio-card mt-10 p-6 md:p-10">
        <ContactMeForm />
      </div>
    </section>
  );
};

export default Contact;
