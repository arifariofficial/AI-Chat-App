import { supabaseAdmin } from "@/lib/supabase";
export const runtime = "edge";

export const POST = async (req: Request): Promise<Response> => {
  try {
    const body = await req.json();

    // Validate the request parameters
    const { query, apiKey, matches } = body || {};
    if (!query || !apiKey || typeof matches !== "number") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid request parameters" }),
        { status: 400 },
      );
    }

    // Prepare the query for embedding
    const input = query.replace(/\n/g, " ");

    // Fetch the embedding from OpenAI API
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
      console.error("OpenAI API error:", errorDetails);
      return new Response(
        JSON.stringify({ error: "Failed to fetch embedding from OpenAI API" }),
        { status: res.status },
      );
    }

    const { data } = await res.json();
    const embedding = data[0]?.embedding;

    if (!embedding) {
      return new Response(JSON.stringify({ error: "No embedding found" }), {
        status: 500,
      });
    }

    // Call Supabase stored procedure with the embedding
    const { data: chunks, error } = await supabaseAdmin.rpc("sipe_ai_search", {
      match_count: matches,
      query_embedding: embedding,
      similarity_threshold: 0.8,
    });

    if (error) {
      console.error("Supabase RPC error:", error);
      return new Response(JSON.stringify({ error: "Supabase RPC failed" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(chunks), { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500 },
    );
  }
};
