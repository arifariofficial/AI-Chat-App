/* import OpenAI from "openai"; */
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  /*   const data = await req.json();

  const openai = new OpenAI({
    apiKey: process.env.AI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: data.message }],
    model: "gpt-3.5-turbo",
  });

  return NextResponse.json({
    aiResponse: completion.choices[0].message.content,
  }); */

  const message = await req.json();

  const username = "ari";
  const password = "Ariful123";
  const basicAuth = "Basic " + btoa(username + ":" + password);

  const response = await axios.post(
    "http://127.0.0.1:8000/sipe/api",
    {
      chat: message,
    },
    {
      headers: {
        Authorization: basicAuth,
      },
    },
  );

  return NextResponse.json({
    aiResponse: response,
  });
}
