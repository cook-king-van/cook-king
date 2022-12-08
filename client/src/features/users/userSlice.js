import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../utils/api';

const initialState = {
  loading: false,
  isAuthenticated: false,
  userInfo: {},
  error: '',
  isRemember: false,
  token: sessionStorage.getItem('token') || localStorage.getItem('token'),
  recipe: {},
};

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateIsRemember(state, action) {
      state.isRemember = action.payload;
    },
    userLoginLoading(state, action) {
      state.loading = true;
    },
    userLoginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    userLoginFailure(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    userLogout(state, action) {
      state.loading = false;
      state.userInfo = null;
      state.error = null;
      state.isRemember = false;
      state.isAuthenticated = false;
    },
    userRegisterLoading(state, action) {
      state.loading = true;
      state.error = null;
    },
    userRegisterSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    },
    userRegisterFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userUpdateLoading(state, action) {
      state.loading = true;
      state.error = null;
    },
    userUpdateSuccess(state, action) {
      state.loading = false;
      state.bio = action.payload;
      state.error = null;
    },
    userUpdateFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userLoaded(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    userLoadedError(state, action) {
      state.isAuthenticated = false;
      state.userInfo = {};
      state.token = '';
    },
    saveRecipe(state, action) {
      state.recipe = action.payload;
    },
    resetRecipe(state, action) {
      state.recipe = {};
    },
    updateToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const {
  userLoginLoading,
  userLoginSuccess,
  userLoginFailure,
  userLogout,
  userRegisterLoading,
  userRegisterSuccess,
  userRegisterFailure,
  userUpdateLoading,
  userUpdateSuccess,
  userUpdateFailure,
  updateIsRemember,
  userLoaded,
  userLoadedError,
  saveRecipe,
  resetRecipe,
  updateToken,
} = usersSlice.actions;

export default usersSlice.reducer;

//Thunk function
export const loginUser = (email, password, isRemember) => async (dispatch) => {
  try {
    dispatch(userLoginLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/auth/login',
      { email, password },
      config
    );

    dispatch(userLoginSuccess(data));

    // store the token in localStorage if checkbox is ticked
    if (isRemember) {
      dispatch(updateIsRemember(true));
      localStorage.setItem('token', data.token);
    } else {
      dispatch(updateIsRemember(false));
      sessionStorage.setItem('token', data.token);
    }
  } catch (error) {
    dispatch(
      userLoginFailure(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  dispatch(userLogout());
  dispatch(updateIsRemember(false));
  document.location.href = '/login';
};

export const registerUser =
  (email, password, passwordconfirm) => async (dispatch, getState) => {
    try {
      dispatch(userRegisterLoading());

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/auth/register',
        { email, password, passwordconfirm },
        config
      );

      dispatch(userRegisterSuccess(data));
      dispatch(userLoginSuccess(data));
      dispatch(updateIsRemember(false));

      localStorage.removeItem('token');
      sessionStorage.setItem('token', data.token);
    } catch (error) {
      dispatch(
        userRegisterFailure(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/api/auth/user');
    dispatch(userLoaded(res.data));
  } catch (error) {
    dispatch(userLoadedError());
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateLoading());

    const {
      user: { userInfo, isRemember, token },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await api.put(`/api/users/${userInfo._id}`, user, config);

    dispatch(userUpdateSuccess(data));
    dispatch(userLoginSuccess(data));
    if (isRemember) {
      localStorage.setItem('token', data.token);
    } else {
      sessionStorage.setItem('token', data.token);
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch(userUpdateFailure(message));
  }
};

export const saveRecipeToLocal = (recipe) => async (dispatch, getState) => {
  dispatch(saveRecipe(recipe));
  localStorage.setItem('recipe', JSON.stringify(recipe));
};

export const resetRecipeLocal = () => async (dispatch, getState) => {
  dispatch(resetRecipe());
  localStorage.removeItem('recipe');
};

export const getRefreshToken = () => async (dispatch, getState) => {
  try {
    const {
      user: { isRemember },
    } = getState();
    const res = await axios.get('api/auth/token');
    const { token } = res.data;
    dispatch(updateToken(token));
    if (isRemember) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
  } catch (error) {
    dispatch(logout());
  }
};
