// import { Message as VercelChatMessage, StreamingTextResponse } from "ai";
// import { NextRequest, NextResponse } from "next/server";
// import {
//   AIMessage,
//   BaseMessage,
//   ChatMessage,
//   HumanMessage,
//   SystemMessage,
// } from "@langchain/core/messages";
// import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
// import { createRetrieverTool } from "langchain/tools/retriever";
// import { createReactAgent } from "@langchain/langgraph/prebuilt";

// export const runtime = "edge";

// const convertVercelMessageToLangChainMessage = (message: VercelChatMessage) => {
//   if (message.role === "user") {
//     return new HumanMessage(message.content);
//   } else if (message.role === "assistant") {
//     return new AIMessage(message.content);
//   } else {
//     return new ChatMessage(message.content, message.role);
//   }
// };

// const convertLangChainMessageToVercelMessage = (message: BaseMessage) => {
//   if (message._getType() === "human") {
//     return { content: message.content, role: "user" };
//   } else if (message._getType() === "ai") {
//     return {
//       content: message.content,
//       role: "assistant",
//       tool_calls: (message as AIMessage).tool_calls,
//     };
//   } else {
//     return { content: message.content, role: message._getType() };
//   }
// };

// const AGENT_SYSTEM_TEMPLATE = `
//   Olet sosiaaliturva-asiantuntija, jonka erityisosaaminen on pitkäaikaissairaiden JA vammaisten henkilöiden oikeudet. Avustat sosiaaliturva-asioissa lyhyellä, helposti ymmärretyllä vastauksella.

//     Voit kysyä minulta kysymyksiä liittyen esimerkiksi:
//     - Kelan etuuksiin
//     - Vammaispalveluihin
//     - Vammaisten henkilöiden oikeuksiin
//     - Pitkäaikaissairaiden henkilöiden oikeuksiin
//     - Sosiaaliturvaan liittyviin kysymyksiin
//     - Muihin sosiaaliturva-asioihin

//   `;
