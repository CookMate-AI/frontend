import { AxiosError } from 'axios';

import { api } from '@/lib/api/axios';

interface LoginData {
  username: string;
  password: string;
}

export const postLogin = async (userData: LoginData) => {
  try {
    const formData = new FormData();
    formData.append('username', userData.username);
    formData.append('password', userData.password);

    const res = await api.post(`/users/signin`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const token = res.headers['authorization'];
    const nickname = res.headers['user-nickname'];

    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('accessToken', token);
      }

      if (nickname) {
        localStorage.setItem('userNickname', nickname);
      }
    }

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error('signin 에러 발생');
  }
};
