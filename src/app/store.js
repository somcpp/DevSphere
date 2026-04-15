import { configureStore } from '@reduxjs/toolkit';
import onboardingReducer from '../features/onboarding/onboardingSlice';
import authReducer from '../features/auth/authSlice';
import feedReducer from '../features/feed/feedSlice';
import connectionsReducer from "../features/connections/connectionsSlice"

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
    auth: authReducer,
    feed: feedReducer,
    connections: connectionsReducer
  },
});