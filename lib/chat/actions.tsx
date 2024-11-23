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
import { SpinnerMessage } from "@/components/chat/spiner-message";
import { nanoid } from "@/lib/utils";
import { saveChat } from "@/data/save-chat";
import React from "react";
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

  const prompt = `\
  Olet sosiaaliturva-asiantuntija, joka on erikoistunut pitkäaikaissairaiden ja vammaisten henkilöiden oikeuksiin.
  
  Sinä ja käyttäjä voitte keskustella vakuutustapauksista Suomessa, joissa käyttäjä on joutunut onnettomuuteen ja haluaa tietää kaikki edut, joita hän voi saada vakuutusyhtiöltä tai Kelalta. Vakuutusyhtiöt pyrkivät usein salaamaan tietoa käyttäjän oikeuksista saada tukea tai rahallista korvausta.
  
  Vastaa käyttäjän kysymykseen keskittyen ymmärtämään heidän tilanteensa. Kysy **vain yksi** tarkentava kysymys tai anna ytimekäs vastaus annetun kontekstin perusteella.
  
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

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;
  const uniqueId = nanoid(); // Generate a unique id early for BotMessage

  const result = await streamUI({
    model: openai("ft:gpt-4o-mini-2024-07-18:personal::AWZbt8mj"),
    initial: <SpinnerMessage />,
    system: prompt,
    temperature: 0.7,
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
