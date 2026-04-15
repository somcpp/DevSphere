import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  incomingRequests: [],
  outgoingRequests: [],
  myConnections: [],
  loading: false,
};

const connectionSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    setIncomingRequests: (state, action) => {
      state.incomingRequests = action.payload;
    },
    setOutgoingRequests: (state, action) => {
      state.outgoingRequests = action.payload;
    },
    setMyConnections: (state, action) => {
      state.myConnections = action.payload;
    },
    removeIncomingRequest: (state, action) => {
      // Remove by request _id after accept/reject
      state.incomingRequests = state.incomingRequests.filter(
        (req) => req._id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setIncomingRequests,
  setOutgoingRequests,
  setMyConnections,
  removeIncomingRequest,
  setLoading,
} = connectionSlice.actions;

// Selectors
export const selectIncomingRequests = (state) =>
  state.connections.incomingRequests;
export const selectOutgoingRequests = (state) =>
  state.connections.outgoingRequests;
export const selectMyConnections = (state) => state.connections.myConnections;
export const selectConnectionsLoading = (state) => state.connections.loading;

export default connectionSlice.reducer;