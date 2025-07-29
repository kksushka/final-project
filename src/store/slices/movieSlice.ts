import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMoviesBySearch } from '../../api/omdbApi';
import type { Movie } from '../../Types/Movie';

interface MovieState {
  movies: Movie[];
  total: number;
  loading: boolean;
  error: string | null;
  currentQuery: string;
  currentPage: number;
}

const initialState: MovieState = {
  movies: [],
  total: 0,
  loading: false,
  error: null,
  currentQuery: '',
  currentPage: 1,
};

export const getMovies = createAsyncThunk<
  { movies: Movie[]; total: number; query: string; page: number },
  { query: string; page: number; year?: string; type?: string },
  { rejectValue: string }
>('movies/getMovies', async ({ query, page, year, type }, { rejectWithValue }) => {
  try {
    const data = await fetchMoviesBySearch(query, page, year, type);
    return {
      movies: data.Search || [],
      total: parseInt(data.totalResults) || 0,
      query,
      page,
    };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An unknown error occurred');
  }
});

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    toggleFavorite(state, action: { payload: string }) {
      const movie = state.movies.find(m => m.imdbID === action.payload);
      if (movie) {
        movie.isFavorite = !movie.isFavorite;
      }
    },
    clearError(state) {
      state.error = null;
    },
    resetToDefault(state) {
      state.currentQuery = '';
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        const moviesWithRatings = action.payload.movies.map((movie) => ({
          ...movie,
          isFavorite: false,
          rating: parseFloat((Math.random() * 9 + 1).toFixed(1)), 
        }));

        state.movies = moviesWithRatings;
        state.total = action.payload.total;
        state.currentQuery = action.payload.query;
        state.currentPage = action.payload.page;
        state.loading = false;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Error fetching movies';
      });
  },
});

export const { toggleFavorite, clearError, resetToDefault } = movieSlice.actions;
export default movieSlice.reducer;