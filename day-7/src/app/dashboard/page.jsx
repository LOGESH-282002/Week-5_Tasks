"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../store/authStore";
import Guard from "../components/ProtectedRoute";
import Header from "../../header/Header";

export default function Dashboard() {
  const { logout } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const load = () => {
      const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
      setPosts(savedPosts);
    };

    load();
  }, []);


  const remove = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <Guard>
      <div>
        <Header />
        <h1 className="head">List of Posts</h1>
        <div className="container">
          {posts.length === 0 ? (
            <p>No posts yet. Add your first post!</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="post">
                <h1 className="tit">{post.title}</h1>
                <p className="bdy">{post.body}</p>
                <p className="date">Created: {new Date(post.createdAt).toLocaleDateString()}</p>
                <div className="btns">
                  <button
                    className="update"
                    onClick={() => router.push(`/updatePost?id=${post.id}`)}
                  >
                    Update
                  </button>
                  <button
                    className="delete"
                    onClick={() => remove(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Guard>
  );
}
