import { configureStore, combineReducers } from "@reduxjs/toolkit";
import balanceReducer from "./balanceSlice";
import userReducer from "./userSlice";
import chatReducer from "./chatSlice";

const rootReducer = combineReducers({
  balance: balanceReducer,
  user: userReducer,
  chat: chatReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
