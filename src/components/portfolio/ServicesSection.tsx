import natureImg from "@/assets/category-nature.jpg";
import weddingImg from "@/assets/category-wedding.jpg";
import portraitsImg from "@/assets/category-portraits.jpg";
import eventsImg from "@/assets/category-events.jpg";

const categories = [
  {
    key: "Nature",
    image: natureImg,
    title: "Nature",
    description: "Landscapes and details that celebrate the quiet poetry of the outdoors.",
  },
  {
    key: "Wedding",
    image: weddingImg,
    title: "Wedding",
    description: "Elegant, candid coverage that preserves the emotion of your day.",
  },
  {
    key: "Portraits",
    image: portraitsImg,
    title: "Portraits",
    description: "Refined studio and environmental portraits with character.",
  },
  {
    key: "Events",
    image: eventsImg,
    title: "Events",
    description: "Authentic documentary moments with vibrant energy.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="border-t">
      <div className="container py-16 md:py-24">
        <h2 className="font-playfair text-3xl md:text-4xl">Services</h2>
        <p className="mt-2 text-muted-foreground">Tailored coverage across categories</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <article key={c.key} className="group rounded-lg border bg-card p-3 shadow-sm transition hover:shadow-md">
              <div className="overflow-hidden rounded-md">
                <img
                  src={c.image}
                  alt={`${c.title} photography category cover`}
                  className="aspect-video w-full transform object-cover transition duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-3 font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
