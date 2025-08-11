-- Fix policies: drop if exists then create
-- Hero
DROP POLICY IF EXISTS "Public can read hero" ON public.hero_settings;
DROP POLICY IF EXISTS "Authenticated can mutate hero" ON public.hero_settings;
CREATE POLICY "Public can read hero" ON public.hero_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated can mutate hero" ON public.hero_settings FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- About
DROP POLICY IF EXISTS "Public can read about" ON public.about_settings;
DROP POLICY IF EXISTS "Authenticated can mutate about" ON public.about_settings;
CREATE POLICY "Public can read about" ON public.about_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated can mutate about" ON public.about_settings FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Services
DROP POLICY IF EXISTS "Public can read services" ON public.services;
DROP POLICY IF EXISTS "Authenticated can mutate services" ON public.services;
CREATE POLICY "Public can read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Authenticated can mutate services" ON public.services FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Gallery
DROP POLICY IF EXISTS "Public can read gallery" ON public.gallery_images;
DROP POLICY IF EXISTS "Authenticated can mutate gallery" ON public.gallery_images;
CREATE POLICY "Public can read gallery" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Authenticated can mutate gallery" ON public.gallery_images FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Contact
DROP POLICY IF EXISTS "Public can read contact" ON public.contact_info;
DROP POLICY IF EXISTS "Authenticated can mutate contact" ON public.contact_info;
CREATE POLICY "Public can read contact" ON public.contact_info FOR SELECT USING (true);
CREATE POLICY "Authenticated can mutate contact" ON public.contact_info FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Leads
DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated can read leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated can update leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated can delete leads" ON public.leads;
CREATE POLICY "Anyone can submit leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can read leads" ON public.leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update leads" ON public.leads FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete leads" ON public.leads FOR DELETE USING (auth.role() = 'authenticated');

-- Storage policies
DROP POLICY IF EXISTS "Public can view public-assets" ON storage.objects;
DROP POLICY IF EXISTS "Auth can upload public-assets" ON storage.objects;
DROP POLICY IF EXISTS "Auth can update public-assets" ON storage.objects;
DROP POLICY IF EXISTS "Auth can delete public-assets" ON storage.objects;
CREATE POLICY "Public can view public-assets" ON storage.objects
FOR SELECT USING (bucket_id = 'public-assets');
CREATE POLICY "Auth can upload public-assets" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'public-assets' AND auth.role() = 'authenticated');
CREATE POLICY "Auth can update public-assets" ON storage.objects
FOR UPDATE USING (bucket_id = 'public-assets' AND auth.role() = 'authenticated');
CREATE POLICY "Auth can delete public-assets" ON storage.objects
FOR DELETE USING (bucket_id = 'public-assets' AND auth.role() = 'authenticated');