import axios from "axios";
import { useState, FormEvent } from "react";

interface ChatInputProps {
  onSendMessage: (message: { text: string; author: string }) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSendMessage({ text: message, author: "user" });

    try {
      const response = await axios.post("http://localhost:4000/chat-message", {
        message,
      });
      const aiMessage = response.data.aiResponse;
      onSendMessage({ text: aiMessage, author: "ai" });
    } catch (error) {
      console.error("Error getting a response:", error);
    }
    setMessage("");
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInput;
