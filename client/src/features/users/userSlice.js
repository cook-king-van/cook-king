import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../utils/api';

const initialState = {
  loading: false,
  isAuthenticated: false,
  userInfo: {},
  error: '',
  token: sessionStorage.getItem('token') || localStorage.getItem('token'),
};

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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
    updateToken(state, action) {
      state.token = action.payload;
    },
    getLatestUserInfoLoading(state, action) {
      state.loading = true;
      state.error = null;
    },
    getLatestUserInfoSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
    },
    getLatestUserInfoFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
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
  userLoaded,
  userLoadedError,
  updateToken,
  getLatestUserInfoLoading,
  getLatestUserInfoSuccess,
  getLatestUserInfoFailure,
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
    dispatch(loadUser());

    // store the token in localStorage if checkbox is ticked
    if (isRemember) {
      localStorage.setItem('remember', true);
      localStorage.setItem('token', data.token);
    } else {
      localStorage.setItem('remember', false);
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
  localStorage.removeItem('recipe');
  dispatch(userLogout());
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

      localStorage.setItem('remember', true);
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

export const getLatestUserInfo = (userInfo) => async (dispatch) => {
  try {
    dispatch(getLatestUserInfoLoading());
    dispatch(getLatestUserInfoSuccess(userInfo));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(getLatestUserInfoFailure(message));
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateLoading());

    const {
      user: { token },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await api.put('/api/users/', user, config);

    dispatch(userUpdateSuccess(data));
    dispatch(loadUser());
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userUpdateFailure(message));
  }
};

export const saveRecipeToLocal = (recipe) => async (dispatch, getState) => {
  localStorage.setItem('recipe', JSON.stringify(recipe));
};

export const resetRecipeLocal = () => async (dispatch, getState) => {
  localStorage.removeItem('recipe');
};

export const getRefreshToken = () => async (dispatch) => {
  try {
    const res = await axios.get('api/auth/token');
    const { token } = res.data;
    dispatch(updateToken(token));
    const isRemember = localStorage.getItem('remember');
    if (isRemember) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
  } catch (error) {
    dispatch(logout());
  }
};
