import OpenAI from "openai";
import { NextResponse } from "next/server";
/* import axios from "axios"; */

export async function POST(req: Request) {
  const data = await req.json();

  //chatGpt
  const openai = new OpenAI({
    apiKey: process.env.AI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: data.message }],
    model: "gpt-3.5-turbo",
  });

  return NextResponse.json({
    aiResponse: completion.choices[0].message.content,
  });

  //sipe api
  /*   const username = process.env.USERNAME;
  const password = process.env.PASSWORD;
  const basicAuth = "Basic " + btoa(username + ":" + password);

  try {
    const response = await axios.post(
      "http://sipe-api:8000/sipe/api",
      { chat: data.message },
      { headers: { Authorization: basicAuth } },
    );
    return NextResponse.json({ aiResponse: response.data.chat });
  } catch (error) {
    console.error("API request failed", error);
    return NextResponse.json({ error: "Failed to fetch response from API" });
  } */
}
