import { Box, Button, InputAdornment, TextField } from "@mui/material";
import axios from "axios";
import { useState, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";

const ChatInput: React.FC<{
  onSendMessage: (message: { text: string; author: string }) => void;
}> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  //chat-gpt
  const sendAndClearMessage = async () => {
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

  /* const sendAndClearMessage = async () => {
    if (!message.trim()) return;

    // Send the user's message to the chat
    onSendMessage({ text: message, author: "user" });
    setMessage("");

    console.log(message);

    try {
      // Encode username and password for basic auth
      const username = "ari";
      const password = "ariful123";
      const basicAuth = "Basic " + btoa(username + ":" + password);

      const response = await axios.post(
        "http://127.0.0.1:8000/sipe/api",
        {
          chat: message,
        },
        {
          headers: {
            Authorization: basicAuth,
          },
        },
      );

      const aiMessage = response.data.chat;

      onSendMessage({ text: aiMessage, author: "SIPE" });
    } catch (error) {
      console.error("Error while sending message:", error);
    }
  }; */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendAndClearMessage();
  };

  //For Button Inside TextField
  const handleButtonClick = () => formRef.current?.submit();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent the default action to avoid inserting a new line
      sendAndClearMessage(); // Call sendAndClearMessage directly
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="w-full resize-none bg-transparent p-2 focus-within:outline-none sm:text-sm"
    >
      <TextField
        id="message"
        name="message"
        type="text"
        fullWidth
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        multiline
        minRows={2}
        maxRows={10}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="rounded-2xl"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                onClick={handleButtonClick}
                type="submit"
                sx={{ boxShadow: 0 }}
              >
                <SendIcon className="shadow-sm" />
              </Button>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiInputBase-root": {
            alignItems: "end",
            borderRadius: "12px",
          },
          "& .MuiInputAdornment-positionEnd": {
            marginBottom: "20px",
          },
        }}
      />
    </Box>
  );
};

export default ChatInput;
