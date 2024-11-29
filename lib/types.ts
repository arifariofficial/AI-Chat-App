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

export interface Prompt {
  id?: string;
  temperature?: number | null | undefined;
  roleDefinition?: string | null | undefined;
  roleDefinitionPurpose?: string | null | undefined;
  userContext?: string | null | undefined;
  userContextPurpose?: string | null | undefined;
  guidelines?: string | null | undefined;
  guidelinesPurpose?: string | null | undefined;
  instructions?: string | null | undefined;
  instructionsPurpose?: string | null | undefined;
  keyPointers?: string | null | undefined;
  keyPointersPurpose?: string | null | undefined;
  responseLimitations?: string | null | undefined;
  responseLimitationsPurpose?: string | null | undefined;
  createdAt: string;
  updatedAt: string;
}
