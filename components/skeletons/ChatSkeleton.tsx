"use client";
import React from "react";
import styled, { keyframes } from "styled-components";

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
  background-color: #d4d4d4;
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
    <Container className="rounded-b-xl shadow-2xl">
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
        <Input className="flex justify-between shadow-md drop-shadow-sm">
          <div
            className="flex items-center rounded-md border text-left "
            style={{ width: "65%", paddingLeft: "20px" }}
          >
            Type a message...
          </div>
          <button className="p-5" style={{ opacity: 0.2, width: "30%" }}>
            Send
          </button>
        </Input>
      </Messages>
    </Container>
  );
};

export default ChatPageSkeleton;
