import { create } from 'zustand';

interface NicknameState {
  nickname: string;
  setNickname: (nickname: string) => void;
  clearNickname: () => void;
}

const useNicknameStore = create<NicknameState>((set) => ({
  nickname: '',
  setNickname: (nickname: string) => set({ nickname }),
  clearNickname: () => set({ nickname: '' }),
}));

export default useNicknameStore;
