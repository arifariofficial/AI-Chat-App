import fs from "fs";
import { SIPEEssay, SIPEJSON } from "@/types";
import { loadEnvConfig } from "@next/env";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

loadEnvConfig("");

async function generateEmbeddings(essays: SIPEEssay[]) {
  const openai = new OpenAI();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  //Delete all existing embeddings
  const { error: deleteError } = await supabase
    .from("sipe_ai")
    .delete()
    .neq("id", 0); // This will delete all rows
  if (deleteError) {
    console.error("Error deleting existing embeddings: ", deleteError.message);
    return; // Stop execution if delete fails
  } else {
    console.log("Successfully deleted all existing embeddings.");
  }

  // Embedding
  for (let i = 0; i < essays.length; i++) {
    const essay = essays[i];

    for (let j = 0; j < essay.chunks.length; j++) {
      const chunk = essay.chunks[j];

      console.log("Chunk Content:", chunk.content); // Debugging line

      // Ensure the content is a string
      if (typeof chunk.content !== "string") {
        console.error(`Invalid content at essay index ${i}, chunk index ${j}`);
        continue; // Skip this chunk
      }

      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: [chunk.content],
      });

      const [{ embedding }] = embeddingResponse.data;

      const { error } = await supabase
        .from("sipe_ai")
        .insert({
          essay_title: chunk.essay_title,
          essay_url: chunk.essay_url,
          content: chunk.content,
          content_tokens: chunk.content_tokens,
          embedding: embedding,
        })
        .select("*");
      if (error) {
        console.log("error: ", error.message);
      } else {
        console.log("saved", i, j);
      }
    }
  }
}

(async () => {
  const book: SIPEJSON = JSON.parse(
    fs.readFileSync("scripts/sipe.json", "utf8"),
  );

  await generateEmbeddings(book.essays);
})();
