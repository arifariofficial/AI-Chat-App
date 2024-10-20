import { SIPEChunk, SIPEEssay, SIPEJSON } from "@types";
import axios from "axios";
import * as cheerio from "cheerio";
import { encode } from "gpt-3-encoder";
import fs from "fs";
import pdfParse from "pdf-parse";

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

const CHUNK_SIZE = 200;

interface Links {
  title: string;
  url: string;
  law: string;
  header?: string;
}

const getLinksLiikennevakuutuslaki = async (): Promise<Links[]> => {
  const linksArr: Links[] = [];

  const response = await axios.get(BASE_URL.Liikennevakuutuslaki);
  const $ = cheerio.load(response.data);

  // Find all "a" elements within the div with id="toc"
  $("#toc a").each((index, element) => {
    const linkUrl = $(element).attr("href");
    let title = $(element).text();

    // Remove "1 luku - ", "2 luku - ", etc., and "§ - " from section titles in a single line
    title = title.replace(/^\d+\s*[a-zA-Z]?\s*(luku - |§ - )/, "");

    if (linkUrl && linkUrl.startsWith("#")) {
      linksArr.push({ title, url: linkUrl, law: "Liikennevakuutuslaki" });
    }
  });

  return linksArr;
};

const getLinksVahingonkorvauslaki = async (): Promise<Links[]> => {
  const linksArr: Links[] = [];

  const response = await axios.get(BASE_URL.Vahingonkorvauslaki);
  const $ = cheerio.load(response.data);
  let header = "";

  // Find all "a" elements within the div with id="toc"
  $("#toc a").each((index, element) => {
    if ($(element).hasClass("h4")) {
      header = $(element).text();
    }
    const linkUrl = $(element).attr("href");
    let title = $(element).text();

    // Remove "1 luku - ", "2 luku - ", etc., and "§ - " from section titles in a single line
    header = header.replace(/^\d+\s*[a-zA-Z]?\s*(luku - |§ - )/, "");

    // Replace any occurrence of '§' with an empty string and trim extra spaces/newlines
    title = title.replace(/§/g, "").replace(/\s+/g, " ").trim();

    if (linkUrl && linkUrl.startsWith("#")) {
      linksArr.push({
        title,
        url: linkUrl,
        law: "Vahingonkorvauslaki",
        header,
      });
    }
  });

  return linksArr;
};

const getLinksVammaispalvelulaki = async (): Promise<Links[]> => {
  const linksArr: Links[] = [];

  const response = await axios.get(BASE_URL.Vammaispalvelulaki);
  const $ = cheerio.load(response.data);
  let header = "";
  let linkUrl: string | undefined;
  let title: string | undefined;

  // Find all "a" elements within the div with id="toc"
  $("#toc a").each((index, element) => {
    if ($(element).hasClass("h4")) {
      header = $(element).text();
    }
    if ($(element).hasClass("h5")) {
      linkUrl = $(element).attr("href");
      title = $(element).text();
    }

    // Remove "1 luku - ", "2 luku - ", etc., and "§ - " from section titles in a single line
    header = header.replace(/^\d+\s*[a-zA-Z]?\s*(luku - |§ - )/, "");

    // Replace unwanted characters from title
    if (title) {
      title = title.replace(/^\d+\s*§\s*-\s*/, "").trim();
    }

    if (linkUrl && title && linkUrl.startsWith("#Pidm")) {
      linksArr.push({
        title,
        url: linkUrl,
        law: "Vammaispalvelulaki",
        header,
      });
    }
  });

  return linksArr;
};

