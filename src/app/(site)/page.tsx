// src/app/page.tsx

import Link from "next/link";

const Home = () => {
  return (
    <>
      {/* Hero section */}
      <section className="relative overflow-hidden text-center my-auto">
        <div aria-hidden className="absolute inset-0 bg-base-200" />
        <div className="relative container mx-auto max-w-4xl px-6 py-32">
          <h1>ART made with LOVE</h1>
          <p className="italic">
            I create original artwork and custom commissions inspired by
            emotion, story, and care.
          </p>
          <Link href="/gallery" className="btn btn-ghost">
            See my work
          </Link>
        </div>
      </section>

      {/* Recent work section */}
      <section
        aria-labelledby="recent-work"
        className="container mx-auto max-w-4xl px-6 py-20"
      >
        <h2 id="recent-work" className="sr-only">
          Recent work
        </h2>

        <p className="mb-8 text-center text-lg opacity-80">
          A few pieces I’ve loved creating
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 rounded-lg bg-gray-300 flex items-center justify-center text-gray-500 select-none cursor-default"
            >
              <span>Artwork {i} (placeholder)</span>
            </div>
          ))}
        </div>
      </section>

      {/* About section */}
      <section className="container max-w-4xl mx-auto p-10">
        <h2 className="mb-4 text-accent-content">My name is Hilda</h2>

        <p className="mb-6 italic leading-relaxed">
          Art has always been my way of understanding the world and sharing
          stories from the heart. This space is where those ideas come to life
          and where I connect with people who value meaningful, honest art.
          Whether you&apos;re browsing or dreaming up something special,
          I&apos;m thankful you found your way here. It truly means a lot to
          share this journey with you.
        </p>
        <div className="block text-end">
          <a
            href="/about"
            className="italic link no-underline hover:underline text-accent"
          >
            Read more →
          </a>
        </div>
      </section>

      {/* Commission section */}
      <section className="hidden">
        <h2>Contact me</h2>
      </section>

      {/* Why me section */}
      <section className="hidden">
        <h2>why me</h2>
      </section>

      {/* Testimonials section */}
      <section className="bg-accent">
        <div className="container max-w-4xl mx-auto p-10">
          <h2 className="mb-4">What People Say</h2>
          <p className="text-end">
            Testimonials coming soon — stay tuned to hear what clients love
            about Hart!
          </p>
        </div>
      </section>

      {/* CTA  section */}
      <section className="hidden">
        <h2>call to action</h2>
      </section>
    </>
  );
};

export default Home;
