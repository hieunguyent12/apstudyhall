import { Fragment, useEffect, useState } from "react";
import toast, { ToastPosition } from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";

import Input from "../../Input";
import { supabase } from "../../../supabaseClient";
import { UserType } from "../../../types";

const toastOptions = {
  duration: 2000,
  position: "bottom-right" as ToastPosition,
};

const successToast = () =>
  toast.success("Successfully submitted post!", toastOptions);
const errorToast = () =>
  toast.error("An error occured while submitting your post", toastOptions);

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  user: UserType | null;
};

export default function AddPostModal({
  isModalOpen: _isModalOpen,
  closeModal,
  user,
}: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(_isModalOpen);

  useEffect(() => {
    // if the parent component update the props, we want to keep the state up to date as well.
    setIsModalOpen(_isModalOpen);
  }, [_isModalOpen]);

  const createPost = async () => {
    if (title === "" || content === "" || !user) return;

    const result = await supabase.from("posts").insert({
      title,
      content,
      author_id: user.id,
    });

    if (result.error) {
      errorToast();
    } else {
      successToast();
    }
  };

  return (
    <>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
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

          <div className="fixed inset-0 overflow-y-auto">
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create a post
                  </Dialog.Title>
                  <div className="mt-2">
                    <Input
                      className="w-full p-2 my-2"
                      placeholder="Title"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      maxLength={50}
                    />
                    <textarea
                      className="w-full p-2 shadow appearance-none border rounded text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="exampleFormControlTextarea1"
                      rows={7}
                      placeholder="Type your feedback or ideas here"
                      onChange={(e) => setContent(e.target.value)}
                      value={content}
                      maxLength={500}
                    />

                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-25"
                      onClick={createPost}
                    >
                      Create post
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
