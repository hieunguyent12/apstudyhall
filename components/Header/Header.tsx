import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import toast, { ToastPosition } from "react-hot-toast";

import { supabase } from "../../supabaseClient";
import { useAuth } from "../../context/authContext";

const toastOptions = {
  duration: 2000,
  position: "bottom-right" as ToastPosition,
};

const signOutSuccessToast = () =>
  toast.error("You are signed out!", toastOptions);
const signOutErrorToast = () =>
  toast.error("An error occured while signing you out", toastOptions);

export default function Header() {
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.onscroll = () => onScrollHandler();

    function onScrollHandler() {
      const header = headerRef.current;
      if (header) {
        const sticky = header.offsetTop;

        if (window.scrollY > sticky) {
          header.classList.add("border-b-2");
        } else {
          header.classList.remove("border-b-2");
        }
      }
    }
  }, [headerRef]);

  return (
    <div
      className="flex justify-center fixed top-0 pr-2 z-50 bg-white border-slate-200"
      ref={headerRef}
      style={{
        // This is needed to ensure that the header doesn't shift when scrollbar is shown
        width: "100vw",
      }}
    >
      <div
        className="px-4 md:px-0 flex items-center justify-between py-2 mx-auto"
        style={{ width: "672px" }}
      >
        <Link href="/">
          <p className="text-xl website-title text-slate-700 cursor-pointer">
            📚 AP Study Hall
          </p>
        </Link>
        <DesktopMenu />
        <MobileBurgerMenu />
      </div>
    </div>
  );
}

const menuItems = [
  { name: "AP Resources", url: "/resources" },
  { name: "Forum", url: "/forum" },
  { name: "Login", url: "/login" },
];

function DesktopMenu() {
  const auth = useAuth();
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
  }, []);

  const menuItemClassName =
    "p-2 cursor-pointer hover:bg-violet-500 hover:text-white rounded-md";
  return (
    <div className="hidden md:flex items-center mr-2">
      {menuItems.map((item) => {
        // TODO: can we find a way to prevent flahses of content?
        // TODO: can we animate this so that the menu smoothly  move left a bit?
        if (isMountedRef.current && auth.isLoggedIn && item.name === "Login") {
          return (
            <Menu
              as="div"
              className="relative inline-block text-left ml-5"
              key={item.name}
            >
              <div>
                <Menu.Button className="inline-flex w-full justify-center items-center p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer rounded-md">
                  {auth.user?.name}
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-40 z-50 origin-top-right divide-y divide-gray-100 rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="p-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-red-100 text-red-700" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={async () => {
                            const { error } = await supabase.auth.signOut();

                            if (error) {
                              signOutErrorToast();
                            }
                          }}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          );
        }
        return (
          <Link href={item.url} key={item.name}>
            <p className={`ml-4 ${menuItemClassName}`}>{item.name}</p>
          </Link>
        );
      })}
    </div>
  );
}

function MobileBurgerMenu() {
  const router = useRouter();
  const auth = useAuth();
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
  }, []);

  const renderMenuItems = () => {
    if (isMountedRef.current && auth.isLoggedIn && auth.user) {
      return (
        <>
          <div className="px-1">
            <Menu.Item>
              <p className="group flex w-full items-center text-sm rounded-md px-2 py-2 text-gray-900">
                {auth.user.name}
              </p>
            </Menu.Item>
          </div>
          <div className="p-1">
            {menuItems.slice(0, 2).map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => router.push(item.url)}
                  >
                    {item.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-red-100 text-red-700" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={async () => {
                    const { error } = await supabase.auth.signOut();

                    if (error) {
                      signOutErrorToast();
                    }
                  }}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </>
      );
    } else {
      return (
        <div className="px-1 py-1">
          {menuItems.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => router.push(item.url)}
                >
                  {item.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      );
    }
  };

  return (
    <Menu as="div" className="md:hidden relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center py-2 text-sm font-medium">
          <MenuIcon className="h-7 w-7 text-slate-600" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-40 z-50 origin-top-right divide-y divide-gray-100 rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {renderMenuItems()}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
