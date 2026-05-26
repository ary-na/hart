// src/app/page.tsx

import Image from "next/image";
import Link from "next/link";
import { connectToDatabase } from "@hart/server/db/mongodb";
import { Drawing } from "@hart/server/models";
import { getPresignedUrl } from "@hart/server/upload";

export const dynamic = "force-dynamic";

const PaperOverlay = () => (
  <>
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-soft-light bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.24)_0px,rgba(255,255,255,0.24)_1px,transparent_1px,transparent_4px),repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0px,rgba(255,255,255,0.12)_1px,transparent_1px,transparent_6px)]" />
    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent_18%,transparent_82%,rgba(0,0,0,0.1)),linear-gradient(90deg,rgba(255,255,255,0.06),transparent_10%,transparent_90%,rgba(0,0,0,0.08))]" />
    <div aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(120,95,68,0.16),inset_0_16px_24px_rgba(255,255,255,0.08),inset_0_-14px_20px_rgba(0,0,0,0.07)]" />
  </>
);

const Home = async () => {
  await connectToDatabase();

  const latestDrawings = await Drawing.find({})
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();

  const showcaseDrawings = await Promise.all(
    latestDrawings.map(async (drawing) => ({
      _id: drawing._id.toString(),
      title: drawing.title,
      description: drawing.description,
      thumbnailUrl: await getPresignedUrl(drawing.thumbnailName),
      fileUrl: await getPresignedUrl(drawing.fileName),
    }))
  );

  const heroDrawing = showcaseDrawings[0] ?? null;
  const featuredDrawings = showcaseDrawings.slice(1, 4);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Warm radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_0%,rgba(255,220,170,0.35),transparent),radial-gradient(ellipse_50%_50%_at_20%_100%,rgba(255,200,168,0.2),transparent)]"
        />

        <div className="relative h-container grid gap-12 py-24 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left column */}
          <div className="flex h-full flex-col gap-10">
            <div className="space-y-5">
              <p
                className="text-xs uppercase tracking-[0.45em] opacity-50 h-reveal"
                style={{ ["--reveal-delay" as never]: "60ms" }}
              >
                Hilda loves Art Studio
              </p>
              <h1
                className="h-reveal leading-tight"
                style={{ ["--reveal-delay" as never]: "120ms" }}
              >
                Art that holds emotion and tells quiet stories.
              </h1>
            </div>

            <p
              className="text-lg opacity-75 max-w-lg leading-relaxed h-reveal"
              style={{ ["--reveal-delay" as never]: "200ms" }}
            >
              Original paintings and soulful commissions inspired by animals,
              memory, and the simple beauty of being human.
            </p>

            <div
              className="flex flex-wrap gap-3 h-reveal"
              style={{ ["--reveal-delay" as never]: "260ms" }}
            >
              <Link href="/gallery" className="btn btn-primary">
                Explore the gallery
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Commission a piece
              </Link>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-2 gap-4 h-reveal"
              style={{ ["--reveal-delay" as never]: "320ms" }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-base-300 bg-base-100/80 p-5">
                <div className="absolute top-0 left-0 h-0.5 w-12 bg-primary rounded-full" />
                <p className="text-3xl font-bold tracking-tight">80+</p>
                <p className="mt-1 text-sm opacity-60">Original works created</p>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-base-300 bg-base-100/80 p-5">
                <div className="absolute top-0 left-0 h-0.5 w-12 bg-accent rounded-full" />
                <p className="text-3xl font-bold tracking-tight">5+ yrs</p>
                <p className="mt-1 text-sm opacity-60">Painting & commissions</p>
              </div>
            </div>
          </div>

          {/* Right column – hero artwork */}
          <div
            className="relative lg:max-w-sm lg:ms-auto lg:mt-auto h-reveal"
            style={{ ["--reveal-delay" as never]: "180ms" }}
          >
            <div className="space-y-5">
              <Link
                href={heroDrawing ? `/gallery?drawing=${heroDrawing._id}` : "/gallery"}
                className="group block aspect-[4/5] w-full overflow-hidden border border-stone-300 bg-[#f6f1e8] shadow-[0_24px_50px_rgba(43,33,24,0.22),0_6px_18px_rgba(43,33,24,0.12)] h-animate-float transition-all duration-500 ease-out will-change-transform hover:-rotate-2 hover:scale-[1.03]"
              >
                <div className="relative h-full w-full">
                  {heroDrawing ? (
                    <Image
                      src={heroDrawing.fileUrl}
                      alt={heroDrawing.title}
                      width={800}
                      height={1000}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="h-full w-full bg-[linear-gradient(135deg,#e8ddd0,#d4c5b0)]" />
                  )}
                  <PaperOverlay />
                </div>
              </Link>

              <p className="text-center text-sm font-medium opacity-70">
                {heroDrawing?.title ?? "Featured canvas"}
              </p>

              {/* Studio quote */}
              <div className="rounded-2xl border border-base-300 bg-base-100/70 p-5 space-y-3 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.35em] opacity-50">
                  Studio Notes
                </p>
                <p className="text-sm leading-relaxed opacity-80">
                  "I paint to make room for tenderness. Each piece is a small
                  promise to feel deeply and live honestly."
                </p>
                <Link href="/about" className="text-sm link link-accent">
                  Meet Hilda →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Signature themes ─────────────────────────────── */}
      <section className="h-container py-20">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div className="h-reveal">
            <p className="text-xs uppercase tracking-[0.4em] opacity-50">
              Signature Themes
            </p>
            <h2 className="mt-3">What the work leans toward</h2>
          </div>
          <p
            className="max-w-sm text-sm opacity-65 h-reveal"
            style={{ ["--reveal-delay" as never]: "100ms" }}
          >
            Hilda's paintings are grounded in softness, honesty, and the quiet
            strength of animals.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {
              icon: (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" />
                  <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" />
                </svg>
              ),
              title: "Animal portraits",
              text: "Gentle, soulful studies that highlight character and warmth.",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              ),
              title: "Emotional storytelling",
              text: "Pieces that translate memory into color and texture.",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                  <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                </svg>
              ),
              title: "Warm palettes",
              text: "Earthy tones and soft light that feel lived-in and calming.",
            },
          ].map((theme, index) => (
            <div
              key={theme.title}
              className="group rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition-shadow hover:shadow-md h-reveal"
              style={{ ["--reveal-delay" as never]: `${index * 80 + 60}ms` }}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-base-200 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                {theme.icon}
              </div>
              <h3 className="text-lg font-semibold">{theme.title}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-65">{theme.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured works ───────────────────────────────── */}
      <section className="h-container py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div className="h-reveal">
            <p className="text-xs uppercase tracking-[0.4em] opacity-50">Featured</p>
            <h2 className="mt-3">A few recent pieces</h2>
          </div>
          <Link
            href="/gallery"
            className="btn btn-ghost btn-sm h-reveal"
            style={{ ["--reveal-delay" as never]: "100ms" }}
          >
            View full gallery →
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {(featuredDrawings.length > 0
            ? featuredDrawings
            : Array.from({ length: 3 }, (_, i) => ({
                _id: `placeholder-${i}`,
                title: `Artwork ${i + 1}`,
                thumbnailUrl: "",
                fileUrl: "",
              }))
          ).map((drawing, index) => (
            <div
              key={drawing._id}
              className="h-reveal"
              style={{ ["--reveal-delay" as never]: `${index * 80 + 60}ms` }}
            >
              <Link
                href={
                  "thumbnailUrl" in drawing && drawing.thumbnailUrl
                    ? `/gallery?drawing=${drawing._id}`
                    : "/gallery"
                }
                className="group block overflow-hidden border border-stone-300 bg-[#f6f1e8] shadow-[0_18px_35px_rgba(43,33,24,0.15),0_4px_12px_rgba(43,33,24,0.08)] transition-all duration-500 ease-out will-change-transform hover:-rotate-1 hover:scale-[1.015] hover:shadow-[0_24px_48px_rgba(43,33,24,0.22)]"
              >
                <div className="relative">
                  {drawing.thumbnailUrl ? (
                    <Image
                      src={drawing.fileUrl}
                      alt={drawing.title}
                      width={1200}
                      height={1500}
                      className="aspect-[4/5] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      unoptimized
                    />
                  ) : (
                    <div className="aspect-[4/5] bg-[linear-gradient(135deg,#e8ddd0,#d4c5b0)]" />
                  )}
                  <PaperOverlay />
                </div>
              </Link>
              <p className="mt-3 text-center text-sm font-medium opacity-70">
                {drawing.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ────────────────────────────────────────── */}
      <section className="h-container py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:gap-14">
          <div className="h-reveal">
            <p className="text-xs uppercase tracking-[0.4em] opacity-50">About Hilda</p>
            <h2 className="mt-3">The artist behind H♡ART</h2>
            <p className="mt-5 text-lg leading-relaxed opacity-75">
              Hilda paints with empathy. Her work celebrates vulnerability,
              connection, and the quiet resilience of animals. Every piece is
              built slowly, layer by layer, until it feels honest.
            </p>
            <Link href="/about" className="btn btn-ghost mt-6 px-0 hover:px-0 underline-offset-4">
              Read the full story →
            </Link>
          </div>

          <div
            className="h-reveal"
            style={{ ["--reveal-delay" as never]: "120ms" }}
          >
            <div className="rounded-2xl border border-base-300 bg-base-100 p-7 shadow-sm h-full">
              <p className="text-xs uppercase tracking-[0.4em] opacity-50 mb-5">
                Studio Values
              </p>
              <ul className="space-y-4">
                {[
                  "Made by hand with patience and care.",
                  "Inspired by animals, memory, and home.",
                  "Art that feels personal and alive.",
                ].map((value) => (
                  <li key={value} className="flex items-start gap-3 text-sm leading-relaxed opacity-75">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Commission process ───────────────────────────── */}
      <section className="h-container py-20">
        <div className="rounded-3xl border border-base-300 bg-base-100 p-8 md:p-12 shadow-sm">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div className="h-reveal">
              <p className="text-xs uppercase tracking-[0.4em] opacity-50">
                Commission Process
              </p>
              <h2 className="mt-3">From idea to finished piece</h2>
            </div>
            <Link
              href="/contact"
              className="btn btn-primary h-reveal"
              style={{ ["--reveal-delay" as never]: "100ms" }}
            >
              Start a commission
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                step: "01",
                title: "Share your story",
                text: "Tell Hilda about the subject, the mood, and the size you have in mind.",
              },
              {
                step: "02",
                title: "Design & approval",
                text: "You'll receive a direction sketch and palette notes to review.",
              },
              {
                step: "03",
                title: "Painting & delivery",
                text: "The piece is painted, sealed, and carefully prepared for you.",
              },
            ].map((step, index) => (
              <div
                key={step.step}
                className="relative rounded-2xl border border-base-300 bg-base-50 p-6 h-reveal"
                style={{ ["--reveal-delay" as never]: `${index * 80 + 60}ms` }}
              >
                <span className="text-4xl font-bold tracking-tighter opacity-10 select-none">
                  {step.step}
                </span>
                <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-65">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Follow the studio ────────────────────────────── */}
      <section className="h-container py-10">
        <div className="rounded-3xl border border-base-300 bg-base-100 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Text */}
            <div className="flex flex-col justify-center p-8 md:p-12 h-reveal">
              <p className="text-xs uppercase tracking-[0.4em] opacity-50">
                Follow the Studio
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl">
                Stay close to the work
              </h2>
              <p className="mt-4 text-base leading-relaxed opacity-70">
                Follow along on Instagram and TikTok for glimpses behind the
                canvas — works in progress, new pieces, and quiet moments from
                the studio.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://www.instagram.com/hart_hilda_art"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm gap-2"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                  </svg>
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@hildaokara_art"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm gap-2"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.82a8.18 8.18 0 0 0 4.78 1.52V6.9a4.85 4.85 0 0 1-1.01-.21z" />
                  </svg>
                  TikTok
                </a>
              </div>
            </div>

            {/* Decorative panel */}
            <div className="relative hidden lg:flex items-center justify-center bg-[linear-gradient(135deg,#f6f1e8,#e8ddd0)] min-h-64">
              <div className="relative flex gap-3 rotate-[-4deg]">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-40 w-28 rounded-lg border border-stone-300 bg-[#f6f1e8] shadow-md"
                    style={{ transform: `rotate(${(i - 1) * 6}deg) translateY(${i === 1 ? -8 : 0}px)` }}
                  />
                ))}
              </div>
              <p className="absolute bottom-6 text-xs text-stone-400 tracking-widest uppercase">
                @hart_hilda_art
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="h-container py-20">
        <div
          className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center h-reveal"
          style={{ background: "linear-gradient(135deg, #f6f1e8 0%, #ecdfd2 50%, #e4d5c4 100%)" }}
        >
          {/* Background dots */}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(120,90,60,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="relative">
            <p className="text-xs uppercase tracking-[0.4em] opacity-50 mb-4">
              Ready?
            </p>
            <h2 className="text-stone-800">Bring a little art home</h2>
            <p className="mt-4 text-lg opacity-70 text-stone-700 max-w-md mx-auto leading-relaxed">
              Browse the gallery or commission a piece that holds your story.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/gallery" className="btn btn-primary shadow-lg">
                Browse gallery
              </Link>
              <Link href="/contact" className="btn btn-ghost border border-stone-400 text-stone-700 hover:bg-stone-200">
                Start a commission
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
