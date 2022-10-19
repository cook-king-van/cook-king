import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  userInfo: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user'))
    : null,
  error: '',
  bio: {},
  isRemember: false,
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
      state.isRemember = false;
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
    userUpdateLoading(state, action) {
      state.loading = true;
    },
    userUpdateSuccess(state, action) {
      state.loading = false;
      state.bio = action.payload;
    },
    userUpdateFailure(state, action) {
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
  userDetailsLoading,
  userDetailsSuccess,
  userDetailsFailure,
  userDetailsReset,
  userUpdateLoading,
  userUpdateSuccess,
  userUpdateFailure,
  updateIsRemember,
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

    const parsedData = JSON.stringify(data.token);

    // store the user in localStorage if checkbox is ticked
    if (isRemember) {
      dispatch(updateIsRemember(true));
      localStorage.setItem('user', parsedData);
    } else {
      dispatch(updateIsRemember(false));
      sessionStorage.setItem('user', parsedData);
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
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');
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

      localStorage.removeItem('user');
      sessionStorage.setItem('user', JSON.stringify(data.token));
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
      users: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

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

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateLoading());

    const {
      users: { userInfo, isRemember },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch(userUpdateSuccess(data));
    dispatch(userLoginSuccess(data));
    const parsedData = JSON.stringify(data.token);
    if (isRemember) {
      localStorage.setItem('user', JSON.stringify(parsedData));
    } else {
      sessionStorage.setItem('user', JSON.stringify(parsedData));
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