const getLinksSairausvakuutuslaki = async (): Promise<Links[]> => {
  const linksArr: Links[] = [];

  const response = await axios.get(BASE_URL.Sairausvakuutuslaki);
  const $ = cheerio.load(response.data);
  let header = "";
  let linkUrl: string | undefined;
  let title: string | undefined;

  // Find all "a" elements within the div with id="toc"
  $("#toc a").each((index, element) => {
    if ($(element).hasClass("h4")) {
      header = $(element).text();
    }
    if ($(element).hasClass("h5")) {
      linkUrl = $(element).attr("href");
      title = $(element).text();
    }

    if (
      $(element).is("a") &&
      $(element).text().trim() ===
        "Muutossäädösten voimaantulo ja soveltaminen:"
    ) {
      return false;
    }

    // Remove "1 luku - ", "2 luku - ", etc., and "§ - " from section titles in a single line
    header = header.replace(/^\d+\s*[a-zA-Z]?\s*(luku - |§ - )/, "");

    // Replace unwanted characters from title
    if (title) {
      title = title.replace(/^\d+\s*§\s*-\s*/, "").trim();
    }

    if (linkUrl && title && linkUrl.startsWith("#")) {
      linksArr.push({
        title,
        url: linkUrl,
        law: "Sairausvakuutuslaki",
        header,
      });
    }
  });

  return linksArr;
};

const getLinksKansaneläkelaki = async (): Promise<Links[]> => {
  const linksArr: Links[] = [];

  const response = await axios.get(BASE_URL.Kansaneläkelaki);
  const $ = cheerio.load(response.data);
  let header = "";
  let linkUrl: string | undefined;
  let title: string | undefined;

  // Find all "a" elements within the div with id="toc"
  $("#toc a").each((index, element) => {
    if ($(element).hasClass("h4")) {
      header = $(element).text();
    }
    if ($(element).hasClass("h5")) {
      linkUrl = $(element).attr("href");
      title = $(element).text();
    }

    if (
      $(element).is("a") &&
      $(element).text().trim() ===
        "Muutossäädösten voimaantulo ja soveltaminen:"
    ) {
      return false;
    }

    // Remove "1 luku - ", "2 luku - ", etc., and "§ - " from section titles in a single line
    header = header.replace(/^\d+\s*[a-zA-Z]?\s*(luku - |§ - )/, "");

    // Replace unwanted characters from title
    if (title) {
      title = title.replace(/^\d+\s*§\s*-\s*/, "").trim();
    }

    if (linkUrl && title && linkUrl.startsWith("#")) {
      linksArr.push({
        title,
        url: linkUrl,
        law: "Kansaneläkelaki",
        header,
      });
    }
  });

  return linksArr;
};

const getLinkskorvaamiKriisinhallintatehtava = async (): Promise<Links[]> => {
  const linksArr: Links[] = [];

  const response = await axios.get(BASE_URL.korvaamiKriisinhallintatehtava);
  const $ = cheerio.load(response.data);
  let header = "";
  let linkUrl: string | undefined;
  let title: string | undefined;

  // Find all "a" elements within the div with id="toc"
  $("#toc a").each((index, element) => {
    if ($(element).hasClass("h4")) {
      header = $(element).text();
    }
    if ($(element).hasClass("h5")) {
      linkUrl = $(element).attr("href");
      title = $(element).text();
    }

    if (
      $(element).is("a") &&
      $(element).text().trim() ===
        "Muutossäädösten voimaantulo ja soveltaminen:"
    ) {
      return false;
    }

    // Remove "1 luku - ", "2 luku - ", etc., and "§ - " from section titles in a single line
    header = header.replace(/^\d+\s*[a-zA-Z]?\s*(luku - |§ - )/, "");

    // Replace unwanted characters from title
    if (title) {
      title = title.replace(/^\d+\s*§\s*-\s*/, "").trim();
    }

    if (linkUrl && title && linkUrl.startsWith("#")) {
      linksArr.push({
        title,
        url: linkUrl,
        law: "Laki tapaturman ja palvelussairauden korvaamisesta kriisinhallintatehtävässä",
        header,
      });
    }
  });

  return linksArr;
};

