"use client";

import { Box, Button, InputAdornment, TextField } from "@mui/material";
import styled, { keyframes } from "styled-components";
import SendIcon from "@mui/icons-material/Send";

const pulse = keyframes`
  0%, 100% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
  75% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.3;
  }
`;

const Message = styled.div`
  margin-bottom: 1rem;
  animation: ${pulse} 2s infinite;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
`;
const InnerMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem;
  animation: ${pulse} 1s infinite;
  border-radius: 0.25rem;
  background-color: #c4c4c4;
  width: 50%;
  color: #999;
  text-align: left;
  padding: 1rem;
  margin-left: 20px;
  flex-grow: 1;
  font-size: 0.75rem;
`;

const ChatPageSkeleton = () => {
  return (
    <div className="absolute inset-x-0 top-0 mx-auto flex h-screen w-screen max-w-screen-lg bg-transparent sm:h-[calc(100vh-70px)]">
      <div className="flex size-full animate-pulse flex-col justify-end rounded-2xl px-4 pb-4">
        <ChatDisplay />
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatPageSkeleton;

const ChatInput = () => {
  return (
    <Box
      component="form"
      className="w-full resize-none bg-transparent opacity-30 sm:text-sm"
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
        placeholder="Write a Message to SIPE..."
        className="shadow-inner"
        inputProps={{
          maxLength: 1000,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
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
                <SendIcon fontSize="small" />
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
            marginBottom: "12px",
          },
        }}
      />
    </Box>
  );
};

const ChatDisplay = () => {
  return (
    <div className="flex size-full flex-col space-y-3 overflow-y-auto rounded-b-md rounded-t-xl sm:px-6">
      <div className="flex size-full flex-col justify-end rounded-2xl drop-shadow-xl sm:px-4">
        <Message>
          <InnerMessage>
            compare sales for allman brothers band and goo goo dolls
          </InnerMessage>
          <InnerMessage style={{ alignSelf: "end", marginRight: "20px" }}>
            In the month of June, in the city of Houston, sales for Allman
            Brothers Band were 35% higher than for Goo Goo Dolls; $35,996 as
            opposed to $26,590.
          </InnerMessage>
          <InnerMessage style={{ width: "30%" }}>Hey there</InnerMessage>
          <InnerMessage style={{ alignSelf: "end", marginRight: "20px" }}>
            Hello! How can i help?
          </InnerMessage>
          <InnerMessage style={{ marginLeft: "20px", width: "50%" }}>
            what were the top shows in houston in june
          </InnerMessage>
          <InnerMessage style={{ alignSelf: "end", marginRight: "20px" }}>
            The top 5 events in the month of June in the city of Houston were 1,
            Allman Brothers Band; 2, Girl Talk; 3, Goo Goo Dolls; 4, Commodores;
            and 5, Dropkick Murphys.{" "}
          </InnerMessage>
          <InnerMessage>
            compare sales for allman brothers band and goo goo dolls
          </InnerMessage>
          <InnerMessage style={{ alignSelf: "end", marginRight: "20px" }}>
            In the month of June, in the city of Houston, sales for Allman
            Brothers Band were 35% higher than for Goo Goo Dolls; $35,996 as
            opposed to $26,590.
          </InnerMessage>
          <InnerMessage>
            compare sales for allman brothers band and goo goo dolls
          </InnerMessage>
        </Message>
      </div>
    </div>
  );
};
