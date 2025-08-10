import aboutImage from "@/assets/about-ava.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="border-t">
      <div className="container grid gap-10 py-16 md:grid-cols-2 md:gap-12 md:py-24">
        <div>
          <img
            src={aboutImage}
            alt="Ava Carter in studio with camera gear"
            className="w-full rounded-lg object-cover shadow-lg"
            loading="lazy"
          />
        </div>
        <article className="flex flex-col justify-center">
          <h2 className="font-playfair text-3xl md:text-4xl">About</h2>
          <p className="mt-4 text-muted-foreground">
            I’m Ava Carter, a photographer focused on honest, editorial imagery. My work blends
            natural light with refined composition to tell authentic stories. I collaborate closely
            with clients across weddings, portraits, nature, and events to create timeless visuals
            with a calm, premium aesthetic.
          </p>
        </article>
      </div>
    </section>
  );
};

export default AboutSection;
