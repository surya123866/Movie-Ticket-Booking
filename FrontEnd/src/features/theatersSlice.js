import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TheatersApi from "../apis/movieApi";

// export const fetchAsyncTheaters = createAsyncThunk(
//   "Theaters/fetchAsyncTheaters",
//   async () => {
//     const response = await TheatersApi.get("/allTheaters");
//     return response.data;
//   }
// );

export const fetchAsyncTheaters = createAsyncThunk(
  "Theaters/fetchAsyncTheaters",
  async (movieId) => {
    const response = await TheatersApi.get(`/theaters/${movieId}`);
    return response.data;
  }
);

const initialState = {
  Theaters: [],
  selectedMovie: null,
};

export const Theaterslice = createSlice({
  name: "Theaters",
  initialState,
  reducers: {
    addTheaters: (state, { payload }) => {
      state.Theaters = payload;
    },
    setSelectedMovie: (state, { payload }) => {
      state.selectedMovie = payload;
    },
    removeSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncTheaters.pending, (state) => {
        console.log("Pending");
      })
      .addCase(fetchAsyncTheaters.fulfilled, (state, { payload }) => {
        console.log("Fetched Successfully");
        state.Theaters = payload;
      })
      .addCase(fetchAsyncTheaters.rejected, (state) => {
        console.log("Rejected");
      })
      .addCase(fetchAsyncTheaters.fulfilled, (state, { payload }) => {
        console.log("Fetched Movie Successfully");
        state.selectedMovie = payload;
      });
  },
});

export const { addTheaters, setSelectedMovie, removeSelectedMovie } =
  Theaterslice.actions;
export const getAllTheaters = (state) => state.Theaters.Theaters;
export const getSelectedMovie = (state) => state.Theaters.selectedMovie;
export default Theaterslice.reducer;
