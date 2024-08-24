import fs from "fs";
import path from "path";
import axios from "axios";
import * as cheerio from "cheerio";
import { fileURLToPath } from "url";

// Derive __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the JSON file containing the links
let linksData;
try {
  const linksContent = fs.readFileSync(
    path.join(__dirname, "links.json"),
    "utf-8",
  );
  linksData = JSON.parse(linksContent);
} catch (error) {
  console.error("Error reading or parsing links.json:", error);
  process.exit(1);
}

// Ensure that linksData.links is an array
if (!Array.isArray(linksData.links)) {
  console.error("Invalid format: 'links' should be an array in links.json");
  process.exit(1);
}

// Create directories to store downloaded files
const downloadsDir = path.join(__dirname, "downloads");
if (!fs.existsSync(downloadsDir))
  fs.mkdirSync(downloadsDir, { recursive: true });

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

// Function to process all links
export async function processLinks() {
  for (let index = 0; index < linksData.links.length; index++) {
    const linkObj = linksData.links[index];
    const url = linkObj.link;
    const type = linkObj.type;

    // Determine file extension based on the type property
    let fileExtension;
    if (type === "pdf_file") {
      fileExtension = ".pdf";
    } else if (type === "web_page") {
      fileExtension = ".txt"; // Save extracted text as .txt files
    } else {
      console.warn(`Unknown type '${type}' for URL: ${url}. Skipping.`);
      continue; // Skip unknown types
    }

    const fileName = `document_${index + 1}${fileExtension}`;
    const filePath = path.join(downloadsDir, fileName);

    if (type === "pdf_file") {
      await downloadPdf(url, filePath);
    } else if (type === "web_page") {
      await downloadWebpage(url, filePath);
    }
  }
}
