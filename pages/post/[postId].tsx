import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import PostDetail from "../../components/Post/PostDetail";
import { supabase } from "../../supabaseClient";
import { PostType } from "../../types";

const Post: NextPage = () => {
  const [post, setPost] = useState<PostType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const postId = router.query.postId;

    async function getPost() {
      if (!postId) return;

      const result = await supabase
        .from("posts")
        .select(
          `
          id,
          title,
          content,
          created_at,
          profiles:author_id (id, name),
          comments (id, created_at, content, author_id, profiles (id, name))
        `
        )
        .match({ id: postId });

      if (result.data) {
        setPost(result.data[0] as unknown as PostType);
      }
    }

    getPost();
  }, [router]);

  return (
    <div>
      <PostDetail isModal={false} post={post} />
    </div>
  );
};

export default Post;
