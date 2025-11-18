import { create } from 'zustand';

interface PasswordStore {
  isOpen: boolean;
  openPasswordEdit: () => void;
  closePasswordEdit: () => void;
}

const usePasswordStore = create<PasswordStore>((set) => ({
  isOpen: false,
  openPasswordEdit: () => set({ isOpen: true }),
  closePasswordEdit: () => set({ isOpen: false }),
}));

export default usePasswordStore;
