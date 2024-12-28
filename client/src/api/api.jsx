import axios from 'axios';
import useAuthStore from '../store/useAuthStore';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    // withCredentials: true,
});



// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const { token } = useAuthStore.getState();
        console.log("token : ", token)
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
