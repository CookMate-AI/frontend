import { api } from './axios';
import { AxiosError } from 'axios';

interface InfoData {
  num: number;
  nickname: string;
  userPw: string;
}

export const getInfo = async (userId: string) => {
  try {
    const res = await api.get(`/users/info`, {
      params: { userId },
    });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error('get-info 에러 발생');
  }
};

export const putInfo = async (userData: InfoData) => {
  try {
    const res = await api.put(`/users/find-pw`, userData);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error('put-info 에러 발생');
  }
};