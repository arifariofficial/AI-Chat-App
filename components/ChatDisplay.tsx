import { useEffect, useRef } from "react";

type Message = {
  author: string;
  text: string;
};

export type ChatDisplayProps = {
  messages: Message[];
};

const ChatDisplay: React.FC<ChatDisplayProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-display">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.author}`}>
          <p>{message.text}</p>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatDisplay;
