import fs from "fs";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

// Define the structure for fine-tuning data
interface FineTuneData {
  role: "system" | "user" | "assistant";
  content: string;
}
// Define the structure for fine-tuning data
interface FineTuneDataFormated {
  messages: FineTuneData[];
}

// Function to retrieve and process chat data
async function prepareFineTuneData() {
  const chatIds = [
    "Zp6041Cpb2uQ-FRMMeaYc",
    "KUAtPPq_QitxqcbrNNpax",
    "I-nmsAuHbRhTppsiENIXi",
  ];

  const systemPrompt = `\
  Olet sosiaaliturva-asiantuntija, joka on erikoistunut pitkäaikaissairaiden ja vammaisten henkilöiden oikeuksiin.
  
  Sinä ja käyttäjä voitte keskustella vakuutustapauksista Suomessa, joissa käyttäjä on joutunut onnettomuuteen ja haluaa tietää kaikki edut, joita hän voi saada vakuutusyhtiöltä tai Kelalta. Vakuutusyhtiöt pyrkivät usein salaamaan tietoa käyttäjän oikeuksista saada tukea tai rahallista korvausta.
  
  Vastaa käyttäjän kysymykseen:  
  Keskittyen ymmärtämään heidän tilanteensa. Kysy **vain yksi** tarkentava kysymys tai anna ytimekäs vastaus annetun kontekstin perusteella.
  
  ### Ohjeet:
  - Varmista, että ymmärrät käyttäjän tilanteen tarkasti ennen kuin vastaat.
  - Jos käyttäjän kysymys voi johtaa useisiin eri ratkaisuihin tai tarvitset lisätietoja, kysy selventäviä ja tarkentavia kysymyksiä.
  - Kysy tarvittaessa kaikki olennaiset tiedot, jotta voit antaa parhaan mahdollisen neuvon.
  - Korosta, että vakuutusyhtiöllä on ensisijainen korvausvastuu liikennevahingoissa.
  - Vältä mainitsemasta Kelan tukia tai korvauksia, ellei vakuutusyhtiö ole hylännyt korvaushakemusta.
  - Anna konkreettisia neuvoja ja ohjeita käyttäjän tilanteeseen perustuen.
  - Selitä käyttäjälle heidän oikeutensa, kuten oikeus pyytää vakuutusyhtiöltä kaikki heitä koskevat asiakirjat ja sisäiset keskustelut.
  - Kerro käyttäjälle mahdollisuudesta valittaa vakuutusyhtiön päätöksestä ja miten se tehdään.
  - Käytä empaattista ja ystävällistä sävyä.
  - Vältä tarpeettomia yksityiskohtia, jotka eivät liity suoraan käyttäjän kysymykseen.
  
  ### Konteksti:
  - "Vakuutusyhtiö korvaa myös esimerkiksi apuvälineet."
  - "Oletko ollut yhteydessä vakuutusyhtiöön?"
  - "Voit pyytää vakuutusyhtiöltä kaikki sinua koskevat asiakirjat, mukaan lukien heidän sisäiset keskustelut."
  - "Sinulla on oikeus valittaa vakuutusyhtiön päätöksestä."
  - "General Data Protection Regulation (yleinen tietosuoja-asetus) mukaisesti sinulla on oikeus tietää, mitä tietoja vakuutusyhtiöllä on sinusta."
  - "Jos vakuutusyhtiö kieltäytyy korvaamasta, voit ottaa yhteyttä Kelaan."
  - "Koska sinulla on epäilys hermovauriosta, olisi hyödyllistä käydä neurologilla."
  
  Palauta vastaus tai yksi tarkentava kysymys, joka liittyy suoraan käyttäjän tilanteeseen. Jos kysymys ei liity ohjeisiin tai sosiaaliturva-asioihin, erityisesti vammaisten ja pitkäaikaissairaiden oikeuksiin, **älä vastaa kysymykseen**.
  `;

  // Prepare the fine-tuning dataset
  const fineTuneDataFormated: FineTuneDataFormated[] = [];

  try {
    for (const id of chatIds) {
      // Fetch chats and their messages for the user
      const chat = await prisma.chat.findFirst({
        where: { id },
        include: { messages: true },
        orderBy: { createdAt: "asc" },
      });

      if (chat) {
        const messages = chat.messages;

        const formattedMessages: FineTuneData[] = [
          {
            role: "system",
            content: systemPrompt,
          },
        ];

        let userCount = 0;
        let assistantCount = 0;

        messages.forEach((message) => {
          if (message.role === "user" && userCount < 2) {
            formattedMessages.push({ role: "user", content: message.content });
            userCount++;
          } else if (message.role === "assistant" && assistantCount < 2) {
            formattedMessages.push({
              role: "assistant",
              content: message.edited || message.content,
            });
            assistantCount++;
          }
        });

        // Ensure exactly 5 messages (1 system, 2 user, 2 assistant)
        while (formattedMessages.length < 5) {
          if (userCount < 2) {
            formattedMessages.push({
              role: "user",
              content: "Placeholder user message",
            });
            userCount++;
          } else if (assistantCount < 2) {
            formattedMessages.push({
              role: "assistant",
              content: "Placeholder assistant message",
            });
            assistantCount++;
          }
        }

        fineTuneDataFormated.push({ messages: formattedMessages });
      }
    }

    // Ensure at least 10 entries in fineTuneDataFormated
    while (fineTuneDataFormated.length < 10) {
      fineTuneDataFormated.push(
        ...fineTuneDataFormated.slice(0, 10 - fineTuneDataFormated.length),
      );
    }

    // Save the data to a JSON file
    const jsonFilePath = "./fine_tune_data.json";
    fs.writeFileSync(
      jsonFilePath,
      JSON.stringify(fineTuneDataFormated, null, 2),
    );
    console.log(`Fine-tuning data saved to ${jsonFilePath}`);

    // Save the data to a JSONL file
    const jsonlFilePath = "./fine_tune_data.jsonl";
    const jsonlData = fineTuneDataFormated
      .map((item) => JSON.stringify(item))
      .join("\n");
    fs.writeFileSync(jsonlFilePath, jsonlData);
    console.log(`Fine-tuning data saved to ${jsonlFilePath}`);
  } catch (error) {
    console.error("Error preparing fine-tuning data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

prepareFineTuneData();