// Fetch the essay and ToC
const getEssaySosiaaliturvaopas = async () => {
  const essay: SIPEEssay = {
    title: "Sosiaaliturvaopas 2018",
    url: BASE_URL.Sosiaaliturvaopas,
    content: "",
    length: 0,
    tokens: 0,
    chunks: [],
    toc: {}, // Initialize as empty object
  };

  try {
    // Fetch the PDF data
    const response = await axios.get(BASE_URL.Sosiaaliturvaopas, {
      responseType: "arraybuffer",
    });

    const pdfData = await pdfParse(response.data);

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
        `Failed to process Sosiaaliturvaopas pdf: ${error.message}`,
      );
    } else {
      throw new Error("An unknown error occurred while processing pdf file");
    }
  }
};

// Extract the Table of Contents from the PDF text
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

// Function to extract metadata and structure the result into SIPEEssay type
const getEssayLiikennevakuutuksenKorvausohjeet =
  async (): Promise<SIPEEssay> => {
    try {
      const response = await axios.get(
        "https://www.liipo.fi/media/liikennevakuutuksen-korvausohjeet-2024.pdf",
        {
          responseType: "arraybuffer",
        },
      );

      const pdfData = await pdfParse(response.data);

      // Split the text into lines
      const lines: string[] = pdfData.text.split("\n");

      // Initialize the essay structure
      const essay: SIPEEssay = {
        title: "Liikennevakuutuksen Korvausohjeet 2024",
        url: "https://www.liipo.fi/media/liikennevakuutuksen-korvausohjeet-2024.pdf",
        content: pdfData.text,
        length: pdfData.text.length,
        tokens: calculateTokens(pdfData.text),
        chunks: [],
        toc: {},
      };

      console.log("--- Extracting Table of Contents ---");

      // Extract TOC (this is a simplified example based on page number patterns)
      lines.forEach((line, index) => {
        // Use a pattern matching logic for TOC lines (e.g., "Section title .... Page X")
        const tocMatch = line.match(/(.*)\s+(\d+)$/);
        if (tocMatch) {
          const title = tocMatch[1].trim();
          const pageNumber = parseInt(tocMatch[2]);
          essay.toc[title] = pageNumber;
          console.log(
            `Found TOC entry: Title = "${title}", Page = ${pageNumber}`,
          );
        }
      });

      console.log("--- Finished Extracting TOC ---");
      console.log("Extracted TOC:", essay.toc);

      return essay;
    } catch (error) {
      console.error("Error during metadata extraction:", error);
      throw error;
    }
  };
// Function to calculate tokens (you can replace this with a proper tokenizer later)
const calculateTokens = (text: string): number => {
  // A simple tokenizer that splits by spaces
  return text.split(/\s+/).length;
};

const getEssayLiikennevakuutuslaki = async (linkObj: {
  url: string;
  title: string;
  law: string;
  header?: string;
}) => {
  const { title, url } = linkObj;

  const essay: SIPEEssay = {
    title: "",
    url: "",
    content: "",
    length: 0,
    tokens: 0,
    chunks: [],
  };

  const fullLink = BASE_URL.Liikennevakuutuslaki + url;

  const html = await axios.get(fullLink);
  const $ = cheerio.load(html.data);

  // Locate the section by the title and extract the following <p> elements
  const sectionHeader = $(`h5.ot:contains('${title}')`);
  let sectionText = "";

  // Get the next sibling elements until the next header
  sectionHeader.nextAll().each((index, element) => {
    if ($(element).is("h5")) {
      return false; // Exit the loop if another header is found
    }
    if ($(element).is("p.py")) {
      sectionText += $(element).text().trim() + "\n";
    }
  });

  // After accumulating sectionText, check if it is not empty
  if (sectionText.trim() !== "") {
    essay.title = title;
    essay.url = fullLink;
    essay.content = sectionText.trim();
    essay.length = sectionText.length;
    essay.tokens = encode(sectionText).length;

    return essay;
  } else {
    return null; // Return null if sectionText is empty
  }
};

