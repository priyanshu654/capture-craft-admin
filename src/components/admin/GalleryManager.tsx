import { useEffect, useRef, useState } from "react";
import SectionCard from "./SectionCard";
import { Button } from "@/components/ui/button";
import { Plus, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GalleryItem { id: string; image_url: string; category: string; caption: string | null; }

const GalleryManager = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from("gallery_images")
      .select("id,image_url,category,caption")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const upload = async (file: File, category: string) => {
    const path = `gallery/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("public-assets").upload(path, file, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from("public-assets").getPublicUrl(path);
    const payload: any = { image_url: data.publicUrl, category };
    const { error: insErr } = await (supabase as any)
      .from("gallery_images")
      .insert([payload]);
    if (insErr) throw insErr;
  };
  const onPickFile = () => fileRef.current?.click();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const category = prompt("Enter category: Nature, Wedding, Portraits, Events", "Portraits") || "Portraits";
    try {
      await upload(f, category);
      toast.success("Image uploaded");
      load();
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      e.currentTarget.value = "";
    }
  };

  return (
    <SectionCard
      id="gallery"
      title="Portfolio Gallery"
      description="Upload new photos, organize by category, and manage your work."
      actions={<Button variant="secondary" type="button" onClick={onPickFile}><Plus className="mr-2" /> Upload</Button>}
    >
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFileChange} />
      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <ImageIcon className="h-4 w-4" />
        <span>Preview of your current gallery</span>
      </div>
      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.id} className="overflow-hidden rounded-md border">
            <img
              src={it.image_url}
              alt={it.caption || `${it.category} image`}
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
