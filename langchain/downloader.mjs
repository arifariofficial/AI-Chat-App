import fs from "fs";
import path from "path";
import axios from "axios";
import * as cheerio from "cheerio";
import { fileURLToPath } from "url";

// Derive __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to load and parse the JSON file containing the links
function loadLinksData(filePath) {
  try {
    const linksContent = fs.readFileSync(filePath, "utf-8");
    const linksData = JSON.parse(linksContent);

    if (!Array.isArray(linksData.links)) {
      throw new Error(
        "Invalid format: 'links' should be an array in links.json",
      );
    }

    return linksData.links;
  } catch (error) {
    console.error("Error reading or parsing links.json:", error);
    process.exit(1);
  }
}

// Function to create directories if they don't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Directory created: ${dirPath}`);
  }
}

// Function to download and save a webpage's text content
async function downloadWebpage(url, filePath) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const text = $("body").text();
    fs.writeFileSync(filePath, text, "utf-8");
    console.log(`Webpage saved to ${filePath}`);
  } catch (error) {
    console.error(`Failed to download webpage: ${url}`, error);
  }
}

// Function to download and save a PDF file
async function downloadPdf(url, filePath) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    fs.writeFileSync(filePath, response.data);
    console.log(`PDF saved to ${filePath}`);
  } catch (error) {
    console.error(`Failed to download PDF: ${url}`, error);
  }
}

// Function to process a single link
async function processLink(linkObj, index, downloadsDir) {
  const url = linkObj.link;
  const type = linkObj.type;

  let fileExtension;
  if (type === "pdf_file") {
    fileExtension = ".pdf";
  } else if (type === "web_page") {
    fileExtension = ".txt"; // Save extracted text as .txt files
  } else {
    console.warn(`Unknown type '${type}' for URL: ${url}. Skipping.`);
    return; // Skip unknown types
  }

  const fileName = `document_${index + 1}${fileExtension}`;
  const filePath = path.join(downloadsDir, fileName);

  if (type === "pdf_file") {
    await downloadPdf(url, filePath);
  } else if (type === "web_page") {
    await downloadWebpage(url, filePath);
  }
}

// Function to process all links
export async function processLinks() {
  const linksData = loadLinksData(path.join(__dirname, "links.json"));
  const downloadsDir = path.join(__dirname, "downloads");
  ensureDirectoryExists(downloadsDir);

  for (let index = 0; index < linksData.length; index++) {
    await processLink(linksData[index], index, downloadsDir);
  }
  console.log("All links processed.");
}
