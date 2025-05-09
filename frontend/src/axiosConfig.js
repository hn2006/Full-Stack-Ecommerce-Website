import axios from 'axios';
import { toast } from 'react-toastify';

// 1. Base URL
axios.defaults.baseURL = 'https://full-stack-ecommerce-website-backend-mnja.onrender.com';

// 2. Attach token from localStorage on every request
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 || err.response?.status === 403) {
      localStorage.removeItem('token');
      toast.error('Session expired or unauthorized. Redirecting to Home.', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
    return Promise.reject(err);
  }
);

export default axios;
