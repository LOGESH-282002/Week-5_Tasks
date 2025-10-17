'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../store/authStore';

export default function Guard({ children }) {
  const { token, ready, init } = useAuth();
  const router = useRouter();

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (ready && !token) {
      router.push('/');
    }
  }, [token, ready, router]);

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return null;
  }

  return (
    <>
      {children}
    </>
  );
}
