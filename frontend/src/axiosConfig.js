import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://full-stack-ecommerce-website-backend-mnja.onrender.com';

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
        const token = localStorage.getItem('token')
        if(token){
            localStorage.removeItem('token');
            toast.error('Session expired or unauthorized', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    return Promise.reject(err);
  }
);

export default axios;
