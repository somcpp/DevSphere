import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    userFeed: [],
    loading: false,
    error: null
  },
  reducers: {
    setUserFeed: (state, action) => {
      state.userFeed = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { setUserFeed, setLoading, setError } = feedSlice.actions;
export const selectFeed = (state) => state.feed.userFeed;
export const selectLoading = (state) => state.feed.loading;
export default feedSlice.reducer;