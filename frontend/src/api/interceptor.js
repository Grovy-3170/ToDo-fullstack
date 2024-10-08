import axios from 'axios';
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getToken = () => {
  const token = localStorage.getItem('authToken');
  return token;
};

const api = axios.create({
  baseURL: BASE_URL, // Set your base URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 404) {
      const errorMessage = error.response.data?.error;
      if (errorMessage === 'company not found') {
        alert('Company not found');
      }
    }
    return Promise.reject(error);
  }
);

export default api;