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

    try {
      const response = await axios.post('/api/chat', {
        message: message
      });

      const aiMessage = response.data.aiResponse; 

      onSendMessage({ text: aiMessage, author: "SIPE" }); // Send the AI's message to the chat
    } catch (error) {
      console.error('Error while sending message:', error);
      // You might want to handle errors by displaying them in the chat or as a notification
    }

    setMessage(""); // Clear the input field
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 rounded-b-lg bg-white p-4 md:flex-row"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 rounded-lg border-2 border-gray-300 p-2 focus:border-blue-500 focus:outline-none md:rounded-l-lg"
      />
      <button type="submit" className="w-[250px] self-center">
        Send
      </button>
    </form>
  );
};

export default ChatInput;
