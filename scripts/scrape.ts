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

    if (linkUrl && linkUrl.startsWith("#L")) {
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

    if (linkUrl && linkUrl.startsWith("#L")) {
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

const getEssaySosiaaliturvaopas = async () => {
  const essay: SIPEEssay = {
    title: "",
    url: "",
    content: "",
    length: 0,
    tokens: 0,
    chunks: [],
  };
  try {
    const response = await axios.get(BASE_URL.Sosiaaliturvaopas, {
      responseType: "arraybuffer",
    });

    const pdfData = await pdfParse(response.data);

    (essay.title = "Sosiaaliturvaopas 2018"),
      (essay.url = BASE_URL.Sosiaaliturvaopas);
    essay.content = pdfData.text;

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
const getEssayLiikennevakuutuksenKorvausohjeet = async () => {
  const essay: SIPEEssay = {
    title: "",
    url: "",
    content: "",
    length: 0,
    tokens: 0,
    chunks: [],
  };
  try {
    const response = await axios.get(
      BASE_URL.LiikennevakuutuksenKorvausohjeet,
      {
        responseType: "arraybuffer",
      },
    );

    const pdfData = await pdfParse(response.data);

    (essay.title = "Liikennevakuutuksen korvausohjeet 2024"),
      (essay.url = BASE_URL.LiikennevakuutuksenKorvausohjeet);
    essay.content = pdfData.text;

    return essay;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to process Liikennevakuutuksen korvausohjeet pdf: ${error.message}`,
      );
    } else {
      throw new Error("An unknown error occurred while processing pdf file");
    }
  }
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

const chunkEssay = async (essay: SIPEEssay): Promise<SIPEEssay> => {
  const { title, url, content } = essay;
  const essayTextChunks: string[] = [];
  let chunkText = "";

  // Split content by more granular delimiters
  const segments = content.split(/[.\n;]/); // Split by period, newline, or semicolon

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const segmentTokenLength = encode(segment).length;
    const chunkTextTokenLength = encode(chunkText).length;

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

  console.log("Processing Sosiaaliturvaopas...");

  const essaySosiaaliturvaopas = await getEssaySosiaaliturvaopas();
  if (essaySosiaaliturvaopas) {
    console.log("Chunking essay...", essaySosiaaliturvaopas.title);
    const chunkedEssay = await chunkEssay(essaySosiaaliturvaopas);
    essays.push(chunkedEssay);
  }

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
      console.log("Chunking essay...", essay.title);
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
