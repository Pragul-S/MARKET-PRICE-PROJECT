import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useAuthStore } from '@/store';
import { setAuthToken } from '@/utils/api';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const { token } = useAuthStore.getState();
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return <Component {...pageProps} />;
}
