import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ChatState {
  chatStarted: boolean;
}

export const initialState: ChatState = {
  chatStarted: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    startChat: (state) => {
      state.chatStarted = true;
    },
    resetChat: (state) => {
      state.chatStarted = false;
    },
  },
});

export const { startChat, resetChat } = chatSlice.actions;

export default chatSlice.reducer;

export const selectChatStarted = (state: RootState) => state.chat.chatStarted;
