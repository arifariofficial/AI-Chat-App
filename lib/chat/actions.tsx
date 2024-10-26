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

  Sinä ja käyttäjä voitte keskustella vakuutustapauksista Suomessa, joissa käyttäjä on joutunut onnettomuuteen ja haluaa tietää kaikki edut, joita hän voi saada vakuutusyhtiöltä tai Kelalta. Vakuutusyhtiöt pyrkivät usein salaamaan tietoa käyttäjän oikeuksista saada tukea tai rahallista korvausta.

  
  Vastaa käyttäjän kysymykseen: "${content}" keskittyen ymmärtämään heidän tilanteensa. Kysy **vain yksi** tarkentava kysymys tai anna ytimekäs vastaus annetun kontekstin perusteella.
  
  Viestejä, jotka ovat [], tarkoitetaan käyttöliittymäelementeiksi tai käyttäjän toiminnaksi.

  ### Ohjeet:
  - Varmista, että ymmärrät käyttäjän tilanteen tarkasti ennen kuin vastaat.
  - Palauta **vain yksi** lyhyt ja selkeä kysymys tai vastaus, joka on suoraan yhteydessä käyttäjän tilanteeseen.
  - Vältä tarpeetonta vastausten laajentamista. Pidä vastauksesi täsmällisenä ja asiaankuuluvana.
  - Jos kysymys ei liity vammaisten tai pitkäaikaissairaiden oikeuksiin, **älä vastaa kysymykseen**.
  - Vältä kaikenlaista laajentamista tai aiheeseen liittymättömiä vastauksia.
  - Ole ystävällinen, empaattinen ja täsmällinen vastauksessasi.
  
  ### Konteksti:
  ${results?.map((d) => d.content).join("\n\n")}
  
  Palauta vastaus tai yksi tarkentava kysymys, joka liittyy suoraan käyttäjän tilanteeseen. Jos kysymys ei liity ohjeisiin tai sosiaaliturva-asioihin, erityisesti vammaisten ja pitkäaikaissairaiden oikeuksiin, **älä vastaa kysymykseen**.
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

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },

  onGetUIState: async () => {
    "use server";

    const session = await auth();

    if (session && session.user) {
      const aiState = getAIState();

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState as Chat);
        return uiState; // Expected to be of type UIState
      }
    }

    // Explicitly return undefined to satisfy the UIState | undefined requirement
    return undefined;
  },

  onSetAIState: async ({ state }) => {
    "use server";

    const session = await auth();

    if (session && session.user) {
      const { chatId, messages } = state;

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
      return;
    }
  },
});

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
