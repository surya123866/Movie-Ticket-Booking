import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ticketType: "",
  ticketQty: 0,
  ticketsPrice: 0,
  totalPrice: 0,
  totalSeatsSelected: 0,
  selectedSeats: [],
  bookedSeats: [12, 16, 18, 19, 20, 21, 22],
};

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = ticketsSlice.actions;

export default ticketsSlice.reducer;
