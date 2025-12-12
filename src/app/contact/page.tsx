// src/app/contact/page.tsx

// Component imports
import ContactMeForm from "@hart/components/ContactMeForm";

const Contact = () => {
  return (
    <section className="p-8">
      <h1 className="hart-h1">Contact me</h1>
      <p className="mb-8">
        Send me your commission request, and I&apos;ll get back to you promptly.
      </p>
      <ContactMeForm />
    </section>
  );
};

export default Contact;
