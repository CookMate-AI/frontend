import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function requestRefreshToken(): Promise<string> {
  const res = await axios.post(
    `${API_URL}/reissue`,
    {},
    {
      withCredentials: true,
    },
  );

  const newToken = res.headers['authorization'];

  if (!newToken) {
    throw new Error('새 토큰이 없습니다.');
  }

  return newToken;
}
