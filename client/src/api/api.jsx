import axios from 'axios'
import useAuthStore from '../store/useAuthStore'

const { token } = useAuthStore();

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
    withCredentials: true,
})

export default api