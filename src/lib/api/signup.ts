import { api } from './axios';
import { AxiosError } from 'axios';

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
    const res = await api.get(`/users/check-id`, {
      params: { userId },
    });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error('check-id 에러 발생');
  }
};

export const postCheckEmailSendEmail = async (userEmail: string) => {
  try {
    const res = await api.post('/users/check-Email/send-Email', { email: userEmail });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error('check-Email/send-Email 에러 발생');
  }
};

export const postCheckEmailCertification = async (userData: CertificationData) => {
  try {
    const res = await api.post('/users/check-Email/certification', userData);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error('check-Email/certification 에러 발생');
  }
};

export const postSignup = async (userData: SignupData) => {
  try {
    const res = await api.post('/users/signup', userData);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error('signup 에러 발생');
  }
};
