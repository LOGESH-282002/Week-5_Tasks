'use client';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Dashboard() {
  const { user, token, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <ProtectedRoute>
      <div className="dashboard-wrap">
        <section className="dashboard-main-card">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Welcome to Dashboard</h1>
            <button onClick={handleLogout} className="dashboard-logout-btn">
              Logout
            </button>
          </div>
          {user ? (
            <div className="dashboard-user-info">
              <h2>User Information</h2>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>

              <h2>Authentication Token</h2>
              <div className="dashboard-token-container">
                <p><strong>Token:</strong></p>
                <code className="dashboard-token">{token}</code>
              </div>
            </div>
          ) : (
            <div className="dashboard-empty">No user data available</div>
          )}
        </section>
      </div>
    </ProtectedRoute>
  );
}
