import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  name: string;
  surname: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  name: 'Default',
  surname: 'User',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ name: string; surname: string }>) => {
      state.isAuthenticated = true;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.name = 'Default';
      state.surname = 'User';
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
