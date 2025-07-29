import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import movieReducer from './slices/movieSlice';
import selectedMovieReducer from './slices/selectedMovieSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    movies: movieReducer,
    selectedMovie: selectedMovieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;