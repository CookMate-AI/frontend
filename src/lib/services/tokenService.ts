const ACCESS_TOKEN_KEY = 'accessToken';
const NICKNAME_KEY = 'userNickname';

export const tokenService = {
  getAccessToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  setAccessToken(token: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  setNickname(nickname: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(NICKNAME_KEY, nickname);
  },

  clear() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(NICKNAME_KEY);
  },
};