const getEssayVahingonkorvauslaki = async (linkObj: {
  url: string;
  title: string;
  law: string;
  header?: string;
}) => {
  const { title, url, header } = linkObj;

  const essay: SIPEEssay = {
    title: "",
    url: "",
    content: "",
    length: 0,
    tokens: 0,
    chunks: [],
  };

  const fullLink = BASE_URL.Vahingonkorvauslaki + url;

  const html = await axios.get(fullLink);
  const $ = cheerio.load(html.data);

  // Locate the section by the title and extract the following <p> elements

  const sectionHeader = $(`h5:contains('${title}')`);
  let sectionText = "";

  // Get the next sibling elements until the next header
  sectionHeader.nextAll().each((index, element) => {
    if ($(element).is("h4")) {
      return false; // Exit the loop if another header is found
    }

    if ($(element).is("p.py")) {
      sectionText += $(element).text().trim() + "\n";
    }
  });

  // After accumulating sectionText, check if it is not empty
  if (sectionText.trim() !== "") {
    essay.title = header + " " + title;
    essay.url = fullLink;
    essay.content = sectionText.trim();
    essay.length = sectionText.length;
    essay.tokens = encode(sectionText).length;

    return essay;
  } else {
    return null; // Return null if sectionText is empty
  }
};

const getEssayVammaispalvelulaki = async (linkObj: {
  url: string;
  title: string;
  law: string;
  header?: string;
}) => {
  const { title, url, header } = linkObj;

  const essay: SIPEEssay = {
    title: "",
    url: "",
    content: "",
    length: 0,
    tokens: 0,
    chunks: [],
  };

  const fullLink = BASE_URL.Vammaispalvelulaki + url;

  const html = await axios.get(fullLink);
  const $ = cheerio.load(html.data);

  // Locate the section by the title and extract the following <p> elements

  const sectionHeader = $(`h5.ot:contains('${title}')`);
  let sectionText = "";

  // Get the next sibling elements until the next header
  sectionHeader.nextAll().each((index, element) => {
    if ($(element).is("p.py")) {
      sectionText += $(element).text().trim() + "\n";
    }
    if ($(element).is("h5.ot")) {
      return false; // Exit the loop if another header is found
    }
  });

  // After accumulating sectionText, check if it is not empty
  if (sectionText.trim() !== "") {
    essay.title = header + ": " + title;
    essay.url = fullLink;
    essay.content = sectionText.trim();
    essay.length = sectionText.length;
    essay.tokens = encode(sectionText).length;

    return essay;
  } else {
    return null; // Return null if sectionText is empty
  }
};

const getEssaySairausvakuutuslaki = async (linkObj: {
  url: string;
  title: string;
  law: string;
  header?: string;
}) => {
  const { title, url, header } = linkObj;

  const essay: SIPEEssay = {
    title: "",
    url: "",
    content: "",
    length: 0,
    tokens: 0,
    chunks: [],
  };

  const fullLink = BASE_URL.Sairausvakuutuslaki + url;

  const html = await axios.get(fullLink);
  const $ = cheerio.load(html.data);

  // Locate the section by the title and extract the following <p> elements

  const sectionHeader = $(`h5:contains('${title}')`);
  let sectionText = "";

  // Get the next sibling elements until the next header
  sectionHeader.nextAll().each((index, element) => {
    if ($(element).is("p")) {
      sectionText += $(element).text().trim() + "\n";
    }
    if ($(element).is("h5.ot")) {
      return false; // Exit the loop if another header is found
    }
  });

  // After accumulating sectionText, check if it is not empty
  if (sectionText.trim() !== "") {
    essay.title = header + ": " + title;
    essay.url = fullLink;
    essay.content = sectionText.trim();
    essay.length = sectionText.length;
    essay.tokens = encode(sectionText).length;

    return essay;
  } else {
    return null; // Return null if sectionText is empty
  }
};

