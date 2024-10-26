import axios from "axios";
import * as cheerio from "cheerio";

export const BASE_URL = {
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

interface Links {
  title: string;
  url: string;
  law: string;
  header?: string;
}

export const getLinksLiikennevakuutuslaki = async (): Promise<Links[]> => {
  const linksArr: Links[] = [];

  const response = await axios.get(BASE_URL.Liikennevakuutuslaki);
  const $ = cheerio.load(response.data);

  // Find all "a" elements within the div with id="toc"
  $("#toc a").each((_, el) => {
    // Change (element) to (_, el) to access the HTML element
    const $el = $(el);

    const linkUrl = $el.attr("href");
    let title = $el.text();

    // Remove "1 luku - ", "2 luku - ", etc., and "§ - " from section titles in a single line
    title = title.replace(/^\d+\s*[a-zA-Z]?\s*(luku - |§ - )/, "");

    if (linkUrl && linkUrl.startsWith("#")) {
      linksArr.push({ title, url: linkUrl, law: "Liikennevakuutuslaki" });
    }
  });

  return linksArr;
};

export const getLinksVahingonkorvauslaki = async (): Promise<Links[]> => {
  const linksArr: Links[] = [];

  const response = await axios.get(BASE_URL.Vahingonkorvauslaki);
  const $ = cheerio.load(response.data);
  let header = "";

  // Find all "a" elements within the div with id="toc"
  $("#toc a").each((_, el) => {
    // Note the change here: (_, el) instead of (element)
    const $el = $(el);

    if ($el.hasClass("h4")) {
      header = $el.text();
    }
    const linkUrl = $el.attr("href");
    let title = $el.text();

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

export const getLinksVammaispalvelulaki = async (): Promise<Links[]> => {
  const linksArr: Links[] = [];

  const response = await axios.get(BASE_URL.Vammaispalvelulaki);
  const $ = cheerio.load(response.data);
  let header = "";

  // Find all "a" elements within the div with id="toc"
  $("#toc a").each((_, element) => {
    // Reset linkUrl and title for each iteration
    let linkUrl = "";
    let title = "";

    const $el = $(element);

    // Update header if the element has class "h4"
    if ($el.hasClass("h4")) {
      header = $el.text();
    }

    // Set linkUrl and title if the element has class "h5"
    if ($el.hasClass("h5")) {
      linkUrl = $el.attr("href") || ""; // Default to empty string if href is undefined
      title = $el.text();
    }

    // Clean up header to remove unwanted prefix patterns
    header = header.replace(/^\d+\s*[a-zA-Z]?\s*(luku - |§ - )/, "");

    // Clean up title to remove unwanted patterns and trim extra whitespace
    title = title.replace(/^\d+\s*§\s*-\s*/, "").trim();

    // Push to linksArr if linkUrl and title meet criteria
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

export const getLinksSairausvakuutuslaki = async (): Promise<Links[]> => {
  const linksArr: Links[] = [];
  const response = await axios.get(BASE_URL.Sairausvakuutuslaki);
  const $ = cheerio.load(response.data);
  let header = "";
  let stopProcessing = false;

  // Iterate over all "a" elements within the div with id="toc"
  $("#toc a").each((_, element) => {
    if (stopProcessing) return; // Exit early if stopProcessing flag is set

    // Initialize linkUrl and title for each iteration
    let linkUrl = "";
    let title = "";

    const $el = $(element);

    // Set header if the element has class "h4"
    if ($el.hasClass("h4")) {
      header = $el
        .text()
        .replace(/^\d+\s*[a-zA-Z]?\s*(luku - |§ - )/, "")
        .trim();
    }

    // Get linkUrl and title if the element has class "h5"
    if ($el.hasClass("h5")) {
      linkUrl = $el.attr("href") || ""; // Default to empty if href is undefined
      title = $el
        .text()
        .replace(/^\d+\s*§\s*-\s*/, "")
        .trim();
    }

    // Set stopProcessing if specific text is found
    if (
      $el.is("a") &&
      $el.text().trim() === "Muutossäädösten voimaantulo ja soveltaminen:"
    ) {
      stopProcessing = true; // Set flag to stop further processing
      return;
    }

    // Only push to linksArr if both linkUrl and title are set and linkUrl starts with "#"
    if (linkUrl && title && linkUrl.startsWith("#")) {
      linksArr.push({
        title,
        url: linkUrl,
        law: "Sairausvakuutuslaki",
        header,
      });
    }
  });

  // Ensure the main function returns linksArr
  return linksArr;
};

export const getLinksKansaneläkelaki = async (): Promise<Links[]> => {
  const linksArr: Links[] = [];

  const response = await axios.get(BASE_URL.Kansaneläkelaki);
  const $ = cheerio.load(response.data);
  let header = "";
  let stopProcessing = false;

  // Iterate over all "a" elements within the div with id="toc"
  $("#toc a").each((_, element) => {
    if (stopProcessing) return; // Exit early if stopProcessing flag is set

    // Initialize linkUrl and title for each iteration
    let linkUrl = "";
    let title = "";

    const $el = $(element);

    // Update header if the element has class "h4"
    if ($el.hasClass("h4")) {
      header = $el
        .text()
        .replace(/^\d+\s*[a-zA-Z]?\s*(luku - |§ - )/, "")
        .trim();
    }

    // Get linkUrl and title if the element has class "h5"
    if ($el.hasClass("h5")) {
      linkUrl = $el.attr("href") || ""; // Default to empty if href is undefined
      title = $el
        .text()
        .replace(/^\d+\s*§\s*-\s*/, "")
        .trim();
    }

    // Set stopProcessing if specific text is found
    if (
      $el.is("a") &&
      $el.text().trim() === "Muutossäädösten voimaantulo ja soveltaminen:"
    ) {
      stopProcessing = true; // Set flag to stop further processing
      return;
    }

    // Only push to linksArr if both linkUrl and title meet criteria
    if (linkUrl && title && linkUrl.startsWith("#")) {
      linksArr.push({
        title,
        url: linkUrl,
        law: "Kansaneläkelaki",
        header,
      });
    }
  });

  // Ensure the main function returns linksArr
  return linksArr;
};

export const getLinkskorvaamiKriisinhallintatehtava = async (): Promise<
  Links[]
> => {
  const linksArr: Links[] = [];

  const response = await axios.get(BASE_URL.korvaamiKriisinhallintatehtava);
  const $ = cheerio.load(response.data);
  let header = "";
  let stopProcessing = false;

  // Find all "a" elements within the div with id="toc"
  $("#toc a").each((_, element) => {
    if (stopProcessing) return; // Exit early if stopProcessing flag is set

    // Initialize linkUrl and title for each iteration
    let linkUrl = "";
    let title = "";

    const $el = $(element);

    // Set header if the element has class "h4"
    if ($el.hasClass("h4")) {
      header = $el
        .text()
        .replace(/^\d+\s*[a-zA-Z]?\s*(luku - |§ - )/, "")
        .trim();
    }

    // Get linkUrl and title if the element has class "h5"
    if ($el.hasClass("h5")) {
      linkUrl = $el.attr("href") || ""; // Default to empty if href is undefined
      title = $el
        .text()
        .replace(/^\d+\s*§\s*-\s*/, "")
        .trim();
    }

    // Set stopProcessing if specific text is found
    if (
      $el.is("a") &&
      $el.text().trim() === "Muutossäädösten voimaantulo ja soveltaminen:"
    ) {
      stopProcessing = true; // Set flag to stop further processing
      return;
    }

    // Only push to linksArr if both linkUrl and title meet criteria
    if (linkUrl && title && linkUrl.startsWith("#")) {
      linksArr.push({
        title,
        url: linkUrl,
        law: "Laki tapaturman ja palvelussairauden korvaamisesta kriisinhallintatehtävässä",
        header,
      });
    }
  });

  // Ensure the main function returns linksArr
  return linksArr;
};
