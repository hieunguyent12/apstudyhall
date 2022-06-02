import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

import Header from "../components/Header";
import FeedbackModal from "../components/Modals/FeedbackModal";
import NewUserModal from "../components/Modals/NewUserModal";
import Footer from "../components/Footer";
import { AuthContextProvider, useAuth } from "../context/authContext";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const auth = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewUserModalOpened, setIsNewUserModalOpened] = useState(
    auth.isNewUser
  );

  const closeModal = () => setIsModalOpen(false);

  const currentPath = router.pathname;
  const isHomePage = currentPath === "/";

  // This effect is needed to ensure that our state is up to date.
  useEffect(() => {
    setIsNewUserModalOpened(auth.isNewUser);
  }, [auth.isNewUser]);

  return (
    <>
      <div className="w-full h-full">
        <Head>
          <title>AP Study Hall</title>
          <meta name="description" content="AP Study Hall" />
        </Head>
        <Header />
        <div className="mx-auto max-w-2xl px-4 items-center justify-between pt-16">
          <Component {...pageProps} />
        </div>

        {isHomePage && <Footer openModal={() => setIsModalOpen(true)} />}
      </div>
      <FeedbackModal isModalOpen={isModalOpen} closeModal={closeModal} />
      <NewUserModal
        isModalOpen={isNewUserModalOpened}
        closeModal={() => {}}
        setUser={auth.setUser}
      />

      <Toaster />
    </>
  );
}

function AppWithAuthContext(props: AppProps) {
  return (
    <AuthContextProvider>
      <App {...props} />
    </AuthContextProvider>
  );
}

export default AppWithAuthContext;
