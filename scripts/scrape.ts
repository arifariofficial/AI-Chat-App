import { SIPEChunk, SIPEEssay, SIPEJSON } from "@types";

import { encode } from "gpt-3-encoder";
import fs from "fs";
import {
  getEssayKansaneläkelaki,
  getEssayKelaKorvauksetYksityisestaSairaanhoidosta,
  getEssaykorvaamiKriisinhallintatehtava,
  getEssayLiikennevakuutuksenKorvausohjeet,
  getEssayLiikennevakuutuslaki,
  getEssaySairausvakuutuslaki,
  getEssaySosiaaliturvaopas,
  getEssayVahingonkorvauslaki,
  getEssayVammaispalvelulaki,
  getEssayYksityistapaturmavakuutus,
} from "./prepare.essays";
import {
  getLinksKansaneläkelaki,
  getLinkskorvaamiKriisinhallintatehtava,
  getLinksLiikennevakuutuslaki,
  getLinksSairausvakuutuslaki,
  getLinksVahingonkorvauslaki,
  getLinksVammaispalvelulaki,
} from "./prepare-links";

const CHUNK_SIZE = 200;

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
