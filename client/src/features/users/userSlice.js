import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  userInfo: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user'))
    : null,
  error: null,
  bio: {},
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
      state.userInfo = action.payload;
    },
    userLoginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userLogout(state, action) {
      state.loading = false;
      state.userInfo = null;
      state.error = null;
      state.bio = {};
    },
    userRegisterLoading(state, action) {
      state.loading = true;
    },
    userRegisterSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
    },
    userRegisterFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userDetailsLoading(state, action) {
      state.loading = true;
    },
    userDetailsSuccess(state, action) {
      state.loading = false;
      state.bio = action.payload;
    },
    userDetailsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userDetailsReset(state, action) {
      state.loading = false;
      state.bio = {};
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
  userDetailsLoading,
  userDetailsSuccess,
  userDetailsFailure,
  userDetailsReset,
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

    // store the user in localStorage if checkbox is ticked
    if (isRemember) localStorage.setItem('user', data);
    else sessionStorage.setItem('user', data);
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
  localStorage.removeItem('user');
  dispatch(userLogout());
  document.location.href = '/login';
};

export const registerUser = (email, password) => async (dispatch) => {
  try {
    dispatch(userRegisterLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/auth/register',
      { email, password },
      config
    );

    dispatch(userRegisterSuccess(data));
    dispatch(userLoginSuccess(data));

    sessionStorage.setItem('user', JSON.stringify(data));
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

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(userDetailsLoading());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/auth/users/${id}`, config);

    dispatch(userDetailsSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch(userDetailsFailure(message));
  }
};
