import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Change as per your configuration

interface AIResponse {
  message: string;
}

async function chatWithAI(inputText: string): Promise<AIResponse> {
  console.log(inputText);
  try {
    const response = await axios.post<AIResponse>(`${API_BASE_URL}/sipe/api`, {
      message: inputText,
    });

    return response.data;
  } catch (error) {
    console.error("Error communicating with AI backend:", error);
    throw new Error("Failed to fetch response from AI");
  }
}

export default chatWithAI;
