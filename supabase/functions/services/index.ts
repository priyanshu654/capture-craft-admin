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
    const serviceId = url.searchParams.get('id');

    console.log(`Services API: ${method}, ID: ${serviceId}`);

    if (method === 'GET') {
      // Get all services
      const response = await fetch(`${MONGODB_URI}/action/find`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': Deno.env.get('MONGODB_API_KEY') || '',
        },
        body: JSON.stringify({
          collection: 'services',
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
      const { title, description, image_url, sort_order } = body;

      // Insert new service
      const response = await fetch(`${MONGODB_URI}/action/insertOne`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': Deno.env.get('MONGODB_API_KEY') || '',
        },
        body: JSON.stringify({
          collection: 'services',
          database: 'portfolio',
          document: {
            id: crypto.randomUUID(),
            title,
            description,
            image_url,
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

    if (method === 'PUT' && serviceId) {
      const body = await req.json();
      const { title, description, image_url, sort_order } = body;

      // Update service
      const response = await fetch(`${MONGODB_URI}/action/updateOne`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': Deno.env.get('MONGODB_API_KEY') || '',
        },
        body: JSON.stringify({
          collection: 'services',
          database: 'portfolio',
          filter: { id: serviceId },
          update: {
            $set: {
              title,
              description,
              image_url,
              sort_order,
              updated_at: new Date().toISOString()
            }
          }
        })
      });

      const data = await response.json();
      console.log('MongoDB update response:', data);

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'DELETE' && serviceId) {
      // Delete service
      const response = await fetch(`${MONGODB_URI}/action/deleteOne`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': Deno.env.get('MONGODB_API_KEY') || '',
        },
        body: JSON.stringify({
          collection: 'services',
          database: 'portfolio',
          filter: { id: serviceId }
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
    console.error('Error in services function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});