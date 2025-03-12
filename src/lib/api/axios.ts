import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

type FailedRequest = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};

export const api = axios.create({
  // baseURL: '/api',
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': true,
  },
  withCredentials: true,
});

// 토큰 갱신 중인지 확인하는 변수
let isRefreshing = false;
// 갱신 중에 대기하는 요청 목록
let failedQueue: FailedRequest[] = [];

// 대기 중인 요청 처리
const processQueue = (error: unknown, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    } else {
      console.warn('토큰이 없습니다. 인증이 실패할 가능성이 높음.');
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    // 성공 응답에서 새 토큰이 있는지 확인
    const newToken = response.headers['authorization'];
    if (newToken) {
      localStorage.setItem('accessToken', newToken);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 406 에러이면서 재시도하지 않은 요청인 경우 (백엔드에서 토큰 만료시 406 반환)
    if (error.response?.status === 406 && !originalRequest._retry) {
      if (isRefreshing) {
        // 이미 토큰 갱신 중이면 대기열에 추가
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = token;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // 토큰 갱신 요청
        const response = await axios.post(
          '/api/reissue',
          {},
          {
            withCredentials: true, // 쿠키 전송을 위해 필수
          },
        );

        // 새 accessToken 저장
        const newToken = response.headers['authorization'];
        if (newToken) {
          localStorage.setItem('accessToken', newToken);

          // 대기 중인 요청 처리
          processQueue(null, newToken);

          // 새 토큰으로 헤더 업데이트
          originalRequest.headers.Authorization = newToken;

          isRefreshing = false;
          // 실패했던 요청 재시도
          return axios(originalRequest);
        } else {
          throw new Error('새 토큰이 없습니다');
        }
      } catch (refreshError) {
        // 토큰 갱신 실패 또는 refresh 토큰도 만료된 경우
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userNickname');

        // 대기 중인 요청 실패 처리
        processQueue(refreshError);
        isRefreshing = false;

        alert('토큰이 만료되었습니다. 다시 로그인해 주세요.')

        // 로그인 페이지로 리다이렉트 (필요시 활성화)
        window.location.href = '/login';

        return Promise.reject(refreshError);
      }
    }

    // 다른 에러는 그대로 반환
    return Promise.reject(error);
  },
);
