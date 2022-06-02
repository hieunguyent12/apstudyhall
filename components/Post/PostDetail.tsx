import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import { PostType } from "../../types";
import CommentList from "../Comment/CommentList";

type Props = {
  post: PostType | null;
  closePostModal?: () => void;
  isModal: boolean;
};

export default function PostDetail({ post, closePostModal, isModal }: Props) {
  if (!post) return null;

  return (
    <>
      <div className={`${isModal && "px-6"}`}>
        <div className="flex justify-end items-center text-slate-500 my-3">
          {isModal && (
            <div
              className="flex items-center hover:bg-slate-200 p-1 rounded-md cursor-pointer"
              onClick={closePostModal}
            >
              <span>
                <XIcon className="h-4 w-4" />
              </span>
              <button className="text-sm">Close</button>
            </div>
          )}
        </div>
        {isModal ? (
          <Dialog.Title
            as="h3"
            className="text-lg mt-1 font-medium leading-6 text-gray-900"
          >
            {post.title}
          </Dialog.Title>
        ) : (
          <p>{post.title}</p>
        )}

        <div className="mt-2">
          <p className="text-md">{post.content}</p>
        </div>
      </div>
      <div className="mt-10">
        <CommentList comments={post.comments} isInsideModal={isModal} />
      </div>
    </>
  );
}
