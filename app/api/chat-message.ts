import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// Type for the request body
interface ChatMessageRequestBody {
  message: string;
}

// Type for the response data
interface ChatMessageResponseData {
  aiResponse: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatMessageResponseData>,
) {
  if (req.method === "POST") {
    const { message }: ChatMessageRequestBody = req.body;

    try {
      // Replace YOUR_OPENAI_API_KEY with your actual OpenAI API key
      const openAIResponse = await axios.post(
        "https://api.openai.com/v1/engines/davinci/completions",
        {
          prompt: message,
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_OPENAI_API_KEY`,
          },
        },
      );

      // Respond with the AI text
      res
        .status(200)
        .json({ aiResponse: openAIResponse.data.choices[0].text.trim() });
    } catch (error) {
      console.error("OpenAI request failed:", error);
      res.status(500).json({ aiResponse: "Failed to generate AI response." });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
