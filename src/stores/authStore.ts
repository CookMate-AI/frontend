import { create } from 'zustand';

interface User {
  id: number;
  nickname: string;
}

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  initAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  token: null,
  user: null,

  login: (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ isLoggedIn: true, token, user });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ isLoggedIn: false, token: null, user: null });
  },

  initAuth: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      set({ isLoggedIn: true, token, user: JSON.parse(user) });
    }
  },
}));

export default useAuthStore;
