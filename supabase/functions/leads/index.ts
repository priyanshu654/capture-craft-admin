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
    console.log(`Leads API: ${method}`);

    if (method === 'POST') {
      const body = await req.json();
      const { name, email, message } = body;

      // Insert new lead
      const response = await fetch(`${MONGODB_URI}/action/insertOne`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': Deno.env.get('MONGODB_API_KEY') || '',
        },
        body: JSON.stringify({
          collection: 'leads',
          database: 'portfolio',
          document: {
            id: crypto.randomUUID(),
            name,
            email,
            message,
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

    if (method === 'GET') {
      // Get all leads (for admin)
      const response = await fetch(`${MONGODB_URI}/action/find`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': Deno.env.get('MONGODB_API_KEY') || '',
        },
        body: JSON.stringify({
          collection: 'leads',
          database: 'portfolio',
          filter: {},
          sort: { created_at: -1 }
        })
      });

      const data = await response.json();
      console.log('MongoDB response:', data);

      return new Response(JSON.stringify(data.documents || []), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in leads function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});