import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";

import {
  AIMessage,
  BaseMessage,
  ChatMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { createRetrieverTool } from "langchain/tools/retriever";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

export const runtime = "edge";

const convertVercelMessageToLangChainMessage = (message: VercelChatMessage) => {
  if (message.role === "user") {
    return new HumanMessage(message.content);
  } else if (message.role === "assistant") {
    return new AIMessage(message.content);
  } else {
    return new ChatMessage(message.content, message.role);
  }
};

const convertLangChainMessageToVercelMessage = (message: BaseMessage) => {
  if (message._getType() === "human") {
    return { content: message.content, role: "user" };
  } else if (message._getType() === "ai") {
    return {
      content: message.content,
      role: "assistant",
      tool_calls: (message as AIMessage).tool_calls,
    };
  } else {
    return { content: message.content, role: message._getType() };
  }
};

const AGENT_SYSTEM_TEMPLATE = `Olet sosiaaliturva-asiantuntija, jonka erityisosaaminen on pitkäaikaissairaiden JA vammaisten henkilöiden oikeudet. Avustat sosiaaliturva-asioissa lyhyellä, helposti ymmärretyllä vastauksella.
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log(body.messages);

    const messages = Array.isArray(body.messages)
      ? body.messages
          .filter(
            (message: VercelChatMessage) =>
              message.role === "user" || message.role === "assistant",
          )
          .map(convertVercelMessageToLangChainMessage)
      : [];

    const returnIntermediateSteps = body.show_intermediate_steps;

    const chatModel = new ChatOpenAI({
      model: "gpt-4-turbo-preview",
      temperature: 0.5,
    });

    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
    });

    const vectorStore = new MemoryVectorStore(embeddings);

    const retriever = vectorStore.asRetriever();

    const tool = createRetrieverTool(retriever, {
      name: "search_latest_knowledge",
      description: "Searches and returns up-to-date general information.",
    });

    /**
     * Use a prebuilt LangGraph agent.
     */
    const agent = await createReactAgent({
      llm: chatModel,
      tools: [tool],

      messageModifier: new SystemMessage(AGENT_SYSTEM_TEMPLATE),
    });

    if (!returnIntermediateSteps) {
      const eventStream = await agent.streamEvents(
        {
          messages,
        },
        { version: "v2" },
      );

      const textEncoder = new TextEncoder();
      const transformStream = new ReadableStream({
        async start(controller) {
          for await (const { event, data } of eventStream) {
            if (event === "on_chat_model_stream") {
              // Intermediate chat model generations will contain tool calls and no content
              if (data.chunk.content) {
                controller.enqueue(textEncoder.encode(data.chunk.content));
              }
            }
          }
          controller.close();
        },
      });

      return new StreamingTextResponse(transformStream);
    } else {
      const result = await agent.invoke({ messages });
      return NextResponse.json(
        {
          messages: result.messages.map(convertLangChainMessageToVercelMessage),
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.log("langchain-api:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
