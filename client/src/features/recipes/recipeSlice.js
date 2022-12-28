import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../utils/api';
import { loadUser } from '../users/userSlice';

const initialState = {
  loading: false,
  recipes: [],
  currentRecipe: {},
  authorRecipes: [],
  error: '',
};

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    createRecipeLoading(state, action) {
      state.loading = true;
      state.error = null;
    },
    createRecipeSuccess(state, action) {
      state.loading = false;
      state.recipes = [...state.recipes, action.payload];
      state.error = null;
    },
    createRecipeFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getRecipeLoading(state, action) {
      state.loading = true;
      state.error = null;
    },
    getRecipeSuccess(state, action) {
      state.loading = false;
      state.currentRecipe = action.payload;
      state.error = null;
    },
    getRecipeFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    likeRecipeLoading(state, action) {
      state.loading = true;
      state.error = null;
    },
    likeRecipeSuccess(state, action) {
      state.loading = false;
      state.currentRecipe = {
        ...state.currentRecipe,
        likeCount: (state.currentRecipe.likeCount += 1),
      };
    },
    likeRecipeFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    unlikeRecipeLoading(state, action) {
      state.loading = true;
      state.error = null;
    },
    unlikeRecipeSuccess(state, action) {
      state.currentRecipe = {
        ...state.currentRecipe,
        likeCount: (state.currentRecipe.likeCount -= 1),
      };
    },
    unlikeRecipeFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getAuthorRecipesLoading(state, action) {
      state.loading = true;
      state.error = null;
    },
    getAuthorRecipesSuccess(state, action) {
      state.loading = false;
      state.authorRecipes = action.payload;
      state.error = null;
    },
    getAuthorRecipesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteRecipeLoading(state, action) {
      state.loading = true;
      state.error = null;
    },
    deleteRecipeSuccess(state, action) {
      state.loading = false;
      state.recipes = state.recipes.filter(
        (recipe) => recipe._id !== action.payload
      );
    },
    deleteRecipeFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createRecipeLoading,
  createRecipeSuccess,
  createRecipeFailure,
  getRecipeLoading,
  getRecipeSuccess,
  getRecipeFailure,
  likeRecipeLoading,
  likeRecipeSuccess,
  likeRecipeFailure,
  unlikeRecipeLoading,
  unlikeRecipeSuccess,
  unlikeRecipeFailure,
  getAuthorRecipesLoading,
  getAuthorRecipesSuccess,
  getAuthorRecipesFailure,
  deleteRecipeLoading,
  deleteRecipeSuccess,
  deleteRecipeFailure,
} = recipeSlice.actions;

export default recipeSlice.reducer;

export const createRecipe = (recipe) => async (dispatch, getState) => {
  try {
    dispatch(createRecipeLoading());

    const {
      user: { userInfo },
    } = getState();

    const recipes = { ...recipe, id: userInfo._id };
    const { data } = await api.post('/api/recipes/', recipes);

    dispatch(createRecipeSuccess(data));
    dispatch(loadUser());
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(createRecipeFailure(message));
  }
};

export const getRecipe = (recipeId) => async (dispatch, getState) => {
  try {
    dispatch(getRecipeLoading());
    const { data } = await axios.get(`/api/recipes/${recipeId}`);
    dispatch(getRecipeSuccess(data));
    dispatch(getAuthorRecipes(data.userId._id));
  } catch (error) {
    dispatch(
      getRecipeFailure(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const likeRecipe = (recipeId) => async (dispatch, getState) => {
  try {
    dispatch(likeRecipeLoading());
    await api.put(`/api/recipes/like/${recipeId}`);
    dispatch(likeRecipeSuccess());
    dispatch(loadUser());
  } catch (error) {
    dispatch(
      likeRecipeFailure(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const unlikeRecipe = (recipeId) => async (dispatch, getState) => {
  try {
    dispatch(unlikeRecipeLoading());
    await api.put(`/api/recipes/unlike/${recipeId}`);
    dispatch(unlikeRecipeSuccess());
    dispatch(loadUser());
  } catch (error) {
    dispatch(
      unlikeRecipeFailure(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const getAuthorRecipes = (userId) => async (dispatch, getState) => {
  try {
    dispatch(getAuthorRecipesLoading());
    const { data } = await axios.get(`/api/users/${userId}/recipes`);
    dispatch(getAuthorRecipesSuccess(data));
  } catch (error) {
    dispatch(
      getAuthorRecipesFailure(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const deleteRecipe = (recipeId) => async (dispatch, getState) => {
  try {
    dispatch(deleteRecipeLoading());
    const { data } = await api.delete(`/api/recipes/${recipeId}`);
    dispatch(deleteRecipeSuccess(data));
    dispatch(loadUser());
  } catch (error) {
    dispatch(
      deleteRecipeFailure(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
