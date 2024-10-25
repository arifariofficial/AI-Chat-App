import { SIPEEssay } from "@/types";

export async function searchAPI(
  query: string,
  apiKey: string | null = null,
  matches: number = 5,
): Promise<SIPEEssay[]> {
  const apiUrl = process.env.API_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${apiUrl}/api/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}), // Include API key only if provided
      },
      body: JSON.stringify({ query, matches }),
    });

    if (!response.ok) {
      const errorBody = await response.text(); // Capture detailed error info
      throw new Error(
        `Error ${response.status}: ${response.statusText}. Response: ${errorBody}`,
      );
    }

    const data: SIPEEssay[] = await response.json();
    return data;
  } catch (error) {
    console.error("searchAPI Error:", error);
    return [];
  }
}
