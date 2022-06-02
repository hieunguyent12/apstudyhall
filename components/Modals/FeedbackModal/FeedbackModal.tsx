import { useRef, Fragment } from "react";
import toast, { ToastPosition } from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";

import FeedbackForm from "../../FeedbackForm";

const toastOptions = {
  duration: 2000,
  position: "bottom-right" as ToastPosition,
};

const successToast = () =>
  toast.success("Feedback submitted successfully!", toastOptions);
const errorToast = () =>
  toast.error("An error occured while submitting feedback", toastOptions);

type FeedbackModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
};

export default function FeedbackModal({
  isModalOpen,
  closeModal,
}: FeedbackModalProps) {
  const toastIdRef = useRef<string | null>(null);

  const displayToast = (error: boolean) => {
    let toastId: string;
    if (error) {
      toastId = errorToast();
    } else {
      toastId = successToast();
    }

    toastIdRef.current = toastId;
  };

  return (
    <>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => {
            // when we close the modal, we want to dismiss all the toasts as well
            if (toastIdRef.current) toast.dismiss(toastIdRef.current);
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
                    Feedback
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      If you have any feedbacks or ideas to improve this
                      website, you can send them using the form below.
                    </p>

                    <FeedbackForm
                      closeModal={closeModal}
                      displayToast={displayToast}
                    />
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
