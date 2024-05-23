import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getBalance as getBalanceFromDB,
  updateBalance as updateBalanceInDB,
} from "@data/balance";

interface BalanceResponse {
  balance?: number;
  error?: string;
}
interface BalanceState extends BalanceResponse {
  loading: boolean;
  error?: string;
}

const initialState: BalanceState = {
  balance: 0,
  loading: false,
  error: undefined,
};

export const getBalance = createAsyncThunk<
  number,
  string,
  { rejectValue: string }
>("balance/getBalance", async (userId: string, { rejectWithValue }) => {
  try {
    const response: BalanceResponse = await getBalanceFromDB(userId);
    if (response.error) {
      return rejectWithValue(response.error);
    }
    return response.balance ?? rejectWithValue("Balance is undefined");
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
});

export const updateBalance = createAsyncThunk<
  number,
  { userId: string; amount: number },
  { rejectValue: string }
>("balance/updateBalance", async ({ userId, amount }, { rejectWithValue }) => {
  try {
    const response = await updateBalanceInDB(amount, userId);
    if (!response.success || response.balance === undefined) {
      return rejectWithValue(response.message || "Failed to update balance");
    }
    return response.balance;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
});

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBalance.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBalance.fulfilled, (state, action: PayloadAction<number>) => {
        state.balance = action.payload;
        state.loading = false;
      })
      .addCase(
        getBalance.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? "An unknown error occurred"; // Correctly handle undefined payload
          state.loading = false;
        },
      )
      .addCase(updateBalance.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateBalance.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.balance = action.payload;
          state.loading = false;
        },
      )
      .addCase(
        updateBalance.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? "Failed to update balance"; // Correctly handle undefined payload
          state.loading = false;
        },
      );
  },
});

export default balanceSlice.reducer;
