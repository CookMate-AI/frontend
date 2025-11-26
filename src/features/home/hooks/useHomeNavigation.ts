import { useRouter } from 'next/router';
import { useCallback } from 'react';

export function useHomeNavigation() {
  const router = useRouter();

  const handleMove = useCallback(() => {
    const token = localStorage.getItem('accessToken');

    if (token) router.push('/recipes');
    else router.push('/login');
  }, [router]);

  return { handleMove };
}
