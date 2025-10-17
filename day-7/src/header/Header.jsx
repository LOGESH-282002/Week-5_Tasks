import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/store/authStore";

export default function Header() {
  const router = useRouter();
  const { logout: authLogout } = useAuth();

  const logout = () => {
    authLogout();
    router.push("/");
  };
  return (
    <nav className="nav">
      <h1 className="logo">Blog Manager</h1>
      <div className="link">
        <Link href="/dashboard" className="link1">
          All Post
        </Link>
        <Link href="/addPost" className="link2">
          Add a Post
        </Link>
        <Link href="/profile" className="link2">
          Profile
        </Link>
        <button onClick={logout} className="logout">
          Logout
        </button>
      </div>

    </nav>
  );
}
