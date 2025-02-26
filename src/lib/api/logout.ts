import { api } from './axios';
import { AxiosError } from 'axios';

export const postLogout = async () => {
  try {
    const res = await api.post(`/users/logout`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error('logout 에러 발생');
  }
};
