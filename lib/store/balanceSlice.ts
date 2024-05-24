import { createSlice } from "@reduxjs/toolkit";
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
      state.balance -= 0.5;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const { decrement, setBalance } = balanceSlice.actions;

export default balanceSlice.reducer;

export const fetchBalance = () => async (dispatch: AppDispatch) => {
  const balance = await getBalance();

  dispatch(setBalance(balance.balance));
};
