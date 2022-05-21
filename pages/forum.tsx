import type { NextPage } from "next";

import Post from "../components/Post";

const mockData = [
  { id: 1, author: "Hieu Nguyen", content: "This is my first post!" },
  { id: 2, author: "John Cena", content: "You can't see me!" },
];

const Forum: NextPage = () => {
  return (
    <div className="mt-2">
      {mockData.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Forum;
