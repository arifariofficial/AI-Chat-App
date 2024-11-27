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
import { getPrompt } from "@/data/get-prompt";

async function submitUserMessage({
  content,
  model,
}: {
  content: string;
  model: string;
}) {
  "use server";

  const promptData = await getPrompt();

  if (!promptData) {
    return { error: "Error fetching prompt" };
  }

  if (!promptData) {
    return { error: "Error fetching prompt" };
  }

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
  ${"roleDefinition" in promptData ? promptData.roleDefinition : ""}
  
  ${"userContext" in promptData ? promptData.userContext : ""},
  
  ${"guidelines" in promptData ? promptData.guidelines : ""}
  
  ### Ohjeet:
  ${"instructions" in promptData ? promptData.instructions : ""}
  
  ### Konteksti:
  ${"keyPointers" in promptData ? promptData.keyPointers : ""}
  
  ${"responseLimitations" in promptData ? promptData.responseLimitations : ""}
  `;

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;
  const uniqueId = nanoid(); // Generate a unique id early for BotMessage

  const result = await streamUI({
    model: openai(model),
    initial: <SpinnerMessage />,
    system: prompt,
    temperature:
      "temperature" in promptData && promptData.temperature !== null
        ? promptData.temperature
        : undefined,
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
