import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

import { PostType } from "../../../types";
import PostDetail from "../../Post/PostDetail";

type Props = {
  post: PostType | null;
  isPostModalOpen: boolean;
  closePostModal: () => void;
};

export default function PostModal({
  post,
  isPostModalOpen,
  closePostModal,
}: Props) {
  const focusRef = useRef(null);

  return (
    <Transition show={isPostModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={closePostModal}
        initialFocus={focusRef}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="h-full fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                style={{
                  width: "600px",
                  height: "700px",
                }}
                className="relative transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all"
              >
                <div ref={focusRef}>
                  <PostDetail
                    post={post}
                    isModal={true}
                    closePostModal={closePostModal}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
