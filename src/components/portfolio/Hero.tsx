import fallbackHero from "@/assets/hero-ava.jpg";

interface HeroProps {
  data?: {
    name?: string;
    tagline?: string;
    image_url?: string;
  };
}

const Hero = ({ data }: HeroProps) => {
  const name = data?.name || "Manjeet Kumar — Photographer Cinematographer";
  const tagline =
    data?.tagline ||
    "Capturing timeless stories in weddings, portraits, nature, and events.";
  const imageUrl = data?.image_url || fallbackHero;

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="container flex flex-col items-center gap-8 py-16 md:flex-row md:py-24">
        <div className="order-2 w-full md:order-1 md:w-1/2">
          <h1 className="font-playfair text-4xl leading-tight md:text-5xl">
            {name}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground animate-fade-in">
            {tagline}
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="#portfolio"
              className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-primary-foreground shadow-md transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-ring"
            >
              View Portfolio
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-md border px-5 py-2.5 transition-colors hover:bg-accent"
            >
              Contact Me
            </a>
          </div>
        </div>
        <div className="order-1 w-full md:order-2 md:w-1/2">
          <img
            src={imageUrl}
            alt={`Hero image for ${name}`}
            className="mx-auto aspect-video w-full max-w-xl rounded-lg object-cover shadow-xl"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
