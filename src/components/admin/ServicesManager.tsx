import { useEffect, useState } from "react";
import SectionCard from "./SectionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Service { id: string; title: string; description: string | null; image_url: string | null; }

const ServicesManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select("id,title,description,image_url")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setServices(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const uploadFile = async (f: File) => {
    const path = `services/${Date.now()}-${f.name}`;
    const { error } = await supabase.storage.from("public-assets").upload(path, f, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from("public-assets").getPublicUrl(path);
    return data.publicUrl;
  };

  const onAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Title is required");
    setSaving(true);
    try {
      let image_url: string | undefined;
      if (file) image_url = await uploadFile(file);
      const { error } = await supabase
        .from("services")
        .insert({ title, description, ...(image_url ? { image_url } : {}) });
      if (error) throw error;
      setTitle("");
      setDescription("");
      setFile(null);
      toast.success("Service added");
      load();
    } catch (err: any) {
      toast.error(err.message || "Failed to add service");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <SectionCard
      id="services"
      title="Services / Categories"
      description="Add, edit, or remove photography categories."
      actions={<Button variant="secondary" type="submit" form="svc-form" disabled={saving}><Plus className="mr-2" /> {saving ? "Saving…" : "New Category"}</Button>}
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {!loading && services.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-0">
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={`${item.title} photography category cover`}
                  className="h-40 w-full rounded-t-lg object-cover"
                  loading="lazy"
                />
              )}
              <div className="p-4">
                <h3 className="font-medium">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" disabled><Edit className="mr-2" /> Edit</Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(item.id)}><Trash2 className="mr-2" /> Delete</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 rounded-lg border p-4">
        <h4 className="font-medium">Quick Add</h4>
        <form id="svc-form" className="mt-3 grid gap-3 md:grid-cols-2" onSubmit={onAdd}>
          <div className="grid gap-2">
            <Label htmlFor="svc-title">Title</Label>
            <Input id="svc-title" placeholder="e.g. Fashion" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="svc-desc">Description</Label>
            <Textarea id="svc-desc" placeholder="Short description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="svc-image">Cover Image</Label>
            <Input id="svc-image" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </div>
          <div>
            <Button type="submit" disabled={saving}><Plus className="mr-2" /> {saving ? "Adding…" : "Add Category"}</Button>
          </div>
        </form>
      </div>
    </SectionCard>
  );
};

export default ServicesManager;
