import Gnb from '@/components/common/Gnb';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Gnb />
      <Component {...pageProps} />
    </div>
  );
}
