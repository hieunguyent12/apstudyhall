import { useRouter } from "next/router";

import { PostType } from "../../types";

type Props = {
  post: PostType;
};

export default function Post({ post }: Props) {
  const router = useRouter();

  return (
    <div
      className="relative border-slate-200 border rounded-md mb-3 p-3"
      onClick={() => {
        router.push(`/forum?postId=${post.id}`, `/post/${post.id}`);
      }}
    >
      <span className="text-sm p-1 bg-slate-100 text-slate-600 rounded-md mr-2">
        {post.profiles.name}
      </span>
      <span className="text-sm text-slate-500">5 days ago</span>
      <div className="mt-2">
        <p>{post.title}</p>
      </div>
    </div>
  );
}
