"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../header/Header";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token) {
            router.push('/');
            return;
        }

        if (userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, [router]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!user) {
        return <div className="error">User not found</div>;
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="card">
                    <h1>User Profile</h1>
                    <div className="info">
                        <div className="field">
                            <label>Name:</label>
                            <span>{user.name}</span>
                        </div>
                        <div className="field">
                            <label>Email:</label>
                            <span>{user.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}