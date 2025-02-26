import { api } from './axios';
import { AxiosError } from 'axios';

interface LoginData {
  username: string;
  password: string;
}

interface CertificationData {
  email: string;
  code: string;
}

interface FindPwData {
  userId: string;
  email: string;
}

export const postLogin = async (userData: LoginData) => {
  try {
    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("password", userData.password);

    const res = await api.post(`/users/signin`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const token = res.headers["authorization"];
    if (token) {
      localStorage.setItem("token", token);
      // console.log("토큰이 로컬스토리지에 저장됨:", token);
    } else {
      console.warn("토큰이 응답에 없음");
    }

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error("signin 에러 발생");
  }
};


export const postFindIdSendEmail = async (userEmail: string) => {
  try {
    const res = await api.post(`/users/find-id/send-Email`, { email: userEmail });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error('find-id/send-Email 에러 발생');
  }
};

export const postFindIdCertification = async (userData: CertificationData) => {
  try {
    const res = await api.post(`/users/find-id/certification`, userData);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error('find-id/certification 에러 발생');
  }
};

export const postFindPw = async (userData: FindPwData) => {
  try {
    const res = await api.post(`/users/find-pw`, userData);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error.message;
    }
    throw new Error('find-pw 에러 발생');
  }
};
