import {
  createAI,
  createStreamableValue,
  getAIState,
  getMutableAIState,
} from "ai/rsc";
import { Chat, Message } from "../types";
import { auth } from "@/auth";
import { BotMessage, UserMessage } from "@components/chat/message";
import { nanoid } from "@lib/utils";
import { saveChat } from "@data/save-chat";
import { getSipeResponse } from "@actions/sipe-api";

async function submitUserMessage(content: string) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  // Adding the user message to the aiState
  aiState.update((prevState) => {
    const newState: AIState = {
      ...prevState,
      messages: [
        ...prevState.messages,
        {
          id: nanoid(),
          role: "user",
          content,
        } as Message,
      ],
    };
    return newState;
  });

  const fullResponse = await getSipeResponse(content);

  const chunks = fullResponse.split(" ");
  const textStream = createStreamableValue("");

  // Function to simulate typing delay
  const delay = (ms: number | undefined) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const decoder = new TextDecoder();

  // Function to update the stream gradually
  const updateStreamGradually = async () => {
    for (const chunk of chunks) {
      const bytes = new TextEncoder().encode(chunk + " ");
      const decodedString = decoder.decode(bytes); // Decode bytes to string
      textStream.update(decodedString);
      await delay(Math.floor(Math.random() * 60) + 30);
    }
    textStream.done();
    // Adding the sipe-api message to the aiState
    aiState.update((prevState) => {
      const newState: AIState = {
        ...prevState,
        messages: [
          ...prevState.messages,
          {
            id: nanoid(),
            role: "assistant",
            content: fullResponse,
          } as Message,
        ],
      };

      return newState;
    });
  };

  updateStreamGradually(); // Start the streaming process

  return {
    id: nanoid(),
    display: <BotMessage content={textStream.value} />,
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
