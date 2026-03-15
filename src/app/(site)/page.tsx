// src/app/page.tsx

import Link from "next/link";

const Home = () => {
  return (
    <>
      {/* Hero section */}
      <section className="relative overflow-hidden my-10">
        <div
          aria-hidden
          className="absolute inset-0 ,transparent_60%),radial-gradient(circle_at_bottom_right,rgba(191,219,254,0.45),transparent_55%),linear-gradient(135deg,#fff7ed,rgba(255,255,255,0.95))]"
        />
        <div className="relative h-container grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex h-full flex-col gap-15">
            <div className="space-y-6 h-reveal">
              <p
                className="text-sm uppercase tracking-[0.4em] opacity-70 h-reveal"
                style={{ ["--reveal-delay" as never]: "80ms" }}
              >
                Hilda loves Art Studio
              </p>
              <h1
                className="h-reveal"
                style={{ ["--reveal-delay" as never]: "140ms" }}
              >
                Art that holds emotion and tells quiet stories.
              </h1>
            </div>
            <p
              className="text-lg opacity-80 max-w-xl h-reveal"
              style={{ ["--reveal-delay" as never]: "220ms" }}
            >
              Original paintings and soulful commissions inspired by animals,
              memory, and the simple beauty of being human.
            </p>
            <div
              className="mt-auto flex flex-wrap gap-4 h-reveal"
              style={{ ["--reveal-delay" as never]: "280ms" }}
            >
              <Link href="/gallery" className="btn btn-primary">
                Explore the gallery
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Commission a piece
              </Link>
            </div>

            <div
              className="grid grid-cols-2 gap-4 text-sm h-reveal"
              style={{ ["--reveal-delay" as never]: "320ms" }}
            >
              <div className="rounded-xl border border-base-300 bg-base-100/80 p-4">
                <p className="text-2xl font-semibold">80+</p>
                <p className="opacity-70">Original works created</p>
              </div>
              <div className="rounded-xl border border-base-300 bg-base-100/80 p-4">
                <p className="text-2xl font-semibold">5+ years</p>
                <p className="opacity-70">Painting & commissions</p>
              </div>
            </div>
          </div>

          <div
            className="relative lg:max-w-sm lg:ms-auto lg:mt-auto h-reveal"
            style={{ ["--reveal-delay" as never]: "200ms" }}
          >
            <div className="space-y-6">
              <Link
                href="/gallery"
                className="block aspect-4/5 w-full overflow-hidden border border-base-300 bg-base-100 shadow-2xl h-animate-float transition-transform duration-600 ease-out will-change-transform hover:-rotate-2 hover:scale-[1.03]"
              >
                <div className="h-full w-full bg-[linear-gradient(135deg,#1f2937,#111827)]" />
              </Link>
              <p className="text-center text-sm font-medium opacity-80">
                Featured canvas
              </p>
              <div
                className="grid gap-3 h-reveal"
                style={{ ["--reveal-delay" as never]: "280ms" }}
              >
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
      <section className="h-container py-20 my-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="h-reveal min-w-0">
            <p className="text-sm uppercase tracking-[0.35em] opacity-60 wrap-break-word">
              Signature Themes
            </p>
            <h2 className="mt-3">What the work leans toward</h2>
          </div>
          <p
            className="max-w-xl text-sm opacity-70 h-reveal"
            style={{ ["--reveal-delay" as never]: "120ms" }}
          >
            Hilda’s paintings are grounded in softness, honesty, and the quiet
            strength of animals.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
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
          ].map((theme, index) => (
            <div
              key={theme.title}
              className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm h-reveal min-w-0"
              style={{
                ["--reveal-delay" as never]: `${index * 90 + 80}ms`,
              }}
            >
              <h3 className="text-lg font-semibold wrap-break-word">
                {theme.title}
              </h3>
              <p className="mt-3 text-sm opacity-70 wrap-break-word">
                {theme.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured works */}
      <section className="h-container py-20 my-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="h-reveal">
            <p className="text-sm uppercase tracking-[0.35em] opacity-60">
              Featured
            </p>
            <h2 className="mt-3">A few recent pieces</h2>
          </div>
          <Link
            href="/gallery"
            className="btn btn-ghost h-reveal"
            style={{ ["--reveal-delay" as never]: "120ms" }}
          >
            View full gallery
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {[1, 2, 3].map((i, index) => (
            <div
              key={i}
              className="h-reveal"
              style={{
                ["--reveal-delay" as never]: `${index * 90 + 80}ms`,
              }}
            >
              <Link
                href="/gallery"
                className="group block overflow-hidden border border-base-300 bg-base-100 shadow-xl transition-transform duration-500 ease-out will-change-transform hover:-rotate-1 hover:scale-[1.01]"
              >
                <div className="aspect-video bg-base-200 transition-transform duration-500 ease-out group-hover:scale-[1.02]" />
              </Link>
              <p className="mt-3 text-center text-sm font-medium opacity-80">
                Artwork {i}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About section */}
      <section className="h-container py-20 my-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="h-reveal">
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
          <div
            className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm h-reveal"
            style={{ ["--reveal-delay" as never]: "140ms" }}
          >
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
      <section className="h-container py-20 my-10">
        <div className="rounded-3xl border border-base-300 bg-base-100 p-8 md:p-10 shadow-sm">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="h-reveal min-w-0">
              <p className="text-sm uppercase tracking-[0.35em] opacity-60 wrap-break-word">
                Commission Process
              </p>
              <h2 className="mt-3">From idea to finished piece</h2>
            </div>
            <Link
              href="/contact"
              className="btn btn-primary h-reveal"
              style={{ ["--reveal-delay" as never]: "120ms" }}
            >
              Start a commission
            </Link>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
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
            ].map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-base-300 bg-base-50 p-6 h-reveal min-w-0"
                style={{
                  ["--reveal-delay" as never]: `${index * 90 + 80}ms`,
                }}
              >
                <h3 className="text-base font-semibold wrap-break-word">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm opacity-70 wrap-break-word">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="bg-accent my-10 py-20">
        <div className="h-container max-w-4xl mx-auto py-20 h-reveal">
          <h2 className="mb-4">What People Say</h2>
          <p className="text-end">
            Testimonials coming soon — stay tuned to hear what clients love
            about Hart!
          </p>
        </div>
      </section>

      {/* CTA section */}
      <section className="h-container py-20 my-10">
        <div className="rounded-3xl bg-base-100 border border-base-300 p-10 text-center shadow-sm h-reveal">
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
