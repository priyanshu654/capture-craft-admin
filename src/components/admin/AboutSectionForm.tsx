import SectionCard from "./SectionCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const AboutSectionForm = () => {
  return (
    <SectionCard
      id="about"
      title="About Section"
      description="Edit your portrait and bio."
      actions={<Button variant="secondary" type="button">Save</Button>}
    >
      <form className="grid gap-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-2">
          <Label htmlFor="about-photo">Portrait Photo</Label>
          <Input id="about-photo" type="file" accept="image/*" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="about-bio">Bio</Label>
          <Textarea id="about-bio" placeholder="Write a short bio..." rows={6} />
        </div>
        <div>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </SectionCard>
  );
};

export default AboutSectionForm;
