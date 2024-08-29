import { processLinks } from "./downloader.mjs";
import { embeddings } from "./embeddings.mjs";

async function migrate() {
  try {
    await processLinks();
    await embeddings();
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

migrate();
