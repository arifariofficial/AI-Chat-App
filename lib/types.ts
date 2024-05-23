export type Message = {
  id: string;
  content: string;
  createdAt?: Date;
  role: "user" | "system" | "assistant" | "tool";
  chatId?: string;
};
export interface Chat extends Record<string, unknown> {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  path: string;
  messages: Message[];
  sharePath?: string | null;
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string;
    }
>;
