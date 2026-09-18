import Link from "next/link";

export const metadata = {
  title: "About me",
};

const About = () => {
  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <article className="h-reveal max-w-xl">
            <h1 className="h-heading-rose text-3xl leading-snug md:text-4xl">
              About me
            </h1>
            <p className="mt-8 text-base leading-8 opacity-80 md:text-lg">
              I’m Hilda. I’m from Bandung, Indonesia, and my studio is in
              Melbourne, Australia. I’ve been painting since I was little,
              starting with tiny animals in the margins of my notebooks.
              Painting was my safe place when things felt hard. A way to say
              what I couldn’t put into words.
            </p>
            <p className="mt-6 text-base leading-8 opacity-80 md:text-lg">
              I only paint animals. I love their honesty, and the quiet way they
              sit with you in a room. I work slowly, layer by layer, until a
              piece feels calm enough to hang somewhere you actually spend time.
            </p>
            <p className="mt-6 text-base leading-8 opacity-80 md:text-lg">
              I still start the same way I did as a child: a small animal, a
              feeling, a bit of quiet. I add only the detail that serves the
              mood. I want each animal portrait to be lived with, not just
              looked at once.
            </p>
          </article>
          <aside
            className="h-studio-card flex h-full min-h-[18rem] flex-col justify-center h-reveal"
            style={{ ["--reveal-delay" as never]: "90ms" }}
          >
            <p className="h-kicker">Studio</p>
            <ul className="mt-8 list-none space-y-5 pl-0 text-base leading-relaxed md:text-lg">
              <li>From Bandung, Indonesia</li>
              <li>Studio in Melbourne, Australia</li>
              <li>Animals only</li>
              <li>Painted slow, layer by layer</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 pb-20 md:pb-28">
        <article className="h-invite h-reveal px-8 py-12 text-center md:px-14 md:py-16">
          <h2 className="text-2xl md:text-3xl">See the animal portraits</h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed opacity-80">
            Take a quiet look through the gallery, or tell me about an animal
            you’d like me to paint.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/gallery" className="btn btn-primary rounded-full px-6">
              Explore the gallery
            </Link>
            <Link href="/contact" className="btn btn-ghost rounded-full px-6">
              Start a commission
            </Link>
          </div>
        </article>
      </section>
    </>
  );
};

export default About;
