'use client';
import { useEffect } from 'react';
import { useAuth } from './store/authStore';
import './globals.css';

export default function RootLayout({ children }) {
  const login = useAuth((state) => state.login);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      login(token, JSON.parse(user));
    }
  }, [login]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
