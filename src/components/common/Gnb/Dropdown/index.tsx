import { useRouter } from 'next/router';
import useDropdownStore from '@/stores/useDropdownStore';
import { useEffect, useRef } from 'react';

export default function Dropdown() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, closeDropdown } = useDropdownStore();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeDropdown]);

  if (!isOpen) return null;

  return (
    <div
      className="absolute left-1/2 top-70 z-10 flex h-120 w-110 -translate-x-1/2 transform flex-col rounded-12 bg-gray-100 shadow-md"
      ref={ref}
    >
      <button
        onClick={() => {
          closeDropdown();
          router.push('/mypage');
        }}
        className="h-60 w-full rounded-t-12 text-16 text-gray-800 hover:bg-gray-200"
      >
        마이페이지
      </button>
      <button
        onClick={() => {
          closeDropdown();
          // 로그아웃 로직 구현
          router.push('/');
        }}
        className="h-60 w-full rounded-b-12 text-16 text-gray-800 hover:bg-gray-200"
      >
        로그아웃
      </button>
    </div>
  );
}
