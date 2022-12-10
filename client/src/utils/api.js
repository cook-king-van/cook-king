import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token === null) {
      return config;
    }
    config.headers['Authorization'] = `Bearer ${
      localStorage.getItem('token') || sessionStorage.getItem('token')
    }`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (
      err.response.status === 401 &&
      originalConfig.url !== 'api/auth/token'
    ) {
      try {
        const rs = await api.get('api/auth/token');
        const { token } = rs.data;
        localStorage.setItem('token', token);
        return api(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }

    if (err.response.data == 'Need to login') {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    }
    return Promise.reject(err);
  }
);

export default api;
