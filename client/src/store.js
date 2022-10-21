import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/users/userSlice';

export const store = configureStore({
  reducer: {
    user: usersReducer,
  },
});

export default store;
