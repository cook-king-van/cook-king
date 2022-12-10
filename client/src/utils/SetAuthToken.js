import api from './api';

// store our JWT in LS/SS and set axios headers if we do have a token

const setAuthToken = (token, isLocal) => {
  const storage = isLocal ? localStorage : sessionStorage;
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    storage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    storage.removeItem('token');
  }
};

export default setAuthToken;
