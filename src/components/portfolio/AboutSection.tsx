import fallbackPortrait from "@/assets/about-ava.jpg";

type AboutSectionProps = {
  data?: {
    bio?: string;
    portrait_url?: string;
  };
};

const AboutSection = ({ data }: AboutSectionProps) => {
  const bio =
    data?.bio ||
    "I’m Manjeet Kumar, a photographer focused on honest, editorial imagery. My work blends natural light with refined composition to tell authentic stories. I collaborate closely with clients across weddings, portraits, nature, and events to create timeless visuals with a calm, premium aesthetic.";

  const portraitUrl = data?.portrait_url || fallbackPortrait;

  return (
    <section id="about" className="border-t">
      <div className="container grid gap-10 py-16 md:grid-cols-2 md:gap-12 md:py-24">
        <div>
          <img
            src={portraitUrl}
            alt="About portrait"
            className="w-full rounded-lg object-cover shadow-lg"
            loading="lazy"
          />
        </div>
        <article className="flex flex-col justify-center">
          <h2 className="font-playfair text-3xl md:text-4xl">About</h2>
          <p className="mt-4 text-muted-foreground">{bio}</p>
        </article>
      </div>
    </section>
  );
};

export default AboutSection;
