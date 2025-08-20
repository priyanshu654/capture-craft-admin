-- Create storage bucket for public assets
INSERT INTO storage.buckets (id, name, public) VALUES ('public-assets', 'public-assets', true);

-- Create hero_settings table
CREATE TABLE public.hero_settings (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create about_settings table  
CREATE TABLE public.about_settings (
  id SERIAL PRIMARY KEY,
  bio TEXT,
  portrait_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gallery_images table
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.hero_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admin access)
CREATE POLICY "Admin can manage hero settings" ON public.hero_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage about settings" ON public.about_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage gallery images" ON public.gallery_images FOR ALL USING (auth.role() = 'authenticated');

-- Public read access for portfolio display
CREATE POLICY "Public can view hero settings" ON public.hero_settings FOR SELECT USING (true);
CREATE POLICY "Public can view about settings" ON public.about_settings FOR SELECT USING (true);
CREATE POLICY "Public can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public can view gallery images" ON public.gallery_images FOR SELECT USING (true);

-- Create storage policies for public-assets bucket
CREATE POLICY "Admin can upload to public-assets" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'public-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Admin can update public-assets" ON storage.objects 
FOR UPDATE USING (bucket_id = 'public-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Admin can delete from public-assets" ON storage.objects 
FOR DELETE USING (bucket_id = 'public-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Public can view public-assets" ON storage.objects 
FOR SELECT USING (bucket_id = 'public-assets');

-- Create function to automatically update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_hero_settings_updated_at
    BEFORE UPDATE ON public.hero_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_about_settings_updated_at
    BEFORE UPDATE ON public.about_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gallery_images_updated_at
    BEFORE UPDATE ON public.gallery_images
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();