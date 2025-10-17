'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, setError, error } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Attempting to connect to:', `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`);
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');

      login(data.token, data.user);
      router.push('/dashboard');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to connect to server');
    }
  };

  return (
    <div className="log_form">
      <form onSubmit={handleSubmit} className="form">
        <h2>signup</h2>
        <label htmlFor="name">Name:</label>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="input"/>
        <label htmlFor="email">Email:</label>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input"/>
        <label htmlFor="password">Password:</label>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input"/>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="button signupbutton">Signup</button>
        <p className='acc'>Already have an account? <Link href="/login">Login</Link></p>
      </form>
    </div>
  );
}
