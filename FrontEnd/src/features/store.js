import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import moviesReducer from "../features/moviesSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

setupListeners(store.dispatch);
