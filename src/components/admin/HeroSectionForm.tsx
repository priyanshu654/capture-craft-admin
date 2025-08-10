import SectionCard from "./SectionCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const HeroSectionForm = () => {
  return (
    <SectionCard
      id="hero"
      title="Hero Section"
      description="Update your name, tagline, and hero photo."
      actions={<Button variant="secondary" type="button">Save</Button>}
    >
      <form className="grid gap-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-2 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="hero-name">Name</Label>
            <Input id="hero-name" placeholder="Ava Carter" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hero-tagline">Tagline</Label>
            <Input id="hero-tagline" placeholder="Fine Art & Wedding Photographer" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="hero-photo">Hero Photo</Label>
          <Input id="hero-photo" type="file" accept="image/*" />
        </div>
        <div>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </SectionCard>
  );
};

export default HeroSectionForm;
