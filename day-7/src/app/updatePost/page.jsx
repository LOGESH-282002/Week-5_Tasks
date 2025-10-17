"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Guard from "../components/ProtectedRoute";
import Header from "../../header/Header";

export default function Update() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');
  
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postId) {
      const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
      const postToUpdate = savedPosts.find(post => post.id === parseInt(postId));
      
      if (postToUpdate) {
        setTitle(postToUpdate.title);
        setBody(postToUpdate.body);
      } else {
        alert("Post not found!");
        router.push("/dashboard");
      }
    }
    setLoading(false);
  }, [postId, router]);

  const update = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert("Please fill in both title and body");
      return;
    }

    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const updatedPosts = savedPosts.map(post => 
      post.id === parseInt(postId) 
        ? { ...post, title: title.trim(), body: body.trim() }
        : post
    );

    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    alert("Post updated successfully!");
    router.push("/dashboard");
  };

  if (loading) {
    return (
      <Guard>
        <div>
          <Header />
          <p>Loading...</p>
        </div>
      </Guard>
    );
  }

  return (
    <Guard>
      <div>
        <Header />
        <h1 className="head">Update Post</h1>
        <form onSubmit={update}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            className="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            className="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter post content"
            rows="6"
          />
          <div className="btns">
            <button type="submit" className="add">Update</button>
            <button 
              type="button" 
              className="delete"
              onClick={() => router.push("/dashboard")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Guard>
  );
}