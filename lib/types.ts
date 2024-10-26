export type Message = {
  name?: string;
  id: string;
  content: string;
  createdAt?: Date;
  role: "user" | "system" | "assistant";
  chatId?: string;
  edited?: string | null;
};
export interface Chat extends Record<string, unknown> {
  id: string;
  title: string;
  createdAt: Date | null;
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
