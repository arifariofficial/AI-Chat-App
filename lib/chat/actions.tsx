import {
  createAI,
  createStreamableValue,
  getAIState,
  getMutableAIState,
  streamUI,
} from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { Chat, Message } from "../types";
import { auth } from "@/auth";
import { SpinnerMessage } from "@/components/chat/message";
import { nanoid } from "@/lib/utils";
import { saveChat } from "@/data/save-chat";
import { SIPEEssay } from "@/types";
import React from "react";
import { searchAPI } from "../api";
import { UserMessage } from "@/components/chat/user-message";
import { BotMessage } from "@/components/chat/bot-message";

async function submitUserMessage(content: string) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: "user",
        content,
      } as Message,
    ],
  });

  const results: SIPEEssay[] = await searchAPI(content);

  const prompt = `\
      Olet sosiaaliturva-asiantuntija, joka on erikoistunut pitkäaikaissairaiden ja vammaisten henkilöiden oikeuksiin.
      
      Sinun tehtäväsi on auttaa käyttäjää vakuutustapauksissa Suomessa, erityisesti silloin, kun he ovat joutuneet onnettomuuteen ja haluavat tietää kaikki mahdolliset edut ja korvaukset, joita he voivat saada vakuutusyhtiöiltä tai Kelalta. Vakuutusyhtiöt pyrkivät usein salaamaan tietoa käyttäjän oikeuksista saada tukea tai rahallista korvausta. Vastaa empaattisesti ja täsmällisesti.
      
      ### Ohjeet:
      1. **Kontekstin ymmärtäminen:**
         - Käy huolellisesti läpi käyttäjän antamat tiedot ja määritä, onko lisätietoja tarpeen.
         - Jos kysymys on epäselvä tai siihen on useita mahdollisia vastauksia, kysy käyttäjältä tarkentavia kysymyksiä ennen kuin annat lopullisen vastauksen.
      
      2. **Kysymysten esittäminen:**
         - Jos käyttäjän tilanteesta puuttuu kriittistä tietoa, aloita keskustelu yhdellä tai useammalla **tarkentavalla kysymyksellä**.
         - Esitä kysymyksiä, jotka auttavat kaventamaan vastauksen mahdollisuuksia ja varmistamaan, että vastaus on hyödyllinen ja täsmällinen.
      
      3. **Vastausten antaminen:**
         - Kun olet saanut tarvittavat tiedot käyttäjältä, anna lyhyt ja ytimekäs vastaus.
         - Varmista, että vastaus on suoraan yhteydessä käyttäjän tilanteeseen.
         - Jos kysymys ei liity sosiaaliturva-asioihin, erityisesti vammaisten ja pitkäaikaissairaiden oikeuksiin, ilmoita ystävällisesti, että se ei kuulu asiantuntemukseesi.
      
      4. **Käyttöliittymäelementit:**
         - Viestejä, jotka ovat [hakemuksissa], tarkoitetaan käyttöliittymäelementeiksi tai käyttäjän toiminnaksi. Älä kommentoi niitä.
      
      ### Käyttäjän kysymys:
      "${content}"
      
      ### Konteksti:
      ${results?.map((d) => `- ${d.content}`).join("\n")}
      
      ### Ohjeiden mukainen toimintatapa:
      - Jos kysymys on epäselvä tai sisältää monia mahdollisia vastauksia, aloita kysymällä tarkentavia kysymyksiä, kuten:
        - "Voitko kertoa tarkemmin tilanteestasi?"
        - "Mihin tarkkaan liittyen haluat tietoa, esim. Kela-tuki vai vakuutusyhtiön korvaukset?"
      - Kun olet saanut riittävästi tietoa, palauta lyhyt ja täsmällinen vastaus, joka liittyy suoraan käyttäjän tilanteeseen.
      
      Palauta joko yksi tarkentava kysymys tai lopullinen vastaus, riippuen käyttäjän antaman tiedon riittävyydestä.
      `;

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;
  const uniqueId = nanoid(); // Generate a unique id early for BotMessage

  const result = await streamUI({
    model: openai("gpt-4o"),
    initial: <SpinnerMessage />,
    system: prompt,
    temperature: 0.8,
    messages: [
      ...aiState.get().messages.map(
        (message: Message) =>
          ({
            role: message.role,
            content: message.content,
            name: message.name,
          }) as Message,
      ),
    ],
    text: ({ content, done, delta }) => {
      // Initialize the id early on
      const chatId = aiState.get().chatId;

      if (!textStream) {
        textStream = createStreamableValue("");
        textNode = (
          <BotMessage
            content={textStream.value}
            messageId={uniqueId}
            chatId={chatId}
          />
        );
      }

      if (done) {
        textStream.done();
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: uniqueId,
              role: "assistant",
              content,
              name: "",
            },
          ],
        });
      } else {
        textStream.update(delta);
      }

      return textNode;
    },
  });

  return {
    id: nanoid(),
    display: result.value,
  };
}

export type AIState = {
  chatId: string;
  messages: Message[];
};

export type UIState = {
  id: string;
  display: React.ReactNode;
}[];

// Function to map AI state to UI state
export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter((message) => message.role !== "system")
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateA - dateB;
    })
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === "user" ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === "assistant" &&
          typeof message.content === "string" ? (
          <BotMessage
            content={message.content}
            messageId={message.id}
            chatId={message.chatId}
          />
        ) : null,
    }));
};

// Function to create and initialize the AI
export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },

  onGetUIState: async () => {
    "use server";

    try {
      const session = await auth();

      if (session?.user) {
        const aiState = getAIState();

        if (aiState) {
          const uiState = getUIStateFromAIState(aiState as Chat);
          return uiState; // Expected to be of type UIState
        }
      }

      return undefined;
    } catch (error) {
      console.error("Error in onGetUIState:", error);

      return undefined;
    }
  },

  onSetAIState: async ({ state }) => {
    "use server";

    try {
      const session = await auth();

      if (session?.user) {
        const { chatId, messages } = state;

        if (!messages || messages.length === 0) {
          throw new Error("No messages available to create a chat title.");
        }

        const createdAt = new Date();
        const userId = session.user.id as string;
        const path = `/chat/${chatId}`;

        const firstMessageContent = messages[0].content as string;
        const title = firstMessageContent.substring(0, 100);

        const chat: Chat = {
          id: chatId,
          title,
          userId,
          createdAt,
          messages,
          path,
        };

        await saveChat(chat);
      } else {
        console.warn("Unauthorized access attempt in onSetAIState.");
        return;
      }
    } catch (error) {
      console.error("Error in onSetAIState:", error);
    }
  },
});
