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
import { BotMessage, UserMessage } from "@components/chat/message";
import { nanoid } from "@lib/utils";
import { saveChat } from "@data/save-chat";
import { loadEnvConfig } from "@next/env";
import { SIPEChunk } from "@types";

loadEnvConfig("");

const apiKey = process.env.OPENAI_API_KEY;

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

  const sipeBaseUrl =
    process.env.NODE_ENV === "production"
      ? "http://frontend:3000/api/search"
      : "http://localhost:3000/api/search";

  const searchResponse = await fetch(sipeBaseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: content, apiKey, matches: 3 }),
  });

  const results: SIPEChunk[] = await searchResponse.json();
  const prompt = `
  Olet sosiaaliturva-asiantuntija, joka on erikoistunut pitkäaikaissairaiden ja vammaisten henkilöiden oikeuksiin. Vastatessasi käyttäjän kysymykseen "${content}", pyri ensin ymmärtämään tarkasti käyttäjän tilanne kysymällä tarvittavia lisätietoja. Tämä auttaa antamaan lyhyen, selkeän ja tarkasti kohdennetun vastauksen.

  Kysy käyttäjältä aina erityisiä lisätietoja, jos tarvittavat tiedot puuttuvat, ja vastaa vasta sen jälkeen. Vastaa lyhyesti ja ystävällisesti, ja varmista, että jokainen vastaus tuntuu osalta keskustelua ihmisen kanssa.

  Konteksti:
  ${results?.map((d) => d.content).join("\n\n")}

  Aloita kysymällä ystävällisesti tarkentavia kysymyksiä tilanteesta, jotta voit antaa juuri oikeanlaisen vastauksen käyttäjän tarpeisiin. Älä anna koko vastausta heti, vaan keskity yhteen asiaan kerrallaan. Vastauksiesi tulee olla selkeitä, mutta tarvittaessa kysy lisätietoja, jos jokin asia ei ole täysin selvä.
`;

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;
  const result = await streamUI({
    model: openai("gpt-4o"),
    system: prompt,
    temperature: 0.5,
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
      if (!textStream) {
        textStream = createStreamableValue("");
        textNode = <BotMessage content={textStream.value} />;
      }

      if (done) {
        textStream.done();
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
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
        const uiState = getUIStateFromAIState(aiState);
        return uiState;
      }
    } else {
      return;
    }
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
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === "user" ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === "assistant" &&
          typeof message.content === "string" ? (
          <BotMessage content={message.content} />
        ) : null,
    }));
};
