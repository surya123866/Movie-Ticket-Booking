import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moviesApi from "../apis/movieApi";

// Async Thunks
export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    try {
      const response = await moviesApi.get("/allmovies");
      return response.data;
    } catch (error) {
      // Handle error, e.g., dispatch an action or log the error
      throw error;
    }
  }
);

export const fetchAsyncSelected = createAsyncThunk(
  "movies/fetchAsyncSelected",
  async (movieId) => {
    try {
      const response = await moviesApi.get(`/movies/${movieId}`);
      return response.data;
    } catch (error) {
      // Handle error
      throw error;
    }
  }
);

// Initial State
const initialState = {
  movies: [],
  selectedMovie: null,
  loadingMovies: false,
  loadingSelectedMovie: false,
};

// Reducer
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, action) => {
      state.movies = action.payload;
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    removeSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        state.loadingMovies = true;
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, action) => {
        state.loadingMovies = false;
        state.movies = action.payload;
      })
      .addCase(fetchAsyncMovies.rejected, (state) => {
        state.loadingMovies = false;
      })
      .addCase(fetchAsyncSelected.pending, (state) => {
        state.loadingSelectedMovie = true;
      })
      .addCase(fetchAsyncSelected.fulfilled, (state, action) => {
        state.loadingSelectedMovie = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchAsyncSelected.rejected, (state) => {
        state.loadingSelectedMovie = false;
      });
  },
});

// Export actions and reducer
export const { addMovies, setSelectedMovie, removeSelectedMovie } =
  movieSlice.actions;

export const getAllMovies = (state) => state.movies.movies;
export const getSelectedMovie = (state) => state.movies.selectedMovie;
export const isLoadingMovies = (state) => state.movies.loadingMovies;
export const isLoadingSelectedMovie = (state) =>
  state.movies.loadingSelectedMovie;

export default movieSlice.reducer;
