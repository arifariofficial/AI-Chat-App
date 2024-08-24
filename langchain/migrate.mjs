import { processLinks } from "./downloader.mjs";
import { embeddings } from "./embeddings.mjs";

async function migrate() {
  // Execute the processing of links
  await processLinks()
    .then(() => {
      console.log("All files processed.");
    })
    .catch((error) => {
      console.error("Error processing links:", error);
    });

  // Load the downloaded files
  await embeddings();
}

migrate()
  .then(() => {
    console.log("Migration script completed.");
  })
  .catch((error) => {
    console.error("Error running migration script:", error);
  });
