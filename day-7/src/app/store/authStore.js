import { create } from 'zustand';

export const useAuth = create((set) => ({
  token: null,
  user: null,
  error: null,
  ready: false,

  init: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      set({ 
        token, 
        user: user ? JSON.parse(user) : null,
        ready: true 
      });
    }
  },

  login: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user, error: null });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ token: null, user: null });
  },

  setError: (msg) => set({ error: msg }),
}));
