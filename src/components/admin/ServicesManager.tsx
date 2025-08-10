import SectionCard from "./SectionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2, Plus } from "lucide-react";
import nature1 from "@/assets/category-nature.jpg";
import wedding1 from "@/assets/category-wedding.jpg";
import portraits1 from "@/assets/category-portraits.jpg";
import events1 from "@/assets/category-events.jpg";

const demo = [
  { title: "Nature", description: "Landscapes and outdoor scenes.", image: nature1 },
  { title: "Wedding", description: "Timeless wedding moments.", image: wedding1 },
  { title: "Portraits", description: "Studio and lifestyle portraits.", image: portraits1 },
  { title: "Events", description: "Corporate and private events.", image: events1 },
];

const ServicesManager = () => {
  return (
    <SectionCard
      id="services"
      title="Services / Categories"
      description="Add, edit, or remove photography categories."
      actions={<Button variant="secondary" type="button"><Plus className="mr-2" /> New Category</Button>}
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {demo.map((item) => (
          <Card key={item.title}>
            <CardContent className="p-0">
              <img
                src={item.image}
                alt={`${item.title} photography category cover`}
                className="h-40 w-full rounded-t-lg object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="font-medium">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm"><Edit className="mr-2" /> Edit</Button>
                  <Button variant="ghost" size="sm"><Trash2 className="mr-2" /> Delete</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 rounded-lg border p-4">
        <h4 className="font-medium">Quick Add</h4>
        <form className="mt-3 grid gap-3 md:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-2">
            <Label htmlFor="svc-title">Title</Label>
            <Input id="svc-title" placeholder="e.g. Fashion" />
          </div>
          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="svc-desc">Description</Label>
            <Textarea id="svc-desc" placeholder="Short description" rows={3} />
          </div>
          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="svc-image">Cover Image</Label>
            <Input id="svc-image" type="file" accept="image/*" />
          </div>
          <div>
            <Button type="submit"><Plus className="mr-2" /> Add Category</Button>
          </div>
        </form>
      </div>
    </SectionCard>
  );
};

export default ServicesManager;
