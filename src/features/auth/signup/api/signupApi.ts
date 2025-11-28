import { AxiosError } from 'axios';

import { api } from '@/lib/api/axios';

interface SignupData {
  userId: string;
  userPw: string;
  email: string;
}

export interface CertificationData {
  email: string;
  code: string;
}

export const getCheckUserId = async (userId: string) => {
  try {
    const res = await api.get(`/users/check-id`, { params: { userId } });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error.response?.data || error.message;
    throw new Error('check-id 에러 발생');
  }
};

export const postCheckEmailSendEmail = async (email: string) => {
  try {
    const res = await api.post(`/users/check-Email/send-Email`, { email });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error.response?.data || error.message;
    throw new Error('check-Email/send-Email 에러 발생');
  }
};

export const postCheckEmailCertification = async (data: CertificationData) => {
  try {
    const res = await api.post(`/users/check-Email/certification`, data);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error.response?.data || error.message;
    throw new Error('check-Email/certification 에러 발생');
  }
};

export const postSignup = async (data: SignupData) => {
  try {
    const res = await api.post(`/users/signup`, data);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error.response?.data || error.message;
    throw new Error('signup 에러 발생');
  }
};
