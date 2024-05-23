import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import balanceReducer from "./balanceSlice";

const rootReducer = combineReducers({
  balance: balanceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
