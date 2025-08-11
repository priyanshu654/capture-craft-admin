import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import fallbackPortrait from "@/assets/about-ava.jpg";

const AboutSection = () => {
  const [bio, setBio] = useState(
    "I’m Ava Carter, a photographer focused on honest, editorial imagery. My work blends natural light with refined composition to tell authentic stories. I collaborate closely with clients across weddings, portraits, nature, and events to create timeless visuals with a calm, premium aesthetic."
  );
  const [portraitUrl, setPortraitUrl] = useState<string>(fallbackPortrait);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const { data } = await supabase
        .from("about_settings")
        .select("bio,portrait_url")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!mounted || !data) return;
      if (data.bio) setBio(data.bio);
      if (data.portrait_url) setPortraitUrl(data.portrait_url);
    };
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <section id="about" className="border-t">
      <div className="container grid gap-10 py-16 md:grid-cols-2 md:gap-12 md:py-24">
        <div>
          <img
            src={portraitUrl}
            alt="About portrait of Ava Carter"
            className="w-full rounded-lg object-cover shadow-lg"
            loading="lazy"
          />
        </div>
        <article className="flex flex-col justify-center">
          <h2 className="font-playfair text-3xl md:text-4xl">About</h2>
          <p className="mt-4 text-muted-foreground">{bio}</p>
        </article>
      </div>
    </section>
  );
};

export default AboutSection;
