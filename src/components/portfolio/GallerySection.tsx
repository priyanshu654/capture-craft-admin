import { useMemo, useState } from "react";
import g1n from "@/assets/gallery1-nature.jpg";
import g2n from "@/assets/gallery2-nature.jpg";
import g1w from "@/assets/gallery1-wedding.jpg";
import g1p from "@/assets/gallery1-portraits.jpg";
import g2p from "@/assets/gallery2-portraits.jpg";
import g1e from "@/assets/gallery1-events.jpg";
import g2e from "@/assets/gallery2-events.jpg";

const items = [
  { src: g1n, alt: "Misty mountain landscape at sunrise", category: "Nature" },
  { src: g2n, alt: "Macro leaf with dew drops", category: "Nature" },
  { src: g1w, alt: "Wedding rings and hands detail", category: "Wedding" },
  { src: g1p, alt: "Studio portrait with Rembrandt lighting", category: "Portraits" },
  { src: g2p, alt: "Editorial headshot on clean backdrop", category: "Portraits" },
  { src: g1e, alt: "Candid laugh at reception", category: "Events" },
  { src: g2e, alt: "Keynote speaker on stage", category: "Events" },
];

const categories = ["All", "Nature", "Wedding", "Portraits", "Events"] as const;

type Category = (typeof categories)[number];

const GallerySection = () => {
  const [active, setActive] = useState<Category>("All");
  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((i) => i.category === active)),
    [active]
  );

  return (
    <section id="portfolio" className="border-t">
      <div className="container py-16 md:py-24">
        <h2 className="font-playfair text-3xl md:text-4xl">Portfolio</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                active === c ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`}
              aria-pressed={active === c}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((img, idx) => (
            <figure key={idx} className="overflow-hidden rounded-md border bg-card shadow-sm">
              <img
                src={img.src}
                alt={`${img.alt} — ${img.category} photography`}
                className="aspect-video w-full object-cover transition duration-300 hover:scale-[1.02]"
                loading="lazy"
              />
              <figcaption className="px-3 py-2 text-xs text-muted-foreground">{img.category}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
