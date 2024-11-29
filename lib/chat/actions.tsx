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
import { getPrompt } from "@/data/get-prompt";
import { BotMessage } from "@/components/chat/bot-message";
import UserMessage from "@/components/chat/user-message";

async function submitUserMessage({
  content,
  model,
  userMessageId,
  editAIState = false,
}: {
  content: string;
  model: string;
  userMessageId: string;
  editAIState?: boolean;
}) {
  "use server";

  const promptData = await getPrompt();

  if (!promptData) {
    return { error: "Error fetching prompt" };
  }

  const aiState = getMutableAIState<typeof AI>();

  if (editAIState) {
    aiState.update((currentAIState) => {
      const currentMessages = currentAIState.messages;
      // Find the index of the message with the matching userMessageId
      const targetIndex = currentMessages.findIndex(
        (msg) => msg.id === userMessageId,
      );

      if (targetIndex === -1) {
        // If no match is found, append the new message
        return {
          ...currentAIState,
          messages: [
            ...currentMessages,
            {
              id: userMessageId,
              role: "user",
              content,
            } as Message,
          ],
        };
      }

      // If match is found, retain messages up to the matched ID
      const updatedMessages = currentMessages.slice(0, targetIndex + 1);
      updatedMessages[targetIndex] = {
        id: userMessageId,
        role: "user",
        content,
      };

      return {
        ...currentAIState,
        messages: updatedMessages, // Update messages by removing all after the matched ID
      };
    });
  } else {
    aiState.update({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: userMessageId,
          role: "user",
          content,
        } as Message,
      ],
    });
  }

  const prompt = `\
  ${"roleDefinition" in promptData ? promptData.roleDefinition : ""}
  
  ${"userContext" in promptData ? promptData.userContext : ""},
  
  ${"guidelines" in promptData ? promptData.guidelines : ""}
  
  ${"instructions" in promptData ? promptData.instructions : ""}

  ${"keyPointers" in promptData ? promptData.keyPointers : ""}
  
  ${"responseLimitations" in promptData ? promptData.responseLimitations : ""}
  `;

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;
  const botMessageId = nanoid(); // Generate a unique id early for BotMessage

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
            botMessageId={botMessageId}
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
              id: botMessageId,
              role: "assistant",
              content,
            } as Message,
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
  role: "user" | "assistant" | "system";
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
    .map((message) => ({
      id: message.id,
      role: message.role,
      display:
        message.role === "user" ? (
          <UserMessage content={message.content} userMessageId={message.id} />
        ) : message.role === "assistant" &&
          typeof message.content === "string" ? (
          <BotMessage
            content={message.content}
            botMessageId={message.id}
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
        if (!aiState || !aiState.chatId) {
          console.warn(
            "AI state or chatId is missing, initializing default state.",
          );
          return []; // Fallback to empty UIState
        }

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

      if (!session?.user) {
        console.warn("Unauthorized access attempt in onSetAIState.");
        return;
      }

      const { chatId, messages } = state;

      if (!state.chatId) {
        throw new Error("Missing chatId in state.");
      }

      // console.log("AiState:", state);

      if (!messages || messages.length === 0) {
        throw new Error("No messages available to create a chat title.");
      }

      const deduplicatedMessages = Array.from(
        new Map(messages.map((msg) => [msg.id, msg])).values(),
      );

      const createdAt = new Date();
      const userId = session.user.id as string;
      const path = `/chat/${chatId}`;

      const firstMessageContent = deduplicatedMessages[0].content as string;
      const words = firstMessageContent.split(/\s+/); // Split by spaces or newlines
      const title = words.slice(0, 5).join(" "); // Take the first 5 words and join them with spaces

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages: deduplicatedMessages,
        path,
      };

      await saveChat(chat);
    } catch (error) {
      console.error("Error in onSetAIState:", {
        state,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
});
