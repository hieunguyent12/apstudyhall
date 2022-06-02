import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

import Post from "../components/Post";
import { PostType, Comment } from "../types";
import PostModal from "../components/Modals/PostModal";
import AddPostModal from "../components/Modals/AddPostModal";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/authContext";

const Forum: NextPage = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isAddingPost, setIsAddingPost] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const isMountedRef = useRef(false);

  useEffect(() => {
    async function getPosts() {
      const result = await supabase.from("posts").select(
        `
          id,
          title,
          content,
          created_at,
          profiles:author_id (id, name)
        `
      );

      setPosts(result.data as PostType[]);
    }

    getPosts();

    isMountedRef.current = true;
  }, []);

  useEffect(() => {
    setIsPostModalOpen(!!router.query.postId);

    // Fetch comments
    async function getCommentsAndSelectPost() {
      const result = await supabase
        .from("comments")
        .select(`id, created_at, content, author_id, profiles (id, name)`)
        .match({
          post_id: router.query.postId,
        });

      const post = posts.find((post) => post.id === router.query.postId);

      if (post) {
        const newPost = { ...post };

        newPost.comments = result.data as Comment[];
        setSelectedPost(newPost);
      }
    }

    if (router.query.postId) {
      getCommentsAndSelectPost();
    }
  }, [router.query.postId, posts]);

  const closePostModal = () => {
    setSelectedPost(null);
    setIsPostModalOpen(false);
    router.push("/forum");
  };

  const addPost = async () => {
    if (auth.isLoggedIn) {
      setIsAddingPost(true);
    }
  };

  return (
    <>
      <div className="mt-2">
        <div className="w-full flex justify-between">
          <p className="text-lg">Forum</p>
          {auth.isLoggedIn && isMountedRef.current && (
            <button
              onClick={addPost}
              className="ml-7 mb-3 rounded-md p-1 bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
            >
              ✏️ Create post
            </button>
          )}
        </div>
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>

      <PostModal
        isPostModalOpen={isPostModalOpen}
        closePostModal={closePostModal}
        post={selectedPost}
      />
      <AddPostModal
        isModalOpen={isAddingPost}
        closeModal={() => setIsAddingPost(false)}
        user={auth.user}
      />
    </>
  );
};

export default Forum;
