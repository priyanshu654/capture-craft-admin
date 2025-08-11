import { useEffect, useState } from "react";
import SectionCard from "./SectionCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const HeroSectionForm = () => {
  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("hero_settings")
        .select("id,name,tagline")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data) {
        setId(data.id);
        setName(data.name || "");
        setTagline(data.tagline || "");
      }
    };
    load();
  }, []);

  const uploadFile = async (f: File) => {
    const path = `hero/${Date.now()}-${f.name}`;
    const { error } = await supabase.storage.from("public-assets").upload(path, f, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from("public-assets").getPublicUrl(path);
    return data.publicUrl;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let image_url: string | undefined;
      if (file) image_url = await uploadFile(file);
      if (id) {
        const { error } = await supabase
          .from("hero_settings")
          .update({ name, tagline, ...(image_url ? { image_url } : {}) })
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error, data } = await supabase
          .from("hero_settings")
          .insert({ name, tagline, ...(image_url ? { image_url } : {}) })
          .select("id")
          .maybeSingle();
        if (error) throw error;
        if (data) setId(data.id);
      }
      toast.success("Hero updated");
    } catch (err: any) {
      toast.error(err.message || "Failed to save hero");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SectionCard
      id="hero"
      title="Hero Section"
      description="Update your name, tagline, and hero photo."
      actions={<Button variant="secondary" type="submit" form="hero-form" disabled={saving}>{saving ? "Saving…" : "Save"}</Button>}
    >
      <form id="hero-form" className="grid gap-6" onSubmit={onSubmit}>
        <div className="grid gap-2 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="hero-name">Name</Label>
            <Input id="hero-name" placeholder="Ava Carter" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hero-tagline">Tagline</Label>
            <Input id="hero-tagline" placeholder="Fine Art & Wedding Photographer" value={tagline} onChange={(e) => setTagline(e.target.value)} />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="hero-photo">Hero Photo</Label>
          <Input id="hero-photo" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>
        <div>
          <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save Changes"}</Button>
        </div>
      </form>
    </SectionCard>
  );
};

export default HeroSectionForm;
