import api from '../api';

export const getAllRecipes = async ({ page = 1, limit = 10 }) => {
    const response = await api.get(`/recipe/?page=${page}&limit=${limit}`);
    return response.data;
}

export const getRecipe = async (id) => {
    const response = await api.get(`/recipe/${id}`);
    return response.data;
}
export const createRecipe = async (image, title, ingredients, details, notes, directions, tags) => {
    const recipe = {
        image,
        videoUrl: null,
        title,
        ingredients,
        details,
        notes,
        directions,
        tags,
    };

    const response = await api.post('/recipe/addRecipe', recipe);

    return response.data;
};


export const updateRecipe = async (id) => {
    const response = await api.put(`/recipe/${id}`);
    return response.data;
}

export const deleteRecipe = async (id) => {
    const response = await api.delete(`/recipe/${id}`);
    return response.data;
}