const getEssayKelaKorvauksetYksityisestaSairaanhoidosta = async () => {
  const essay: SIPEEssay = {
    title: "",
    url: "",
    content: "",
    length: 0,
    tokens: 0,
    chunks: [],
  };

  const html = await axios.get(
    BASE_URL.kelaKorvauksetYksityisestaSairaanhoidosta,
  );
  const $ = cheerio.load(html.data);

  const sectionHeader = $(`h1`);
  let sectionText = "";

  // Get the next sibling elements until the next header
  sectionHeader.nextAll().each((index, element) => {
    sectionText += $(element).text().trim() + "\n";

    if ($(element).is("h2") && $(element).text().trim() === "Lue lisää") {
      return false; // Exit the loop if another header is found
    }
  });

  // After accumulating sectionText, check if it is not empty
  if (sectionText.trim() !== "") {
    essay.title = "Korvaukset yksityisestä sairaanhoidosta";
    essay.url = BASE_URL.kelaKorvauksetYksityisestaSairaanhoidosta;
    essay.content = sectionText.trim();
    essay.length = sectionText.length;
    essay.tokens = encode(sectionText).length;

    return essay;
  } else {
    return null; // Return null if sectionText is empty
  }
};

const getEssayYksityistapaturmavakuutus = async () => {
  const essay: SIPEEssay = {
    title: "",
    url: "",
    content: "",
    length: 0,
    tokens: 0,
    chunks: [],
  };

  const html = await axios.get(BASE_URL.Yksityistapaturmavakuutus);
  const $ = cheerio.load(html.data);

  const sectionHeader = $(`h2:contains('Yksityistapaturmavakuutus')`);
  let sectionText = "";

  // Get the next sibling elements until the next header
  sectionHeader.nextAll().each((index, element) => {
    sectionText += $(element).text().trim() + "\n";

    if ($(element).is("div.container")) {
      return false; // Exit the loop if another header is found
    }
  });

  // After accumulating sectionText, check if it is not empty
  if (sectionText.trim() !== "") {
    essay.title = "Yksityistapaturmavakuutus";
    essay.url = BASE_URL.kelaKorvauksetYksityisestaSairaanhoidosta;
    essay.content = sectionText.trim();
    essay.length = sectionText.length;
    essay.tokens = encode(sectionText).length;

    return essay;
  } else {
    return null; // Return null if sectionText is empty
  }
};

const getEssayKansaneläkelaki = async (linkObj: {
  url: string;
  title: string;
  law: string;
  header?: string;
}) => {
  const { title, url, header } = linkObj;

  const essay: SIPEEssay = {
    title: "",
    url: "",
    content: "",
    length: 0,
    tokens: 0,
    chunks: [],
  };

  const fullLink = BASE_URL.Kansaneläkelaki + url;

  const html = await axios.get(fullLink);
  const $ = cheerio.load(html.data);

  // Locate the section by the title and extract the following <p> elements

  const sectionHeader = $(`h5:contains('${title}')`);
  let sectionText = "";

  // Get the next sibling elements until the next header
  sectionHeader.nextAll().each((index, element) => {
    if ($(element).is("p")) {
      sectionText += $(element).text().trim() + "\n";
    }
    if ($(element).is("h5.ot")) {
      return false; // Exit the loop if another header is found
    }
  });

  // After accumulating sectionText, check if it is not empty
  if (sectionText.trim() !== "") {
    essay.title = header + ": " + title;
    essay.url = fullLink;
    essay.content = sectionText.trim();
    essay.length = sectionText.length;
    essay.tokens = encode(sectionText).length;

    return essay;
  } else {
    return null; // Return null if sectionText is empty
  }
};

const getEssaykorvaamiKriisinhallintatehtava = async (linkObj: {
  url: string;
  title: string;
  law: string;
  header?: string;
}) => {
  const { title, url, header } = linkObj;

  const essay: SIPEEssay = {
    title: "",
    url: "",
    content: "",
    length: 0,
    tokens: 0,
    chunks: [],
  };

  const fullLink = BASE_URL.korvaamiKriisinhallintatehtava + url;

  const html = await axios.get(fullLink);
  const $ = cheerio.load(html.data);

  // Locate the section by the title and extract the following <p> elements

  const sectionHeader = $(`h5:contains('${title}')`);
  let sectionText = "";

  // Get the next sibling elements until the next header
  sectionHeader.nextAll().each((index, element) => {
    if ($(element).is("p")) {
      sectionText += $(element).text().trim() + "\n";
    }
    if ($(element).is("h5.ot")) {
      return false; // Exit the loop if another header is found
    }
  });

  // After accumulating sectionText, check if it is not empty
  if (sectionText.trim() !== "") {
    essay.title = header + ": " + title;
    essay.url = fullLink;
    essay.content = sectionText.trim();
    essay.length = sectionText.length;
    essay.tokens = encode(sectionText).length;

    return essay;
  } else {
    return null; // Return null if sectionText is empty
  }
};

