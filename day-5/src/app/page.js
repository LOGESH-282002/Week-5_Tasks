'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from './store/authStore';
import Link from 'next/link';

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, setError, error, token, isInitialized, initialize } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        initialize();
    }, [initialize]);

    useEffect(() => {
        if (isInitialized && token) {
            router.push('/dashboard');
        }
    }, [token, isInitialized, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Login failed');

            login(data.token, data.user);
            router.push('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    if (!isInitialized) {
        return <div>Loading...</div>;
    }

    if (token) {
        return null;
    }

    return (
        <div className='log_form'>
            <form onSubmit={handleSubmit} className="form">
                <h2>Login</h2>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="input"
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="input"
                />
                {error && <p className="error">{error}</p>}
                <button type="submit" className="button loginbutton">Login</button>
                <p className='acc'>Don't have an account? <Link href="/signup">Signup</Link></p>
            </form>
        </div>
    );
}