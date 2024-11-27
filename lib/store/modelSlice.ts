import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { AppDispatch } from "./store";

export interface ModelState {
  model: string;
  prompt: string;
}

const initialState: ModelState = {
  model: "ft:gpt-4o-mini-2024-07-18:personal::AWZbt8mj",
  prompt: "",
} as ModelState;

export const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    setModel: (state, action: PayloadAction<string>) => {
      state.model = action.payload;
    },

    setPrompt: (state, action: PayloadAction<string>) => {
      state.model = action.payload;
    },
  },
});

export const { setPrompt, setModel } = modelSlice.actions;

export default modelSlice.reducer;

// export const fetchBalance =
//   (userId: string) => async (dispatch: AppDispatch) => {
//     try {
//       const modelData = await getBalance(userId);

//       if (typeof modelData.model === "string") {
//         dispatch(setBalance(modelData.model));
//       } else {
//         console.error(
//           "Failed to fetch model: Balance is undefined or request failed",
//         );
//       }
//     } catch (error) {
//       console.error("Failed to fetch model:", error);
//     }
//   };
