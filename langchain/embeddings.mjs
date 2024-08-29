import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { config } from "dotenv";

// Load environment variables
config();

// Function to create a DirectoryLoader with custom loaders for different file types
function createDirectoryLoader(directoryPath) {
  return new DirectoryLoader(directoryPath, {
    ".pdf": (path) => new PDFLoader(path),
    ".txt": (path) => new TextLoader(path),
  });
}

// Function to load documents from a directory
async function loadDocuments(loader) {
  try {
    const documents = await loader.load();
    console.log("Documents loaded successfully.");
    return documents;
  } catch (error) {
    console.error("Error loading documents:", { error: error.message });
    throw new Error("Failed to load documents.");
  }
}

// Function to split documents into chunks
async function splitDocuments(documents, chunkSize = 1000, chunkOverlap = 200) {
  try {
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap,
    });
    const splits = await textSplitter.splitDocuments(documents);
    console.log("Documents split into chunks successfully.");
    return splits;
  } catch (error) {
    console.error("Error splitting documents:", { error: error.message });
    throw new Error("Failed to split documents.");
  }
}

// Function to process a document and save its embedding
async function processDocument(directoryPath = "downloads") {
  const loader = createDirectoryLoader(directoryPath);
  const docs = await loadDocuments(loader);
  const splits = await splitDocuments(docs);
  try {
    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
    });

    const vectorStore = new MemoryVectorStore(embeddings);
    await vectorStore.addDocuments(splits);

    console.log(vectorStore);
  } catch (error) {
    throw new Error(`Failed to process document: ${error.message}`);
  }
}

// Main function to handle the entire embedding and insertion process
export async function embeddings() {
  try {
    await processDocument()
      .then(() => console.log("All documents processed successfully."))
      .catch((error) => console.log(error));
  } catch (error) {
    console.error("Error during embeddings process:", { error: error.message });
  }
}
