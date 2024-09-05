import { supabaseAdmin } from "@lib/supabase";

export const runtime = "edge";

export const POST = async (req: Request): Promise<Response> => {
  try {
    const body = await req.json();

    // Validate that query, apiKey, and matches are present in the request body
    const { query, apiKey, matches } = body || {};
    if (!query || !apiKey || typeof matches !== "number") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid request parameters" }),
        { status: 400 },
      );
    }

    console.log(query, apiKey, matches);

    const input = query.replace(/\n/g, " "); // Ensure query is valid before proceeding

    const res = await fetch("https://api.openai.com/v1/embeddings", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      method: "POST",
      body: JSON.stringify({
        model: "text-embedding-ada-002",
        input,
      }),
    });

    if (!res.ok) {
      const errorDetails = await res.json();
      console.error("Error from OpenAI API:", errorDetails);
      return new Response(
        JSON.stringify({ error: "OpenAI API request failed" }),
        { status: 500 },
      );
    }

    const json = await res.json();
    const embedding = json.data[0].embedding;

    const { data: chunks, error } = await supabaseAdmin.rpc("sipe_ai_search", {
      match_count: matches,
      query_embedding: embedding,
      similarity_threshold: 0.7,
    });

    if (error) {
      console.error("Error from Supabase RPC:", error);
      return new Response(JSON.stringify({ error: "Supabase RPC failed" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(chunks), { status: 200 });
  } catch (error) {
    console.error("General error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500 },
    );
  }
};
