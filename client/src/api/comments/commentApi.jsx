import api from "../api";

export const getComments = async (id) => {
    const response = await api.get(`/comments/${id}`);
    return response.data;
}

export const postComment = async (id, content) => {
    const response = await api.post(`/comments/${id}`, content);
    return response.data;
}