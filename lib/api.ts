import { SIPEEssay } from "@/types";

export async function searchAPI(
  query: string,
  matches: number = 5,
): Promise<SIPEEssay[]> {
  const apiUrl = process.env.API_URL;

  try {
    const response = await fetch(`${apiUrl}/api/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, matches }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
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
