import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMoviesBySearch } from '../../api/omdbApi';
import type { Movie } from '../../Types/Movie';
import { DefaultMovieQuery, type MovieQuery } from '../../Types/MovieQuery';

export type MovieStateType = 'init' | 'loading' | 'failed' | 'loaded'

interface MovieState {
  movies: Movie[];
  favoritMovies: Movie[],
  movieQuery: MovieQuery;
  total: number;
  state: MovieStateType;
  error: string | null;
  currentQuery: string;
  currentPage: number;
}

const initialState: MovieState = {
  movies: [],
  favoritMovies: [],
  movieQuery: DefaultMovieQuery,
  total: 0,
  state: 'init',
  error: null,
  currentQuery: '',
  currentPage: 1,
};

export const getMovies = createAsyncThunk<
  { movies: Movie[]; total: number; query: string; page: number },
  { query: MovieQuery; page: number; },
  { rejectValue: string }
>('movies/getMovies', async ({ query, page }, { rejectWithValue }) => {
  try {
    const data = await fetchMoviesBySearch(query.title, page, query.year, query.type);
    return {
      movies: data.Search || [],
      total: parseInt(data.totalResults) || 0,
      query: query.title,
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

      if (movie?.isFavorite){
        state.favoritMovies.push(movie);
      } else {
        const favIndex = state.favoritMovies.findIndex(m => m.imdbID == action.payload);
        if (favIndex >= 0){
          state.favoritMovies.splice(favIndex, 1);
        }
      }
    },
    clearError(state) {
      state.error = null;
    },
    resetToDefault(state) {
      state.currentQuery = '';
      state.movieQuery = DefaultMovieQuery;
      state.state = 'init';
      state.error = null;
      state.currentPage = 1;
    },
    setMovieQuery(state, action: { payload: MovieQuery}) {
      state.movieQuery = action.payload;
      state.currentPage = 1;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.state = 'loading';
        state.error = null;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        const moviesWithRatings = action.payload.movies.map((movie) => ({
          ...movie,
          isFavorite: state.favoritMovies.findIndex(m => m.imdbID == movie.imdbID) >= 0,
          rating: parseFloat((Math.random() * 9 + 1).toFixed(1)), 
        }));

        state.movies = moviesWithRatings;
        state.total = action.payload.total;
        state.currentQuery = action.payload.query;
        state.currentPage = action.payload.page;
        state.state = 'loaded';
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.state = 'failed';
        state.error = action.payload || 'Error fetching movies';
        if (state.error.toLowerCase().startsWith('too many results')){
          state.error = 'Please provide more accurate request';
        }
        if (state.error.toLowerCase().startsWith('incorrect imdb id') && state.movieQuery.title.length == 0 
          && (state.movieQuery.type || '').length == 0 && (state.movieQuery.year || '').length == 0){
          state.state = 'init'; //hack for broken omdbAPI api for empty search string
        } else if (state.error.toLowerCase().startsWith('incorrect imdb id')){
          state.error = 'Please provide more accurate request';
        }
      });
  },
});

export const { toggleFavorite, clearError, resetToDefault, setMovieQuery} = movieSlice.actions;
export default movieSlice.reducer;