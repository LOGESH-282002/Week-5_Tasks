"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Guard from "../components/ProtectedRoute";
import Header from "../../header/Header";

export default function Add() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const add = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert("Please fill in both title and body");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    };

    const existingPosts = JSON.parse(localStorage.getItem("posts") || "[]");

    const updatedPosts = [newPost, ...existingPosts];

    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    setTitle("");
    setBody("");

    alert("Post added successfully!");
    router.push("/dashboard");
  };

  return (
    <Guard>
      <div>
        <Header />
        <h1 className="head">Add a New Post</h1>
        <form onSubmit={add}>
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
            <button type="submit" className="add">Add</button>
          </div>
        </form>
      </div>
    </Guard>
  );
}
