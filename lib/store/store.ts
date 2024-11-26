import { configureStore, combineReducers } from "@reduxjs/toolkit";
import balanceReducer from "./balanceSlice";
import userReducer from "./userSlice";
import chatReducer from "./chatSlice";
import modelReducer from "./modelSlice";

const rootReducer = combineReducers({
  balance: balanceReducer,
  user: userReducer,
  chat: chatReducer,
  model: modelReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
