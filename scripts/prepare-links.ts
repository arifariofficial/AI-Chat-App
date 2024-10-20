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

export const getLinksVahingonkorvauslaki = async (): Promise<Links[]> => {
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

export const getLinksVammaispalvelulaki = async (): Promise<Links[]> => {
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

export const getLinksSairausvakuutuslaki = async (): Promise<Links[]> => {
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

export const getLinksKansaneläkelaki = async (): Promise<Links[]> => {
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

export const getLinkskorvaamiKriisinhallintatehtava = async (): Promise<
  Links[]
> => {
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
