import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import movieReducer from './slices/movieSlice';
import selectedMovieReducer from './slices/selectedMovieSlice';
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    movies: movieReducer,
    selectedMovie: selectedMovieReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;