'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './globals.css';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <nav>
          <div className="logo">
          <h2 className='tit'>App</h2>
          </div>
          <div className="links">
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link href="/posts" className={`nav-link ${pathname === '/posts' ? 'active' : ''}`}>
            Posts
          </Link>
          <Link href="/profile" className={`nav-link ${pathname === '/profile' ? 'active' : ''}`}>
            Profile
          </Link>
          </div>
        </nav>
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}