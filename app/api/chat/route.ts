import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

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
}
