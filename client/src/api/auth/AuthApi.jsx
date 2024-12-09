import api from '../api';

export const signin = async (email, password) => {
    const response = await api.post('/auth/signin', { email, password });
    () => {
        setTimeout(() => { }, 5000);
    }
    return response.data;
};


export const signup = async (username, email, password, displayPicture) => {
    const response = await api.post('/auth/sigup', { username, email, password, displayPicture });
    return response.data;
}