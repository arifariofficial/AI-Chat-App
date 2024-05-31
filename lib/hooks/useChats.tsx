import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { getChats } from "@data/get-chat";
import { Chat } from "@lib/types";

interface ChatContextType {
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  loadChats: (userId: string) => void;
  clearChats: () => void;
  updateChats: (newChats: Chat[]) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChats = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChats must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chats, setChats] = useState<Chat[]>([]);

  const loadChats = useCallback(async (userId: string) => {
    try {
      const chatsData = await getChats(userId);
      setChats(chatsData as Chat[]);
    } catch (error) {
      console.error("Failed to load chats:", error);
    }
  }, []);

  const clearChats = () => setChats([]);

  const updateChats = (newChats: Chat[]) => {
    setChats(newChats);
  };

  return (
    <ChatContext.Provider
      value={{ chats, setChats, loadChats, clearChats, updateChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};
