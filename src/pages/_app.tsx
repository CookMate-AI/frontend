import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { useEffect } from 'react';

import Footer from '@/components/layout/Footer';
import Gnb from '@/components/layout/Gnb';
import useAuthStore from '@/stores/auth/useAuthStore';

export default function App({ Component, pageProps }: AppProps) {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <div>
      <Gnb />
      <div className="min-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-260px)] w-full bg-beige-200">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
