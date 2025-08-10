import SectionCard from "./SectionCard";
import { Button } from "@/components/ui/button";
import { Plus, Image as ImageIcon } from "lucide-react";
import gallery1 from "@/assets/gallery1-portraits.jpg";
import gallery2 from "@/assets/gallery2-portraits.jpg";
import gallery3 from "@/assets/gallery1-nature.jpg";
import gallery4 from "@/assets/gallery2-nature.jpg";
import gallery5 from "@/assets/gallery1-wedding.jpg";
import gallery6 from "@/assets/gallery1-events.jpg";

const images = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

const GalleryManager = () => {
  return (
    <SectionCard
      id="gallery"
      title="Portfolio Gallery"
      description="Upload new photos, organize by category, and manage your work."
      actions={<Button variant="secondary" type="button"><Plus className="mr-2" /> Upload</Button>}
    >
      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <ImageIcon className="h-4 w-4" />
        <span>Preview of your current gallery</span>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {images.map((src, idx) => (
          <div key={idx} className="overflow-hidden rounded-md border">
            <img
              src={src}
              alt={`Portfolio image ${idx + 1}`}
              className="aspect-square w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default GalleryManager;
