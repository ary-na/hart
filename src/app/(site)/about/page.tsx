import Link from "next/link";

export const metadata = {
  title: "About me",
};

const About = () => {
  return (
    <>
      <section className="mx-auto w-full max-w-2xl px-4 py-16 md:py-24">
        <article className="h-reveal">
          <h1 className="text-3xl leading-snug md:text-4xl">About me</h1>
          <p className="mt-8 text-base leading-8 opacity-80 md:text-lg">
            I’m Hilda, from Bandung, Indonesia. I’ve been painting since I was
            little, starting with tiny animals in the margins of my notebooks. I
            only paint animals, because I love them, their honesty, and the
            quiet way they show up in a room. These days I work slowly, layer by
            layer, so each piece feels calm enough to hang somewhere you
            actually spend time.
          </p>
          <p className="mt-6 text-base leading-8 opacity-80 md:text-lg">
            I still start the same way I did as a child: a small animal, a
            feeling, a bit of quiet. I love their honesty, the way they don’t
            pretend, and how a portrait can make a room feel softer without
            asking for attention. I build colour slowly, then add only the
            detail that serves the mood.
          </p>
          <p className="mt-6 text-base leading-8 opacity-80 md:text-lg">
            I paint because it lets me tell the truth gently. Animals keep me
            grounded, and colour helps me translate feelings that are too big
            to name. I want each animal portrait to be lived with, not just
            looked at once.
          </p>
        </article>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 pb-20 md:pb-28">
        <article className="h-invite h-reveal px-8 py-12 text-center md:px-14 md:py-16">
          <h2 className="text-2xl md:text-3xl">See the animal portraits</h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed opacity-80">
            Take a quiet look through the gallery, or tell me about an animal
            you’d like me to paint.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/gallery" className="btn btn-primary">
              Explore the gallery
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Start a commission
            </Link>
          </div>
        </article>
      </section>
    </>
  );
};

export default About;
