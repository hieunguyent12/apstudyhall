import { Fragment, useEffect, useState, Dispatch, SetStateAction } from "react";
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
  toast.success("Successfully updated your name!", toastOptions);
const errorToast = () =>
  toast.error("An error occured while updating your name", toastOptions);

type NewUserModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  setUser: Dispatch<SetStateAction<UserType | null>>;
};

export default function NewUserModal({
  isModalOpen: _isModalOpen,
  closeModal,
  setUser,
}: NewUserModalProps) {
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(_isModalOpen);

  useEffect(() => {
    setIsModalOpen(_isModalOpen);
  }, [_isModalOpen]);

  const submitName = async () => {
    if (name === "") return;

    const user: any = supabase.auth.user();

    const profileObj = {
      id: user.id,
      name,
    };
    const result = await supabase.from("profiles").upsert(profileObj);

    if (result.error) {
      errorToast();
    } else {
      successToast();
      setIsModalOpen(false);
      setUser(profileObj);
    }
  };

  return (
    <>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => {
            // when we close the modal, we want to dismiss all the toasts as well
            // if (toastIdRef.current) toast.dismiss(toastIdRef.current);
            closeModal();
          }}
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
                    Create a name
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your name will be seen by others in the forum.
                    </p>

                    <Input
                      className="w-full p-2 my-2"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      maxLength={50}
                    />

                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-25"
                      onClick={submitName}
                    >
                      Set name
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
