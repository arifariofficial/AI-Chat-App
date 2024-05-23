import { NextResponse } from "next/server";

import axios from "axios";
import { checkBalance } from "@data/balance";
/* import OpenAI from "openai"; */

export async function POST(req: Request) {
  const data = await req.json();

  console.log(data.userId);
  const isBalance = await checkBalance(data.userId);

  if (!isBalance) {
    return NextResponse.json({
      aiResponse: "You do not have enough balance, please top up your account.",
    });
  }

  //chatGpt
  /*   const openai = new OpenAI({
    apiKey: process.env.AI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: data.message }],
    model: "gpt-3.5-turbo",
  });

  return NextResponse.json({
    aiResponse: completion.choices[0].message.content,
  });
 */
  //sipe api
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;
  const basicAuth = "Basic " + btoa(username + ":" + password);

  const sipeBaseUrl =
    process.env.NODE_ENV === "production"
      ? "http://sipe-api:8000/sipe/api"
      : "http://localhost:8000/sipe/api";

  try {
    const response = await axios.post(
      sipeBaseUrl,
      { chat: data.message },
      { headers: { Authorization: basicAuth } },
    );

    return NextResponse.json({ aiResponse: response.data });
  } catch (error) {
    console.error("API request failed", error);
    return NextResponse.json({ error: "Failed to fetch response from API" });
  }
}
