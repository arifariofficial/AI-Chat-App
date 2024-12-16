import { getPrompt } from "@/data/get-prompt";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { updatePrompt } from "@/data/update-prompt";
import { Prompt } from "../types";

export interface PromptState {
  prompt: Prompt | null;
  loading: boolean;
  error: string | null;
}

const initialState: PromptState = {
  prompt: null,
  loading: false,
  error: null,
};

const promptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    setPrompt: (state, action: PayloadAction<Prompt>) => {
      state.prompt = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setPrompt, setLoading, setError } = promptSlice.actions;

export default promptSlice.reducer;

export const fetchPrompt = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));

    const promptData = await getPrompt();

    if (!promptData) {
      console.error("Failed to fetch prompt: Data is null.");
      dispatch(setError("Failed to fetch prompt: Data is null."));
      return;
    }

    if (
      "id" in promptData &&
      typeof promptData.id === "string" &&
      "createdAt" in promptData &&
      "updatedAt" in promptData
    ) {
      const serializedPrompt: Prompt = {
        ...promptData,
        createdAt: new Date(promptData.createdAt).toISOString(),
        updatedAt: new Date(promptData.updatedAt).toISOString(),
      };
      dispatch(setPrompt(serializedPrompt));
    } else {
      console.error("Unexpected response structure:", promptData);
      dispatch(setError("Unexpected response structure."));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch prompt:", error.message);
      dispatch(setError("An error occurred while fetching the prompt."));
    } else {
      console.error("An unknown error occurred:", error);
      dispatch(
        setError("An unknown error occurred while fetching the prompt."),
      );
    }
  } finally {
    dispatch(setLoading(false));
  }
};

// Update prompt
export const updatePromptToDB =
  (updatedPrompt: Partial<Prompt>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true)); // Set loading state to true.

      if (!updatedPrompt.id) {
        throw new Error("ID is required for updating a prompt.");
      }
      const response = await updatePrompt(updatedPrompt.id, updatedPrompt);

      if (!response) {
        console.error("Failed to update prompt: Data is null.");
        dispatch(setError("Failed to update prompt: Data is null."));
        return;
      }

      if (
        "id" in response &&
        typeof response.id === "string" &&
        "createdAt" in response &&
        "updatedAt" in response
      ) {
        const serializedPrompt: Prompt = {
          ...response,
          createdAt: new Date(response.createdAt).toISOString(),
          updatedAt: new Date(response.updatedAt).toISOString(),
        };
        dispatch(setPrompt(serializedPrompt)); // Update state with new data.
      } else {
        console.error("Unexpected response structure:", response);
        dispatch(setError("Unexpected response structure."));
      }
    } catch (error: any) {
      console.error("Failed to update prompt:", error.message || error);
      dispatch(setError("An error occurred while updating the prompt."));
    } finally {
      dispatch(setLoading(false)); // Set loading state to false.
    }
  };
