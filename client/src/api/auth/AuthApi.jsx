import api from '../api';

export const signin = async (email, password) => {
    const response = await api.post('/auth/signin', { email, password });
    return response.data;
};


export const signup = async (username, email, password, displayPicture) => {
    const response = await api.post('/auth/signup', { username, email, password, displayPicture });
    return response.data;
}

export const getUser = async () => {
    const response = await api.get('/auth/profile');
    return response.data;
}

export const getProfile = async (id) => {
    const response = await api.get(`/auth/user/${id}`);
    return response.data;
}