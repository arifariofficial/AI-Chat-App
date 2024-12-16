import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useMemo,
} from "react";
import { getChat, getChats } from "@/data/get-chat";
import { Chat } from "@/lib/types";
import { ChatShareDialog } from "@/components/chat/chat-share-dialog";
import { shareChat } from "@/data/share-chat";

// Define the context type
interface ChatContextType {
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  loadChats: (userId: string) => void;
  clearChats: () => void;
  updateChats: (newChats: Chat[]) => void;
  getChatById: (chatId: string) => Chat | undefined; // Get chat by ID
  // Share functionality
  chatToShare: Chat | null;
  setChatToShare: React.Dispatch<React.SetStateAction<Chat | null>>;
  shareDialogOpen: boolean;
  setShareDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleShare: (chatId: string, userId: string) => void; // Share handler
  shareChatFunction: (id: string) => Promise<Chat | { error: string }>;
}

// Create the context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Custom hook to use the chat context
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChats must be used within a ChatProvider");
  }
  return context;
};

// Chat provider component
export const ChatProvider: React.FC<{
  initialChats?: Chat[];
  children: ReactNode;
}> = ({ initialChats = [], children }) => {
  // State to hold chats
  const [chats, setChats] = useState<Chat[]>(initialChats);

  // Share-related state
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [chatToShare, setChatToShare] = useState<Chat | null>(null);

  // Memoized function to load chats
  const loadChats = useCallback(async (userId: string) => {
    try {
      const chatsData = await getChats(userId);
      setChats(chatsData as Chat[]); // Set loaded chats
    } catch (error) {
      console.error("Failed to load chats:", error);
    }
  }, []); // Dependencies of this function

  // Function to clear chats
  const clearChats = () => setChats([]);

  // Function to update chats
  const updateChats = (newChats: Chat[]) => {
    setChats(newChats);
  };

  // Memoize getChatById function using useCallback
  const getChatById = useCallback(
    (chatId: string): Chat | undefined => {
      return chats.find((chat) => chat.id === chatId); // Find chat by ID
    },
    [chats],
  ); // Depends on chats state

  // Memoize handleShare function using useCallback
  const handleShare = useCallback(
    async (chatId: string, userId: string) => {
      try {
        // Fetch the chat from the database using the existing getChat function
        const chat = await getChat(chatId, userId);
        if (chat) {
          setChatToShare(chat); // Set the chat to share in the state
          setShareDialogOpen(true); // Open the share dialog
        } else {
          console.error("Chat not found for user");
        }
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    },
    [], // No dependencies on state, just the function to fetch the chat
  );

  // Function to share the chat
  const shareChatFunction = async (id: string) => {
    try {
      const result = await shareChat(id); // Share the chat
      return result as Chat | { error: string }; // Return the result
    } catch (error) {
      console.error(error);
      throw error; // Handle any errors
    }
  };

  // Memoize the context value to pass down to the provider
  const contextValue = useMemo(
    () => ({
      chats,
      setChats,
      loadChats,
      clearChats,
      updateChats,
      getChatById,
      chatToShare,
      setChatToShare,
      shareDialogOpen,
      setShareDialogOpen,
      handleShare, // Pass memoized function
      shareChatFunction,
    }),
    [
      chats,
      chatToShare,
      shareDialogOpen,
      loadChats,
      getChatById,
      handleShare, // Include handleShare here as it's memoized
    ],
  );

  // Return the provider with the context value
  return (
    <ChatContext.Provider value={contextValue}>
      {children}
      {chatToShare && <ChatShareDialog />}{" "}
      {/* Display share dialog if chat is selected */}
    </ChatContext.Provider>
  );
};
