import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MONGODB_URI = Deno.env.get('MONGODB_URI');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const method = req.method;
    const imageId = url.searchParams.get('id');

    console.log(`Gallery Images API: ${method}, ID: ${imageId}`);

    if (method === 'GET') {
      // Get all gallery images
      const response = await fetch(`${MONGODB_URI}/action/find`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': Deno.env.get('MONGODB_API_KEY') || '',
        },
        body: JSON.stringify({
          collection: 'gallery_images',
          database: 'portfolio',
          filter: {},
          sort: { sort_order: 1 }
        })
      });

      const data = await response.json();
      console.log('MongoDB response:', data);

      return new Response(JSON.stringify(data.documents || []), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'POST') {
      const body = await req.json();
      const { image_url, caption, category, sort_order } = body;

      // Insert new gallery image
      const response = await fetch(`${MONGODB_URI}/action/insertOne`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': Deno.env.get('MONGODB_API_KEY') || '',
        },
        body: JSON.stringify({
          collection: 'gallery_images',
          database: 'portfolio',
          document: {
            id: crypto.randomUUID(),
            image_url,
            caption,
            category,
            sort_order: sort_order || 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        })
      });

      const data = await response.json();
      console.log('MongoDB insert response:', data);

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'DELETE' && imageId) {
      // Delete gallery image
      const response = await fetch(`${MONGODB_URI}/action/deleteOne`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': Deno.env.get('MONGODB_API_KEY') || '',
        },
        body: JSON.stringify({
          collection: 'gallery_images',
          database: 'portfolio',
          filter: { id: imageId }
        })
      });

      const data = await response.json();
      console.log('MongoDB delete response:', data);

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in gallery-images function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});