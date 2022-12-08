import api from './api';

// store our JWT in LS/SS and set axios headers if we do have a token

const setAuthToken = (token, isLocal) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    if (isLocal) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
  } else {
    delete api.defaults.headers.common['Authorization'];
    if (isLocal) {
      localStorage.removeItem('token');
    } else {
      sessionStorage.removeItem('token');
    }
  }
};

export default setAuthToken;
