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
import {
  BotMessage,
  SpinnerMessage,
  UserMessage,
} from "@components/chat/message";
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
    body: JSON.stringify({ query: content, apiKey, matches: 5 }),
  });

  const results: SIPEChunk[] = await searchResponse.json();

  const prompt = `
  Olet sosiaaliturva-asiantuntija, joka on erikoistunut pitkäaikaissairaiden ja vammaisten henkilöiden oikeuksiin. Vastaa käyttäjän kysymykseen: "${content}" keskittyen ymmärtämään heidän tilanteensa. Kysy **vain yksi** tarkentava kysymys tai anna ytimekäs vastaus annetun kontekstin perusteella.
  
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
