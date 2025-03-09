import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import useDropdownStore from '@/stores/useDropdownStore';
import { postLogout } from '@/lib/api/logout';

export default function Dropdown() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, closeDropdown } = useDropdownStore();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('accessToken'));
  }, []);

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
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userNickname');
      setToken(null);
      closeDropdown();
      router.push('/');
    }
  };

  return (
    <>
      {token ? (
        <div
          className="absolute left-1/2 top-45 z-10 flex h-90 w-80 -translate-x-1/2 transform flex-col rounded-12 bg-white shadow-md lg:top-70 lg:h-120 lg:w-110"
          ref={ref}
        >
          <button
            onClick={() => {
              closeDropdown();
              router.push('/mypage');
            }}
            className="h-45 w-full rounded-t-12 text-14 text-gray-800 hover:bg-gray-200 lg:h-60 lg:text-16"
          >
            마이페이지
          </button>
          <button
            onClick={() => {
              closeDropdown();
              handleLogout();
            }}
            className="h-45 w-full rounded-b-12 text-14 text-gray-800 hover:bg-gray-200 lg:h-60 lg:text-16"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div
          className="absolute left-1/2 top-45 z-10 flex h-90 w-80 -translate-x-1/2 transform flex-col rounded-12 bg-white shadow-md lg:top-70 lg:h-120 lg:w-110"
          ref={ref}
        >
          <button
            onClick={() => {
              closeDropdown();
              router.push('/login');
            }}
            className="h-45 w-full rounded-t-12 text-14 text-gray-800 hover:bg-gray-200 lg:h-60 lg:text-16"
          >
            로그인
          </button>
          <button
            onClick={() => {
              closeDropdown();
              router.push('/signup');
            }}
            className="h-45 w-full rounded-b-12 text-14 text-gray-800 hover:bg-gray-200 lg:h-60 lg:text-16"
          >
            회원가입
          </button>
        </div>
      )}
    </>
  );
}
