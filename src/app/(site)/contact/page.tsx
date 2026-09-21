// src/app/contact/page.tsx

import ContactMeForm from "@hart/components/site/ContactMeForm";
import PageHeader from "@hart/components/site/PageHeader";

export const metadata = {
  title: "Contact me",
  description: "Tell me about the animal you’d like painted.",
};

const Contact = () => {
  return (
    <section className="h-page-shell mx-auto w-full max-w-3xl px-4 pb-16 md:pb-24">
      <PageHeader
        title="Contact"
        lede="Tell me about the animal you’d like painted."
      />

      <div className="h-studio-card p-6 md:p-10">
        <ContactMeForm />
      </div>
    </section>
  );
};

export default Contact;
