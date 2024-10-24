import axios from "axios";
import * as cheerio from "cheerio";
import pdfParse from "pdf-parse";
import { BASE_URL } from "./prepare-links";
import { SIPEEssay } from "@/types";
import { encode } from "gpt-3-encoder";

// Fetch the essay and ToC
export const getEssaySosiaaliturvaopas = async () => {
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
export const extractTableOfContents = (
  text: string,
): Record<string, number> => {
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

// Fetch the essay and ToC
export const getEssayLiikennevakuutuksenKorvausohjeet = async () => {
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

export const getEssayLiikennevakuutuslaki = async (linkObj: {
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

export const getEssayVahingonkorvauslaki = async (linkObj: {
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

export const getEssayVammaispalvelulaki = async (linkObj: {
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

export const getEssaySairausvakuutuslaki = async (linkObj: {
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

export const getEssayKelaKorvauksetYksityisestaSairaanhoidosta = async () => {
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

export const getEssayYksityistapaturmavakuutus = async () => {
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

export const getEssayKansaneläkelaki = async (linkObj: {
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

export const getEssaykorvaamiKriisinhallintatehtava = async (linkObj: {
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
