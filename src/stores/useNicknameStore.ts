import { create } from 'zustand';

interface NicknameState {
  nickname: string;
  setNickname: (nickname: string) => void;
}

const useNicknameStore = create<NicknameState>((set) => ({
  nickname: '',
  setNickname: (nickname: string) => set({ nickname }),
}));

export default useNicknameStore;
