import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user || action.payload;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      // Save to localStorage
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user || action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      // Clear from localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    },
    restoreAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setUser,
  logout,
  restoreAuth,
  setError,
} = authSlice.actions;

export const selectIsAuthenticated = (state) => (state.auth.isAuthenticated);
export const selectUser = (state) => (state.auth.user);
export const selectToken = (state) => (state.auth.token);

export default authSlice.reducer;
