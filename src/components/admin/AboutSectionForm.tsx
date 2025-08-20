import { useEffect, useState } from "react";
import SectionCard from "./SectionCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AboutSectionForm = () => {
  const [id, setId] = useState<number | null>(null);
  const [bio, setBio] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await (supabase as any)
        .from("about_settings")
        .select("id,bio")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data) {
        setId(data.id);
        setBio(data.bio || "");
      }
    };
    load();
  }, []);

  const uploadFile = async (f: File) => {
    const path = `about/${Date.now()}-${f.name}`;
    const { error } = await supabase.storage.from("public-assets").upload(path, f, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from("public-assets").getPublicUrl(path);
    return data.publicUrl;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let portrait_url: string | undefined;
      if (file) portrait_url = await uploadFile(file);
      if (id) {
        const { error } = await (supabase as any)
          .from("about_settings")
          .update({ bio, ...(portrait_url ? { portrait_url } : {}) })
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error, data } = await (supabase as any)
          .from("about_settings")
          .insert({ bio, ...(portrait_url ? { portrait_url } : {}) })
          .select("id")
          .maybeSingle();
        if (error) throw error;
        if (data) setId(data.id);
      }
      toast.success("About updated");
    } catch (err: any) {
      toast.error(err.message || "Failed to save about");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SectionCard
      id="about"
      title="About Section"
      description="Edit your portrait and bio."
      actions={<Button variant="secondary" type="submit" form="about-form" disabled={saving}>{saving ? "Saving…" : "Save"}</Button>}
    >
      <form id="about-form" className="grid gap-6" onSubmit={onSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="about-photo">Portrait Photo</Label>
          <Input id="about-photo" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="about-bio">Bio</Label>
          <Textarea id="about-bio" placeholder="Write a short bio..." rows={6} value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <div>
          <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save Changes"}</Button>
        </div>
      </form>
    </SectionCard>
  );
};

export default AboutSectionForm;
