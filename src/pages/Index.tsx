import { useState, useEffect } from "react";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import AboutSection from "@/components/portfolio/AboutSection";
import ServicesSection from "@/components/portfolio/ServicesSection";
import GallerySection from "@/components/portfolio/GallerySection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";
import Loader from "./Loader"; // Your loader component
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
  try {
    const [heroRes, aboutRes, servicesRes, galleryRes] = await Promise.all([
      supabase.from("hero_settings").select("*").maybeSingle(),
      supabase.from("about_settings").select("*").maybeSingle(),
      supabase.from("services").select("*"),
      supabase.from("gallery_images").select("*"),
    ]);

    setData({
      hero: heroRes.data,
      about: aboutRes.data,
      services: servicesRes.data,
      gallery: galleryRes.data,
    });
  } catch (err) {
    console.error("Error fetching data:", err);
  } finally {
    setLoading(false);
  }
};


    fetchAllData();
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Manjeet Kumar",
    jobTitle: "Photographer",
    url: "/",
    sameAs: [
      "https://instagram.com/",
      "https://behance.net/",
      "https://pinterest.com/",
    ],
  };
  console.log("detil",data);
  
  if (loading) {
    return <Loader />; // show loader until *all* data is ready
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero data={data.hero} />
        <AboutSection data={data.about} />
        <ServicesSection data={data.services} />
        <GallerySection data={data.gallery} />
        <ContactSection />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
};

export default Index;
