import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': true,
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("토큰이 정상적으로 추가됨:", config.headers.Authorization);
    } else {
      console.warn("토큰이 없습니다. 인증이 실패할 가능성이 높음.");
    }
    return config;
  },
  (error) => Promise.reject(error)
);
