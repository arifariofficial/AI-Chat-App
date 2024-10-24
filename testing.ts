import { SIPEEssay } from "@/types";
import axios from "axios";
import PdfParse from "pdf-parse";

const BASE_URL = {
  Sosiaaliturvaopas:
    "https://sosiaaliturvaopas.files.wordpress.com/2018/01/sosiaaliturvaopas-2018.pdf",
  Liikennevakuutuslaki: "https://www.finlex.fi/fi/laki/ajantasa/2016/20160460",
  Vahingonkorvauslaki: "https://finlex.fi/fi/laki/ajantasa/1974/19740412",
  LiikennevakuutuksenKorvausohjeet:
    "https://www.liipo.fi/media/liikennevakuutuksen-korvausohjeet-2024.pdf",
  Vammaispalvelulaki: "https://finlex.fi/fi/laki/alkup/2023/20230675",
  Sairausvakuutuslaki: "https://www.finlex.fi/fi/laki/ajantasa/2004/20041224",
  kelaKorvauksetYksityisestaSairaanhoidosta: "https://www.kela.fi/sairaanhoito",
  Yksityistapaturmavakuutus:
    "https://www.fine.fi/naissa-asioissa-autamme/henkilovakuutukset/yksityistapaturmavakuutus.html",
  Kansaneläkelaki: "https://www.finlex.fi/fi/laki/ajantasa/2007/20070568",
  korvaamiKriisinhallintatehtava:
    "https://www.finlex.fi/fi/laki/ajantasa/2016/20161522",
};

// Fetch the essay and ToC
const getEssayLiikennevakuutuksenKorvausohjeet = async () => {
  const essay: SIPEEssay = {
    title: "Liikennevakuutuksen korvausohjeet",
    url: BASE_URL.LiikennevakuutuksenKorvausohjeet,
    content: "",
    length: 0,
    tokens: 0,
    chunks: [],
    toc: {}, // Initialize as empty object
  };

  try {
    // Fetch the PDF data
    const response = await axios.get(
      BASE_URL.LiikennevakuutuksenKorvausohjeet,
      {
        responseType: "arraybuffer",
      },
    );

    const pdfData = await PdfParse(response.data);
    console.log(pdfData.text);

    // Extract individual page text and log each one to find missing data
    pdfData.text.split("\n").forEach((line, index) => {
      console.log(`Line ${index + 1}: ${line}`);
    });

    // Clean the extracted text
    const cleanedText = cleanPDFText(pdfData.text);

    // Populate essay fields
    essay.content = cleanedText;
    essay.length = cleanedText.length;
    essay.tokens = countTokens(cleanedText); // Replace with your token counting logic

    // Extract ToC and associate with page numbers
    const toc = extractTableOfContents(pdfData.text);

    essay.toc = toc;

    return essay;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to process LiikennevakuutuksenKorvausohjeet pdf: ${error.message}`,
      );
    } else {
      throw new Error("An unknown error occurred while processing pdf file");
    }
  }
};
const extractTableOfContents = (text: string): Record<string, number> => {
  const toc: Record<string, number> = {};

  // Example regular expression to match section titles and page numbers
  const tocRegex = /^(\d+\.\d+.*)\.{2,}(\d+)$/gm;
  let match;

  while ((match = tocRegex.exec(text)) !== null) {
    const sectionTitle = match[1].trim();
    const pageNumber = parseInt(match[2], 10);
    toc[sectionTitle] = pageNumber;
  }

  return toc;
};

// Function to clean the extracted PDF text
const cleanPDFText = (text: string): string => {
  // Remove page numbers (e.g., "Page 1 of 10")
  text = text.replace(/Page \d+ of \d+/g, "");

  // Remove unnecessary headers or footers if applicable
  text = text.replace(/HEADER TEXT|FOOTER TEXT/g, "");

  // Remove sections with lots of periods (e.g., "......")
  text = text.replace(/\.+/g, "");

  return text.trim();
};

// Placeholder function to count tokens (adjust based on your needs)
const countTokens = (text: string): number => {
  return text.split(/\s+/).length; // Simple token count based on word split
};

getEssayLiikennevakuutuksenKorvausohjeet();