const chunkEssay = async (essay: SIPEEssay): Promise<SIPEEssay> => {
  const { title, url, content } = essay;
  const essayTextChunks: string[] = [];
  let chunkText = "";

  // Split content by more granular delimiters with an additional check for paragraph breaks
  const segments = content.split(/(?<=\.)\s+|\n\n/); // Split by periods followed by space, or paragraph breaks

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const segmentTokenLength = encode(segment).length;
    const chunkTextTokenLength = encode(chunkText).length;

    // If adding this segment exceeds the chunk size, finalize the current chunk
    if (chunkTextTokenLength + segmentTokenLength > CHUNK_SIZE) {
      if (chunkText.trim().length > 0) {
        // Ensure only non-empty chunks are added
        essayTextChunks.push(chunkText.trim());
      }
      chunkText = ""; // Reset chunk text for the next chunk
    }

    chunkText += segment + ". "; // Re-add the period or delimiter
  }

  if (chunkText.trim().length > 0) {
    // Add any remaining text as the last chunk
    essayTextChunks.push(chunkText.trim());
  }

  // Map chunks into the final essay chunk structure
  const essayChunks = essayTextChunks.map((text) => {
    const trimmedText = text.trim();

    return {
      essay_title: title,
      essay_url: url,
      content: trimmedText,
      content_length: trimmedText.length,
      content_tokens: encode(trimmedText).length,
      embedding: [],
    } as SIPEChunk;
  });

  // Combine small chunks with the previous one if necessary
  if (essayChunks.length > 1) {
    for (let i = 1; i < essayChunks.length; i++) {
      const chunk = essayChunks[i];
      const prevChunk = essayChunks[i - 1];

      if (chunk.content_tokens < 100 && prevChunk) {
        prevChunk.content += " " + chunk.content;
        prevChunk.content_length += chunk.content_length;
        prevChunk.content_tokens += chunk.content_tokens;
        essayChunks.splice(i, 1);
        i--;
      }
    }
  }

  return {
    ...essay,
    chunks: essayChunks,
  };
};

