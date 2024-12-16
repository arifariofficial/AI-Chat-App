"use server";

import { auth } from "@/auth";
import { checkBalance } from "@/data/balance";
import axios from "axios";

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const basicAuth = "Basic " + btoa(username + ":" + password);

const sipeBaseUrl =
  process.env.NODE_ENV === "production"
    ? "http://sipe-api:8000/sipe/api"
    : "http://localhost:8000/sipe/api";

export async function getSipeResponse(content: string) {
  const session = await auth();

  if (!session || !session.user || typeof session.user.id !== "string") {
    return "Session invalid or user ID missing.";
  }

  const isBalance = await checkBalance(session.user.id);

  if (!isBalance) {
    return "You do not have enough balance, please top up your account.";
  }

  const response = await axios.post(
    sipeBaseUrl,
    { chat: content },
    { headers: { Authorization: basicAuth } },
  );

  const fullText = response.data.chat;

  return fullText;
}
