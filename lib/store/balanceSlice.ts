import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { getBalance } from "@data/balance";

export interface BalanceState {
  balance: number;
}

const initialState: BalanceState = {
  balance: 0,
} as BalanceState;

export const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    decrement: (state) => {
      if (state.balance > 0) {
        state.balance -= 0.5;
      }
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
  },
});

export const { decrement, setBalance } = balanceSlice.actions;

export default balanceSlice.reducer;

export const fetchBalance =
  (userId: string) => async (dispatch: AppDispatch) => {
    try {
      const balanceData = await getBalance(userId);

      if (typeof balanceData.balance === "number") {
        dispatch(setBalance(balanceData.balance));
      } else {
        console.error(
          "Failed to fetch balance: Balance is undefined or request failed",
        );
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };
