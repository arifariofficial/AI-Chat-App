import { configureStore, combineReducers } from "@reduxjs/toolkit";
import balanceReducer from "./balanceSlice";
import userReducer from "./userSlice";
import chatReducer from "./chatSlice";
import modelReducer from "./modelSlice";
import promptReducer from "./promptSlice"; // Ensure this points to the correct file

const rootReducer = combineReducers({
  balance: balanceReducer,
  user: userReducer,
  chat: chatReducer,
  model: modelReducer,
  prompt: promptReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["prompt.prompt.createdAt", "prompt.prompt.updatedAt"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
