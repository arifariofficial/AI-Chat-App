import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";

const ChatInput: React.FC<{
  onSendMessage: (message: { text: string; author: string }) => void;
}> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  //chat-gpt
  /* const sendAndClearMessage = async () => {
    if (!message.trim()) return;
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  }; */

  const sendAndClearMessage = async () => {
    if (!message.trim()) return;
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendAndClearMessage();
  };

  //For Button Inside TextField
  const handleButtonClick = () => formRef.current?.submit();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendAndClearMessage();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="w-full resize-none bg-transparent  sm:text-sm"
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
        minRows={1}
        maxRows={8}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write a Message to SIPE..."
        className="shadow-inner"
        helperText={`${message.length}/1000`}
        inputProps={{
          maxLength: 1000,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                onClick={handleButtonClick}
                type="submit"
                disabled={!isLoading && !message.trim()}
                sx={{
                  borderRadius: "8px",
                  minWidth: "20px",
                  padding: "4px 8px",
                  "& .MuiButton-startIcon": {
                    boxShadow: "none",
                  },
                }}
                size="small"
              >
                {isLoading ? (
                  <CircularProgress size="20px" className="text-[#f5efd1]" />
                ) : (
                  <SendIcon fontSize="small" />
                )}
              </Button>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiInputBase-root": {
            minHeight: "50px",
            display: "flex",
            alignItems: "end",
            borderRadius: "12px",
            py: 0,
            "& .MuiInputBase-input": {
              padding: "2px 16px",
              marginBottom: "10px",
            },
          },
          "& .MuiInputAdornment-positionEnd": {
            marginBottom: "25px",
          },
        }}
      />
    </Box>
  );
};

export default ChatInput;
