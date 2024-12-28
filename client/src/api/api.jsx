import axios from 'axios';
import useAuthStore from '../store/useAuthStore';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
});

// Add a request interceptor to include the token in every request
api.interceptors.request.use(
    (config) => {
        const { token } = useAuthStore(); // Get the current token from the store
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Set the Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
