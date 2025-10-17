'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';

export default function ProtectedRoute({ children }) {
  const { token, isInitialized, initialize } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (isInitialized && !token) {
      router.push('/');
    }
  }, [token, isInitialized, router]);

  if (!isInitialized) {
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
