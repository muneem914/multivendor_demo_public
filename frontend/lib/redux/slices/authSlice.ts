import { createSlice } from "@reduxjs/toolkit";
import { IUser } from '@/types/user'

interface AuthState {
  user: IUser | null;
  isLoading: boolean;
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

  }
})

export const { setUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer