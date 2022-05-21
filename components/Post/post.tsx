type Props = {
  post: {
    id: number;
    author: string;
    content: string;
  };
};

// TODO: Post detail should be a modal
export default function Post({ post }: Props) {
  return (
    <div className="relative border-slate-200 border rounded-md mb-7 p-3">
      <p
        className="absolute bg-white p-1 text-slate-400"
        style={{
          left: "15px",
          top: "-16px",
        }}
      >
        {post.author}
      </p>
      <p className="mt-3">{post.content}</p>
    </div>
  );
}
