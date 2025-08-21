import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useToast } from "@/hooks/use-toast";
import type { Session, User } from "@supabase/supabase-js";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    document.title = "Admin Login | Portfolio CMS";
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        navigate("/admin", { replace: true });
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        navigate("/admin", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({ title: "Welcome back", description: "Redirecting to your dashboard..." });
      navigate("/admin", { replace: true });
    } catch (err: any) {
      toast({ title: "Sign in failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`
        }
      });
      if (error) throw error;
      toast({ 
        title: "Account created", 
        description: "Please check your email to confirm your account." 
      });
    } catch (err: any) {
      toast({ title: "Sign up failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="min-h-screen bg-background">
      <section className="container py-16">
        <h1 className="sr-only">Admin Login</h1>
        <div className="mx-auto max-w-md rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-6 text-center">
            <p className="font-playfair text-2xl">
              {isSignUp ? "Create Admin Account" : "Admin Login"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {isSignUp 
                ? "Create your admin account to manage the portfolio"
                : "Sign in to manage your portfolio content"
              }
            </p>
          </div>

          <div className="w-full">
            <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                />
              </div>
              <Button type="submit" className="mt-2" disabled={loading}>
                {loading 
                  ? (isSignUp ? "Creating Account..." : "Signing in...") 
                  : (isSignUp ? "Create Account" : "Sign In")
                }
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                {isSignUp 
                  ? "Already have an account? Sign in" 
                  : "Need to create an admin account? Sign up"
                }
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link to="/" className="underline underline-offset-4">Back to site</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Auth;
