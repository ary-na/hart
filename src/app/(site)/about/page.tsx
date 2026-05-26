// src/app/about/page.tsx

import Link from "next/link";

export const metadata = {
  title: "About the Artist",
};

const About = () => {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_80%_0%,rgba(255,220,170,0.3),transparent),radial-gradient(ellipse_40%_40%_at_10%_100%,rgba(255,200,168,0.18),transparent)]"
        />
        <div className="relative h-container py-24">
          <div className="max-w-2xl h-reveal">
            <p className="text-xs uppercase tracking-[0.45em] opacity-50">
              About the Artist
            </p>
            <h1 className="mt-4 leading-tight">Hilda&apos;s Story</h1>
            <p
              className="mt-6 text-lg leading-relaxed opacity-70 h-reveal"
              style={{ ["--reveal-delay" as never]: "120ms" }}
            >
              Hilda paints with her whole heart. Every piece is a conversation
              between memory, emotion, and the quiet power of everyday life.
            </p>
          </div>
        </div>
      </section>

      {/* ── Story ────────────────────────────────────────── */}
      <section
        style={{ background: "linear-gradient(180deg, #f6f1e8 0%, #ecdfd2 100%)" }}
      >
        <div className="h-container py-20">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">

            {/* Paragraphs */}
            <article
              className="space-y-6 text-base leading-8 text-stone-700 h-reveal"
            >
              <p>
                Hilda began drawing as a child, filling the margins of school
                notebooks with tiny animals and soft, curious faces. Painting
                became her safe place during hard seasons — a way to translate
                what words couldn&apos;t hold. Over time, those small sketches
                turned into larger, more expressive works that capture
                tenderness, strength, and stillness.
              </p>
              <p>
                She is especially drawn to animals: their honesty, their
                resilience, and the way they communicate without pretense.
                Hilda paints them with a deep respect for their spirit, often
                choosing warm palettes and gentle textures that feel like a
                quiet embrace.
              </p>
              <p>
                Each painting is created slowly and intentionally. She starts
                with feeling, builds with colour, and finishes with detail that
                invites you to pause. Her work is meant to be lived with — art
                that brings softness to a room and reminds us to stay close to
                what we feel.
              </p>
            </article>

            {/* Quote + loves */}
            <div
              className="flex flex-col gap-6 h-reveal"
              style={{ ["--reveal-delay" as never]: "120ms" }}
            >
              {/* Pull quote */}
              <div className="relative rounded-2xl border border-stone-300/70 bg-white/60 p-7 shadow-sm backdrop-blur-sm">
                <div className="absolute -top-3 left-7">
                  <span className="rounded-full border border-stone-300 bg-white px-3 py-0.5 text-xs uppercase tracking-[0.35em] text-stone-500 shadow-sm">
                    In Her Words
                  </span>
                </div>
                <svg
                  aria-hidden
                  viewBox="0 0 32 32"
                  fill="none"
                  className="mb-3 h-7 w-7 text-stone-300"
                >
                  <path
                    d="M9.333 20C7.493 20 6 18.507 6 16.667v-2C6 10.82 8.82 8 12.667 8h.666v2.667h-.666C10.716 10.667 9.333 12.05 9.333 13.8v.2H12A2.667 2.667 0 0 1 12 20H9.333zm12 0c-1.84 0-3.333-1.493-3.333-3.333v-2C18 10.82 20.82 8 24.667 8h.666v2.667h-.666c-1.951 0-3.334 1.383-3.334 3.133v.2H24A2.667 2.667 0 0 1 24 20h-2.667z"
                    fill="currentColor"
                  />
                </svg>
                <p className="text-base leading-relaxed text-stone-700">
                  I paint because it lets me tell the truth gently. Animals keep
                  me grounded, and colour helps me translate emotions that are
                  too big to name.
                </p>
              </div>

              {/* What she loves */}
              <div className="rounded-2xl border border-stone-300/70 bg-white/60 p-7 shadow-sm backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.4em] text-stone-400">
                  What She Loves
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Painting animals with soul",
                    "Soft textures and warm palettes",
                    "Colour as emotional language",
                    "Art that feels lived-in and honest",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-stone-600">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-stone-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────── */}
      <section className="h-container py-20">
        <div className="mb-10 h-reveal">
          <p className="text-xs uppercase tracking-[0.45em] opacity-50">
            The Work
          </p>
          <h2 className="mt-3">How every piece is made</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              num: "01",
              title: "Feeling first",
              text: "Every painting starts with an emotion, not a plan. Hilda lets the feeling guide the first marks.",
            },
            {
              num: "02",
              title: "Colour by colour",
              text: "Warm layers are built up slowly, each one adding depth and warmth to the surface.",
            },
            {
              num: "03",
              title: "Honest detail",
              text: "Fine detail is added last, only what serves the mood — nothing decorative for its own sake.",
            },
            {
              num: "04",
              title: "Meant to last",
              text: "Each piece is sealed and finished with care so it can be lived with for generations.",
            },
          ].map((step, i) => (
            <div
              key={step.num}
              className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm h-reveal"
              style={{ ["--reveal-delay" as never]: `${i * 80 + 60}ms` }}
            >
              <span className="text-3xl font-bold tracking-tighter opacity-10 select-none">
                {step.num}
              </span>
              <h3 className="mt-3 text-sm font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-60">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="h-container pb-24">
        <div
          className="relative overflow-hidden rounded-3xl p-10 md:p-14 text-center h-reveal"
          style={{ background: "linear-gradient(135deg, #f6f1e8 0%, #ecdfd2 50%, #e4d5c4 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(120,90,60,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.45em] text-stone-500 mb-4">
              Ready to find your piece?
            </p>
            <h2 className="text-stone-800">See the gallery</h2>
            <p className="mt-4 text-base leading-relaxed text-stone-600 max-w-sm mx-auto">
              Browse original works or reach out to commission something made
              just for you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/gallery" className="btn btn-primary shadow-md">
                Browse gallery
              </Link>
              <Link
                href="/contact"
                className="btn btn-ghost border border-stone-400 text-stone-700 hover:bg-stone-200"
              >
                Start a commission
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
