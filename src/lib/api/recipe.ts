import { api } from './axios';
import { AxiosError } from 'axios';
import { RecipeSaveData } from '@/types/recipe';

export const postMenu = async (ingredients: string) => {
  try {
    const res = await api.post(`/recipe/menu`, { ingredients: ingredients });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error('recipe-menu 에러 발생');
  }
};

export const postRecommend = async (foodName: string) => {
  try {
    const res = await api.post(`/recipe/recommend`, {food: foodName});
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error('recipe-recommend 에러 발생');
  }
};

export const postSave = async (recipeData: RecipeSaveData) => {
  try {
    const res = await api.post(`/recipe/save`, recipeData);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error('recipe-save 에러 발생');
  }
};

export const deleteRecipe = async (recipeId: number) => {
  try {
    const res = await api.delete(`/recipe/${recipeId}`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error('recipe-delete 에러 발생');
  }
};

export const getInfo = async (page: number) => {
  try {
    const res = await api.get(`/recipe/my`, {
      params: { page },
    });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error('recipe-my 에러 발생');
  }
};
