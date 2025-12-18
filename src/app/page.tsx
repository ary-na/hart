// src/app/page.tsx

const Home = () => {
  return (
    <>
      <section className="text-center my-auto">
        <h1 id="hero">ART made with LOVE</h1>
        <p>
          I create original artwork and custom commissions inspired by emotion,
          story, and care.
        </p>
      </section>

      <section id="gallery">
        <h2>Recent work</h2>
      </section>

      <section className="container max-w-4xl mx-auto p-10 text-accent-content">
        <h2>My Name is Hilda</h2>
        <p className="text-gray-700 text-end italic mb-6">
          I’ve always loved art — it’s how I see the world and share stories.
            This little corner is where I create and connect with people who
            appreciate honest, heartfelt art. Whether you’re here to explore or
            looking to commission something special, I’m excited to bring your
            ideas to life. Thanks for stopping by and sharing this journey with
            me.
        </p>
        <a
          href="/about"
          className="text-teal-600 text-end link"
        >
          Read more about the story
        </a>
      </section>

      <section id="commissions">
        <h2>Contact me</h2>
      </section>

      <section id="why-me">
        <h2>why me</h2>
      </section>

      <section id="testimonials" className="p-10 bg-gray-50">
        <div className="container max-w-4xl mx-auto p-10 text-accent-content">
          <h2 className="mb-4">What People Say</h2>
          <p className="text-end">
            Testimonials coming soon — stay tuned to hear what clients love
            about Hart!
          </p>
        </div>
      </section>

      <section id="cta">
        <h2>call to action</h2>
      </section>
    </>
  );
};

export default Home;
