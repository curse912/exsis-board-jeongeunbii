import { createContext, useContext, useState } from "react";
import { dummyPosts } from "../data/dummyPosts";
import { dummyComments } from "../data/dummyComments";

const PostContext = createContext(null);

export function PostProvider({ children }) {
  const [posts, setPosts] = useState(dummyPosts);
  const [comments, setComments] = useState(dummyComments);

  const addPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const updatePost = (updatedPost) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
  };

  const addComment = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  const deleteComment = (id) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <PostContext.Provider
      value={{ posts, setPosts, comments, addPost, updatePost, addComment, deleteComment }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostContext);
  if (!ctx) throw new Error("usePosts must be used within PostProvider");
  return ctx;
}
