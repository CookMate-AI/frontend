import { AxiosError } from 'axios';

import { api } from '@/lib/api/axios';

export const postSendFindIdEmail = async (email: string) => {
  try {
    const res = await api.post('/users/find-id/send-Email', { email });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error('find-id/send-Email 에러 발생');
  }
};

export interface VerifyIdCodePayload {
  email: string;
  code: string;
}

export const postVerifyFindIdCode = async (payload: VerifyIdCodePayload) => {
  try {
    const res = await api.post('/users/find-id/certification', payload);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error('find-id/certification 에러 발생');
  }
};

export interface FindPasswordPayload {
  userId: string;
  email: string;
}

export const postFindPassword = async (payload: FindPasswordPayload) => {
  try {
    const res = await api.post('/users/find-pw', payload);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error('find-pw 에러 발생');
  }
};
