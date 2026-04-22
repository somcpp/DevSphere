import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
  name: "header",
  initialState: {
    searchQuery: "",
  },
  reducers: {
    setSearch: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearch: (state) => {
      state.searchQuery = "";
    },
  },
});

export const { setSearch, clearSearch } = headerSlice.actions;
export const selectSearch = (state) => state.header.searchQuery;
export default headerSlice.reducer;
