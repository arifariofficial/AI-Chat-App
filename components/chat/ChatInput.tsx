import axios from "axios";
import { useState, FormEvent } from "react";

const ChatInput: React.FC<{
  onSendMessage: (message: { text: string; author: string }) => void;
}> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Send the user's message to the chat
    onSendMessage({ text: message, author: "user" });
    setMessage("");

    try {
      const response = await axios.post("/api/chat", {
        message: message,
      });

      const aiMessage = response.data.aiResponse;

      onSendMessage({ text: aiMessage, author: "SIPE" });
    } catch (error) {
      console.error("Error while sending message:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex w-full flex-col items-center gap-3 rounded-b-lg  bg-gray-100 p-4 drop-shadow-lg  md:flex-row  "
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="w-full flex-1 rounded-lg border border-gray-400 py-3 pl-4 text-left  focus:border-gray-700 focus:outline-none sm:w-[350px] md:w-[300px] md:rounded-l-lg"
      />

      <button
        type="submit"
        className="btn-primary"
        style={{ width: "100%", maxWidth: "350px" }}
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
