import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  recipes: [],
  error: '',
};

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    createRecipeLoading(state, action) {
      state.loading = true;
      state.error = '';
    },
    createRecipeSuccess(state, action) {
      state.loading = false;
      state.recipes = [...state.recipes, action.payload];
      state.error = '';
    },
    createRecipeFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { createRecipeLoading, createRecipeSuccess, createRecipeFailure } =
  recipeSlice.actions;

export default recipeSlice.reducer;

export const createRecipe = (recipe) => async (dispatch, getState) => {
  try {
    dispatch(createRecipeLoading());

    const {
      user: { userInfo },
    } = getState();

    const token =
      sessionStorage.getItem('token') || localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const recipes = { ...recipe, id: userInfo._id };
    const { data } = await axios.post('/api/recipes/', recipes, config);

    dispatch(createRecipeSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(createRecipeFailure(message));
  }
};
