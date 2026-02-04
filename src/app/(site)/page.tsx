// src/app/page.tsx

import Link from "next/link";

const Home = () => {
  return (
    <>
      {/* Hero section */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(238,226,203,0.7),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(191,219,254,0.45),transparent_55%),linear-gradient(135deg,#fff7ed,rgba(255,255,255,0.95))]"
        />
        <div className="relative h-container grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] opacity-70">
              Hilda Okara Studio
            </p>
            <h1>Art that holds emotion and tells quiet stories.</h1>
            <p className="text-lg opacity-80 max-w-xl">
              Original paintings and soulful commissions inspired by animals,
              memory, and the simple beauty of being human.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/gallery" className="btn btn-primary">
                Explore the gallery
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Commission a piece
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl border border-base-300 bg-base-100/80 p-4">
                <p className="text-2xl font-semibold">120+</p>
                <p className="opacity-70">Original works created</p>
              </div>
              <div className="rounded-xl border border-base-300 bg-base-100/80 p-4">
                <p className="text-2xl font-semibold">10+ yrs</p>
                <p className="opacity-70">Painting & commissions</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -rotate-2 rounded-[32px] bg-accent/30 shadow-xl" />
            <div className="relative rounded-[32px] border border-base-300 bg-base-100 p-6 shadow-2xl">
              <div className="aspect-[4/5] w-full rounded-3xl bg-[linear-gradient(135deg,#1f2937,#111827)]" />
              <div className="mt-6 grid gap-3">
                <p className="text-sm uppercase tracking-[0.35em] opacity-60">
                  Studio Notes
                </p>
                <p className="text-base opacity-80">
                  “I paint to make room for tenderness. Each piece is a small
                  promise to feel deeply and live honestly.”
                </p>
                <Link href="/about" className="text-sm link link-accent">
                  Meet Hilda →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature themes */}
      <section className="h-container py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] opacity-60">
              Signature Themes
            </p>
            <h2 className="mt-3">What the work leans toward</h2>
          </div>
          <p className="max-w-xl text-sm opacity-70">
            Hilda’s paintings are grounded in softness, honesty, and the quiet
            strength of animals.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Animal portraits",
              text: "Gentle, soulful studies that highlight character and warmth.",
            },
            {
              title: "Emotional storytelling",
              text: "Pieces that translate memory into color and texture.",
            },
            {
              title: "Warm palettes",
              text: "Earthy tones and soft light that feel lived-in and calming.",
            },
          ].map((theme) => (
            <div
              key={theme.title}
              className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold">{theme.title}</h3>
              <p className="mt-3 text-sm opacity-70">{theme.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured works */}
      <section className="h-container py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] opacity-60">
              Featured
            </p>
            <h2 className="mt-3">A few recent pieces</h2>
          </div>
          <Link href="/gallery" className="btn btn-ghost">
            View full gallery
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm"
            >
              <div className="aspect-[4/3] bg-base-200" />
              <div className="p-5">
                <h3 className="text-lg font-semibold">Artwork {i}</h3>
                <p className="mt-2 text-sm opacity-70">
                  A quiet study in light, texture, and emotion.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About section */}
      <section className="h-container py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] opacity-60">
              About Hilda
            </p>
            <h2 className="mt-3">The artist behind H♡ART</h2>
            <p className="mt-5 text-lg opacity-80">
              Hilda paints with empathy. Her work celebrates vulnerability,
              connection, and the quiet resilience of animals. Every piece is
              built slowly, layer by layer, until it feels honest.
            </p>
            <Link href="/about" className="btn btn-ghost mt-6">
              Read the full story
            </Link>
          </div>
          <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.35em] opacity-60">
              Studio Values
            </p>
            <div className="mt-4 space-y-4 text-sm opacity-80">
              <p>Made by hand with patience and care.</p>
              <p>Inspired by animals, memory, and home.</p>
              <p>Art that feels personal and alive.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Commission process */}
      <section className="h-container py-16">
        <div className="rounded-3xl border border-base-300 bg-base-100 p-8 md:p-10 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] opacity-60">
                Commission Process
              </p>
              <h2 className="mt-3">From idea to finished piece</h2>
            </div>
            <Link href="/contact" className="btn btn-primary">
              Start a commission
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Share your story",
                text: "Tell Hilda about the subject, the mood, and the size.",
              },
              {
                title: "Design & approval",
                text: "You’ll receive a direction sketch and palette notes.",
              },
              {
                title: "Painting & delivery",
                text: "The piece is painted, sealed, and prepared for you.",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-base-300 bg-base-50 p-6"
              >
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm opacity-70">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="bg-accent">
        <div className="h-container max-w-4xl mx-auto p-10">
          <h2 className="mb-4">What People Say</h2>
          <p className="text-end">
            Testimonials coming soon — stay tuned to hear what clients love
            about Hart!
          </p>
        </div>
      </section>

      {/* CTA section */}
      <section className="h-container py-16">
        <div className="rounded-3xl bg-base-100 border border-base-300 p-10 text-center shadow-sm">
          <h2>Bring a little art home</h2>
          <p className="mt-4 text-lg opacity-80">
            Browse the gallery or commission a piece that holds your story.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/gallery" className="btn btn-primary">
              Browse gallery
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Start a commission
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