(async () => {
  const essays = [];

  // console.log("Processing Sosiaaliturvaopas...");

  // const essaySosiaaliturvaopas = await getEssaySosiaaliturvaopas();

  // if (essaySosiaaliturvaopas) {
  //   console.log("Chunking essay...", essaySosiaaliturvaopas.title);
  //   const chunkedEssay = await chunkEssay(essaySosiaaliturvaopas);
  //   essays.push(chunkedEssay);
  // }

  console.log("Processing LiikennevakuutuksenKorvausohjeet...");

  const essayLiikennevakuutuksenKorvausohjeet =
    await getEssayLiikennevakuutuksenKorvausohjeet();

  if (essayLiikennevakuutuksenKorvausohjeet) {
    console.log(
      "Chunking essay...",
      essayLiikennevakuutuksenKorvausohjeet.title,
    );
    const chunkedEssay = await chunkEssay(
      essayLiikennevakuutuksenKorvausohjeet,
    );
    essays.push(chunkedEssay);
  }

  console.log("Processing Liikennevakuutuslaki...");

  const linksLiikennevakuutuslaki = await getLinksLiikennevakuutuslaki();

  for (let i = 0; i < linksLiikennevakuutuslaki.length; i++) {
    const essay = await getEssayLiikennevakuutuslaki(
      linksLiikennevakuutuslaki[i],
    );

    if (essay) {
      console.log("Chunking essay...", essay.title);
      const chunkedEssay = await chunkEssay(essay);
      essays.push(chunkedEssay);
    }
  }

  console.log("Processing Vahingonkorvauslaki...");

  const linksVahingonkorvauslaki = await getLinksVahingonkorvauslaki();

  for (let i = 0; i < linksVahingonkorvauslaki.length; i++) {
    const essay = await getEssayVahingonkorvauslaki(
      linksVahingonkorvauslaki[i],
    );

    if (essay) {
      console.log("Chunking essay: ", essay.title);
      const chunkedEssay = await chunkEssay(essay);
      essays.push(chunkedEssay);
    }
  }

  console.log("Processing Vammaispalvelulaki...");

  const linksVammaispalvelulaki = await getLinksVammaispalvelulaki();

  for (let i = 0; i < linksVammaispalvelulaki.length; i++) {
    const essay = await getEssayVammaispalvelulaki(linksVammaispalvelulaki[i]);

    if (essay) {
      console.log("Chunking essay: ", essay.title);
      const chunkedEssay = await chunkEssay(essay);
      essays.push(chunkedEssay);
    }
  }

  console.log("Processing Sairausvakuutuslaki...");

  const linksSairausvakuutuslaki = await getLinksSairausvakuutuslaki();

  for (let i = 0; i < linksSairausvakuutuslaki.length; i++) {
    const essay = await getEssaySairausvakuutuslaki(
      linksSairausvakuutuslaki[i],
    );

    if (essay) {
      console.log("Chunking essay: ", essay.title);
      const chunkedEssay = await chunkEssay(essay);
      essays.push(chunkedEssay);
    }
  }

  console.log("Processing KelaKorvauksetYksityisestaSairaanhoidosta...");

  const essay_KelaKorvaus =
    await getEssayKelaKorvauksetYksityisestaSairaanhoidosta();

  if (essay_KelaKorvaus) {
    console.log("Chunking essay: ", essay_KelaKorvaus.title);
    const chunkedEssay = await chunkEssay(essay_KelaKorvaus);
    essays.push(chunkedEssay);
  }

  console.log("Processing Yksityistapaturmavakuutus...");

  const essay_Yksityistapaturmavakuutus =
    await getEssayYksityistapaturmavakuutus();

  if (essay_Yksityistapaturmavakuutus) {
    console.log("Chunking essay: ", essay_Yksityistapaturmavakuutus.title);
    const chunkedEssay = await chunkEssay(essay_Yksityistapaturmavakuutus);
    essays.push(chunkedEssay);
  }

  console.log("Processing Kansaneläkelaki...");

  const linksKansaneläkelaki = await getLinksKansaneläkelaki();

  for (let i = 0; i < linksKansaneläkelaki.length; i++) {
    const essay = await getEssayKansaneläkelaki(linksKansaneläkelaki[i]);

    if (essay) {
      console.log("Chunking essay: ", essay.title);
      const chunkedEssay = await chunkEssay(essay);
      essays.push(chunkedEssay);
    }
  }

  console.log("Processing korvaamiKriisinhallintatehtava...");

  const linkskorvaamiKriisinhallintatehtava =
    await getLinkskorvaamiKriisinhallintatehtava();

  for (let i = 0; i < linkskorvaamiKriisinhallintatehtava.length; i++) {
    const essay = await getEssaykorvaamiKriisinhallintatehtava(
      linkskorvaamiKriisinhallintatehtava[i],
    );

    if (essay) {
      console.log("Chunking essay: ", essay.title);
      const chunkedEssay = await chunkEssay(essay);
      essays.push(chunkedEssay);
    }
  }

  const json: SIPEJSON = {
    url: "sipe.ai",
    length: essays.reduce((acc, essay) => acc + essay.length, 0),
    tokens: essays.reduce((acc, essay) => acc + essay.tokens, 0),
    essays,
  };
  fs.writeFileSync("scripts/sipe.json", JSON.stringify(json));
})();
