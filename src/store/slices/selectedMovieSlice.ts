import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Movie } from '../../Types/Movie';

interface State {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  movie: null,
  loading: false,
  error: null,
};

export const fetchMovieById = createAsyncThunk(
  'selectedMovie/fetchById',
  async (imdbID: string, { rejectWithValue }) => { 
    try { 
      const response = await axios.get(`https://www.omdbapi.com/?apikey=35b30234&i=${imdbID}&plot=full`);
      
      if (response.data.Response === 'False') {
        return rejectWithValue(response.data.Error); 
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) { 
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const selectedMovieSlice = createSlice({
  name: 'selectedMovie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.movie = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Error fetching movie'; 
      });
  },
});

export default selectedMovieSlice.reducer;