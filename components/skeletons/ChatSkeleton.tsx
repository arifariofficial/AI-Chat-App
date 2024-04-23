"use client";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React from "react";
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

const Container = styled.div`
  position: relative;
  display: flex;
  width: 90%;
  flex-direction: column;
  border: 1px solid #d4d4d4;
  broder-radius: 2rem;
`;

const Messages = styled.div`
  flex-grow: 1;
  overflow-y: hidden;
`;

const Message = styled.div`
  margin-bottom: 1rem;
  animation: ${pulse} 2s infinite;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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
const Input = styled.div`
  padding: 1rem;
  animation: ${pulse} 2s infinite;
  border-radius: 0.25rem;
  background-color: #d4d4d4;
  margin-top: -15px;
  color: #999;
`;

const ChatPageSkeleton = () => {
  return (
    <Container className="mx-autoflex w-full max-w-[500px] items-center justify-center rounded-2xl bg-transparent  sm:max-w-[700px] md:max-w-[1000px]">
      <ChatDisplay />
    </Container>
  );
};

export default ChatPageSkeleton;

const ChatInput = () => {
  return (
    <Box
      component="form"
      className="w-full resize-none bg-transparent p-2 opacity-20 focus-within:outline-none sm:text-sm"
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
        placeholder="Type a message..."
        className="rounded-2xl"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button>
                <SendIcon />
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
            marginBottom: "12px",
          },
        }}
      />
    </Box>
  );
};

const ChatDisplay = () => {
  return (
    <div>
      <Messages className=" drop-shadow-xl ">
        <Message>
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
        </Message>
        <ChatInput />
      </Messages>
    </div>
  );
};
