import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
    <main className="min-h-screen bg-background">
      <div className="container py-24">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="font-playfair text-4xl">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleSignOut}>Sign out</Button>
        </header>
        <section className="text-muted-foreground">
          <p>
            Authentication is enabled. Next, we can build content management (hero, about, services, gallery, contact).
          </p>
        </section>
      </div>
    </main>
  );
};

export default Admin;
