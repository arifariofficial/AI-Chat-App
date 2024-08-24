import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Check if the OpenAI API key is set
const openAIApiKey = process.env.OPENAI_API_KEY;
console.log(process.env.OPENAI_API_KEY);
if (!openAIApiKey) {
  throw new Error(
    "OpenAI API key not found. Please set the OPENAI_API_KEY environment variable.",
  );
}

// File loading
export async function embeddings() {
  const loader = new DirectoryLoader("downloads", {
    ".pdf": (path) => new PDFLoader(path, "/pdfs"),
    ".txt": (path) => new TextLoader(path, "/texts"),
  });

  const docs = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const splits = await textSplitter.splitDocuments(docs);

  // Create a vector store from the splits
  const vectorStore = await MemoryVectorStore.fromDocuments(
    splits,
    new OpenAIEmbeddings(openAIApiKey),
  );

  console.log("Vector store:", vectorStore);
}
