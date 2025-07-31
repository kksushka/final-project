import { createSlice } from '@reduxjs/toolkit';

type themeValue = 'light' | 'dark';
type ThemeState = {
  mode: themeValue;
};

const initialState: ThemeState = {
  mode: localStorage.getItem('theme') as themeValue || 'light', 
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
