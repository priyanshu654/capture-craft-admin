import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { SidebarTrigger } from "@/components/ui/sidebar";
import HeroSectionForm from "@/components/admin/HeroSectionForm";
import AboutSectionForm from "@/components/admin/AboutSectionForm";
import ServicesManager from "@/components/admin/ServicesManager";
import GalleryManager from "@/components/admin/GalleryManager";
import ContactSettings from "@/components/admin/ContactSettings";
import { Card, CardContent } from "@/components/ui/card";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Admin Dashboard | Portfolio CMS";
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        navigate("/auth", { replace: true });
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth", { replace: true });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: "Sign out failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Signed out", description: "You have been signed out." });
      navigate("/auth", { replace: true });
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container py-24 text-center">
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <AdminLayout>
      <header className="flex h-14 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <h1 className="font-playfair text-2xl">Admin Dashboard</h1>
        <div className="ml-auto">
          <Button variant="outline" onClick={handleSignOut}>Sign out</Button>
        </div>
      </header>

      <main className="container max-w-6xl py-6">
        <section id="overview" className="scroll-mt-20">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Photos", value: "128" },
              { label: "Categories", value: "4" },
              { label: "Leads", value: "23" },
              { label: "Storage", value: "2.1 GB" },
            ].map((m) => (
              <Card key={m.label}>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{m.label}</p>
                  <p className="mt-1 text-2xl font-semibold">{m.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="mt-6 grid gap-6">
          <HeroSectionForm />
          <AboutSectionForm />
          <ServicesManager />
          <GalleryManager />
          <ContactSettings />
        </div>

        <section id="settings" className="mt-6 scroll-mt-20">
          <Card>
            <CardContent className="p-6">
              <h2 className="font-playfair text-xl">Settings</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Additional preferences and account options will appear here.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </AdminLayout>
  );
};

export default Admin;
