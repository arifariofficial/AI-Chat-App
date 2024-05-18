import {
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import { getSession, useSession } from "next-auth/react";
import { Button } from "@components/ui/button";

const ChatInput: React.FC<{
  onSendMessage: (message: { text: string; author: string }) => void;
}> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const userId = session?.user.id;

  useEffect(() => {
    const inputElement = document.getElementById("message");
    if (inputElement) {
      inputElement.setAttribute("spellCheck", "true");
      inputElement.setAttribute("lang", "fi-FI");
    }
  }, []);

  const sendAndClearMessage = async () => {
    if (!message.trim()) return;
    setIsLoading(true);

    // Send the user's message to the chat
    onSendMessage({ text: message, author: "user" });
    setMessage("");

    try {
      const response = await axios.post("/api/chat", {
        message: message,
        userId: userId,
      });

      const aiMessage = response.data.aiResponse;

      onSendMessage({ text: aiMessage, author: "SIPE" });
    } catch (error) {
      console.error("Error while sending message:", error);
    } finally {
      setIsLoading(false);
      await getSession();
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
      className="w-full resize-none sm:text-sm"
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
        maxRows={14}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write a Message to SIPE..."
        className="shadow-inner"
        helperText={`${message.length}/5000`}
        inputProps={{
          maxLength: 5000,
          spellCheck: true,
          lang: "fi-FI",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                onClick={handleButtonClick}
                type="submit"
                disabled={!isLoading && !message.trim()}
              >
                {isLoading ? (
                  <CircularProgress size="20px" className="text-foreground" />
                ) : (
                  <SendIcon fontSize="small" className="text-foreground" />
                )}
              </Button>
            </InputAdornment>
          ),
          className: "dark:text-white dark:border dark:border-white/40",
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
