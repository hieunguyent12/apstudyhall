import { useState, useRef } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRouter } from "next/router";
import toast, { ToastPosition } from "react-hot-toast";

import { supabase } from "../../supabaseClient";
import { Comment } from "../../types";
import { useAuth } from "../../context/authContext";

const toastOptions = {
  duration: 2000,
  position: "bottom-right" as ToastPosition,
};

const successToast = () =>
  toast.success("Successfully posted comment!", toastOptions);
const errorToast = () =>
  toast.error("An error occured while posting your comment", toastOptions);

function CommentList({
  comments: _comments,
  isInsideModal,
}: {
  comments: Comment[];
  isInsideModal: boolean;
}) {
  const [comments, setComments] = useState(_comments);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const auth = useAuth();
  const router = useRouter();

  const postComment = async (comment: string) => {
    if (comment === "") return;

    const user = auth.user;
    const isLoggedIn = !!user;

    if (!isLoggedIn) return;

    const post_id = router.query.postId;

    setIsPostingComment(true);

    const result = await supabase.from("comments").insert({
      post_id,
      author_id: user.id,
      content: comment,
    });

    if (result.data) {
      const newComment = { ...result.data[0] } as unknown as Comment;

      newComment.profiles = {
        name: user.name,
      };

      if (result.error) {
        errorToast();
      } else {
        successToast();
        setComments([newComment, ...comments]);
      }

      setIsPostingComment(false);
    }
  };

  const containerProps = isInsideModal
    ? {
        className: "overflow-y-auto",
        style: {
          height: "560px",
        },
      }
    : {};

  return (
    <>
      <div {...containerProps}>
        <CommentListHeader
          commentsCount={comments.length}
          postComment={postComment}
          isPostingComment={isPostingComment}
          isInsideModal={isInsideModal}
        />

        <div className={`${isInsideModal && "px-6"}`}>
          {comments.map((comment: Comment) => (
            <div key={comment.id} className="my-4">
              <p className="text-sm font-medium">
                {comment.profiles.name}
                <span className="font-normal text-slate-500 ml-1.5">
                  5 days ago
                </span>
              </p>

              <p className="text-sm">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

type HeaderProps = {
  commentsCount: number;
  postComment: (comment: string) => void;
  isPostingComment: boolean;
  isInsideModal: boolean;
};

function CommentListHeader({
  commentsCount,
  postComment,
  isPostingComment,
  isInsideModal,
}: HeaderProps) {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [comment, setComment] = useState("");
  const [parentRef] = useAutoAnimate(/* optional config */);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      {/* @ts-ignore */}
      <div ref={parentRef} className={`${isInsideModal && "px-6"}`}>
        <div className="flex justify-between items-center">
          <p>{commentsCount} comments</p>
          <button
            className="flex text-sm items-center bg-slate-100 p-1.5 hover:bg-slate-200  rounded-md cursor-pointer text-slate-500"
            onClick={() => setIsAddingComment(!isAddingComment)}
          >
            💬 New comment
          </button>
        </div>

        {isAddingComment && (
          <div>
            <textarea
              className="w-full mt-3 p-2 shadow appearance-none border rounded text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="exampleFormControlTextarea1"
              rows={5}
              placeholder="Write your comment"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              maxLength={500}
              ref={inputRef}
              autoFocus
            />

            <div className="flex justify-end">
              <button
                type="button"
                className="inline-flex justify-center ml-auto rounded-md border border-transparent bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-25"
                onClick={() => postComment(comment)}
                disabled={isPostingComment}
              >
                Post
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CommentList;
