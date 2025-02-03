import { create } from 'zustand';

interface DropdownStore {
  isOpen: boolean;
  openDropdown: () => void;
  closeDropdown: () => void;
}

const useDropdownStore = create<DropdownStore>((set) => ({
  isOpen: false,
  openDropdown: () => set({ isOpen: true }),
  closeDropdown: () => set({ isOpen: false }),
}));

export default useDropdownStore;
