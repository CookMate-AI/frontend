import { api } from './axios';
import { AxiosError } from 'axios';

interface InfoData {
  num: number;
  nickName: string;
  userPw: string;
}

export const getCheckNickname = async (nickName: string) => {
  try {
    const res = await api.get(`/users/check-nickname`, { params: { nickName: nickName } });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error('get-check-nickname 에러 발생');
  }
};

export const getInfo = async () => {
  try {
    const res = await api.get(`/users/info`);
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
    const res = await api.put(`/users/info`, userData);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error('put-info 에러 발생');
  }
};

export const postPw = async (pw: string) => {
  try {
    const res = await api.post(`/users/info`, { pw: pw });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSecession = async () => {
  try {
    const res = await api.delete('/users/secession');
    return res.data;
  } catch (error) {
    throw error;
  }
}