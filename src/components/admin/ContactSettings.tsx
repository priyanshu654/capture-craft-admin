import SectionCard from "./SectionCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const ContactSettings = () => {
  return (
    <SectionCard
      id="contact"
      title="Contact Information"
      description="Customize how clients can reach you."
      actions={<Button variant="secondary" type="button">Save</Button>}
    >
      <form className="grid gap-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-2 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@studio.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="+1 (555) 123-4567" />
          </div>
        </div>

        <Separator />

        <div className="grid gap-2 md:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input id="instagram" placeholder="https://instagram.com/yourhandle" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="facebook">Facebook</Label>
            <Input id="facebook" placeholder="https://facebook.com/yourpage" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="twitter">Twitter / X</Label>
            <Input id="twitter" placeholder="https://x.com/yourhandle" />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="message-template">Message Auto‑reply (optional)</Label>
          <Textarea id="message-template" placeholder="Thanks for reaching out! I'll get back to you within 24 hours." rows={4} />
        </div>

        <div>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </SectionCard>
  );
};

export default ContactSettings;
