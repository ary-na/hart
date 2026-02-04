// src/app/about/page.tsx

export const metadata = {
  title: "About the Artist",
};

const About = () => {
  return (
    <section className="py-12">
      <header className="h-container">
        <p className="text-sm uppercase tracking-[0.35em] opacity-60">
          About the Artist
        </p>
        <h1 className="mt-3">Hilda&apos;s Story</h1>
        <p className="mt-4 max-w-2xl text-lg opacity-80">
          Hilda paints with her whole heart. Every piece is a conversation
          between memory, emotion, and the quiet power of everyday life.
        </p>
      </header>

      <div className="mt-10 bg-accent/15">
        <div className="h-container grid gap-8 py-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-5 text-base leading-relaxed">
            <p>
              Hilda began drawing as a child, filling the margins of school
              notebooks with tiny animals and soft, curious faces. Painting
              became her safe place during hard seasons, a way to translate what
              words couldn&apos;t hold. Over time, those small sketches turned
              into larger, more expressive works that capture tenderness,
              strength, and stillness.
            </p>
            <p>
              She is especially drawn to animals — their honesty, their
              resilience, and the way they communicate without pretense. Hilda
              paints them with a deep respect for their spirit, often choosing
              warm palettes and gentle textures that feel like a quiet
              embrace.
            </p>
            <p>
              Each painting is created slowly and intentionally. She starts
              with feeling, builds with color, and finishes with detail that
              invites you to pause. Her work is meant to be lived with — art
              that brings softness to a room and reminds us to stay close to
              what we feel.
            </p>
          </div>

          <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] opacity-60">
              In Her Words
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              “I paint because it lets me tell the truth gently. Animals keep
              me grounded, and color helps me translate emotions that are too
              big to name.”
            </p>
            <div className="mt-6 h-px w-full bg-base-300" />
            <p className="mt-6 text-sm uppercase tracking-[0.3em] opacity-60">
              What She Loves
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="badge badge-outline">Painting animals</span>
              <span className="badge badge-outline">Soft textures</span>
              <span className="badge badge-outline">Warm color stories</span>
              <span className="badge badge-outline">Emotional honesty</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
