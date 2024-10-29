import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useMemo,
} from "react";
import { getChats } from "@/data/get-chat";
import { Chat } from "@/lib/types";
import { ChatShareDialog } from "@/components/chat/chat-share-dialog";
import { shareChat } from "@/data/share-chat";

interface ChatContextType {
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  loadChats: (userId: string) => void;
  clearChats: () => void;
  updateChats: (newChats: Chat[]) => void;
  // Share functionality
  chatToShare: Chat | null;
  setChatToShare: React.Dispatch<React.SetStateAction<Chat | null>>;
  shareDialogOpen: boolean;
  setShareDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleShare: (chatToShare?: Chat) => void;
  shareChatFunction: (id: string) => Promise<Chat | { error: string }>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChats must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider: React.FC<{
  initialChats?: Chat[];
  children: ReactNode;
}> = ({ initialChats = [], children }) => {
  const [chats, setChats] = useState<Chat[]>(initialChats);

  // Share-related state
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [chatToShare, setChatToShare] = useState<Chat | null>(null);

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

  // Share handler
  const handleShare = (chatToShare?: Chat) => {
    const chat = chatToShare;
    if (chat) {
      setChatToShare(chat);
      setShareDialogOpen(true);
    } else {
      console.error("No chat available to share");
    }
  };

  const shareChatFunction = async (id: string) => {
    // Implement your server action here
    // For example, make an API call to share the chat
    try {
      const result = await shareChat(id);
      return result as Chat | { error: string };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const contextValue = useMemo(
    () => ({
      chats,
      setChats,
      loadChats,
      clearChats,
      updateChats,
      chatToShare,
      setChatToShare,
      shareDialogOpen,
      setShareDialogOpen,
      handleShare,
      shareChatFunction,
    }),
    [chats, chatToShare, shareDialogOpen],
  );

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
      {chatToShare && <ChatShareDialog />}
    </ChatContext.Provider>
  );
};
