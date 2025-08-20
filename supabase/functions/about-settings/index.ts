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
    const method = req.method;
    console.log(`About Settings API: ${method}`);

    if (method === 'GET') {
      // Get about settings
      const response = await fetch(`${MONGODB_URI}/action/findOne`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': Deno.env.get('MONGODB_API_KEY') || '',
        },
        body: JSON.stringify({
          collection: 'about_settings',
          database: 'portfolio',
          filter: {}
        })
      });

      const data = await response.json();
      console.log('MongoDB response:', data);

      return new Response(JSON.stringify(data.document || {}), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'POST' || method === 'PUT') {
      const body = await req.json();
      const { bio, portrait_url } = body;

      // Upsert about settings
      const response = await fetch(`${MONGODB_URI}/action/replaceOne`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': Deno.env.get('MONGODB_API_KEY') || '',
        },
        body: JSON.stringify({
          collection: 'about_settings',
          database: 'portfolio',
          filter: {},
          replacement: {
            bio,
            portrait_url,
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString()
          },
          upsert: true
        })
      });

      const data = await response.json();
      console.log('MongoDB upsert response:', data);

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in about-settings function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});