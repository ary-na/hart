// src/app/contact/page.tsx

import ContactMeForm from "@hart/components/site/ContactMeForm";
import PageHeader from "@hart/components/site/PageHeader";

export const metadata = {
  title: "Contact me",
  description: "Tell me about your animal.",
};

const Contact = () => {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 pb-16 pt-16 md:pb-24 md:pt-24">
      <PageHeader title="Contact" lede="Tell me about your animal." />

      <div className="h-studio-card p-6 md:p-10">
        <ContactMeForm />
      </div>
    </section>
  );
};

export default Contact;
