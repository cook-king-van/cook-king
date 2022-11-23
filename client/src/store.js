import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/users/userSlice';
import recipeReducer from './features/recipes/recipeSlice';

export const store = configureStore({
  reducer: {
    user: usersReducer,
    recipes: recipeReducer,
  },
});

export default store;
