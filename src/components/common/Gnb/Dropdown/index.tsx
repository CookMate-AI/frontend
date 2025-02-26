import { useRouter } from 'next/router';
import useDropdownStore from '@/stores/useDropdownStore';
import { useEffect, useRef } from 'react';
import { postLogout } from '@/lib/api/logout';

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

  const handleLogout = async () => {
    try {
      await postLogout();
    } catch (error) {
      console.error('로그아웃 중 에러 발생', error);
    } finally {
      localStorage.removeItem('token');
      router.push('/');
    }
  };

  return (
    <div
      className="absolute left-1/2 top-70 z-10 flex h-120 w-110 -translate-x-1/2 transform flex-col rounded-12 bg-white shadow-md"
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
          handleLogout();
        }}
        className="h-60 w-full rounded-b-12 text-16 text-gray-800 hover:bg-gray-200"
      >
        로그아웃
      </button>
    </div>
  );
}
