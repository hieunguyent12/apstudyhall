import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";

import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  let [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="relative w-screen h-screen">
        <Head>
          <title>AP Study Hall</title>
          <meta name="description" content="AP Study Hall" />
        </Head>

        <div className="relative mx-auto max-w-2xl p-4">
          <Header />
          <Component {...pageProps} />
        </div>

        <div className="flex absolute bottom-3 left-0 w-full justify-center items-center">
          <p>Made by Hieu N.</p>
          <button
            className="ml-4 bg-violet-500 p-2 rounded-md text-white hover:bg-violet-600"
            onClick={() => setIsModalOpen(true)}
          >
            Give feedback ✏️
          </button>
        </div>
      </div>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Submit
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

export default MyApp;
