import { configureStore } from '@reduxjs/toolkit';
import backgroundReducer from '../features/backgroundSlice';

const store = configureStore({
  reducer: {
    background: backgroundReducer,
  },
});

export default store;