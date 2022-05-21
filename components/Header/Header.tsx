import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";

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
      className="flex justify-center fixed top-0 z-50 bg-white border-slate-200"
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

function DesktopMenu() {
  const menuItemClassName =
    "p-2 cursor-pointer hover:bg-violet-500 hover:text-white rounded-md";
  return (
    <div className="hidden md:flex items-center">
      <Link href="/resources">
        <p className={`mx-4 ${menuItemClassName}`}>AP Resources</p>
      </Link>
      <Link href="/forum">
        <p className={menuItemClassName}>Forum</p>
      </Link>
    </div>
  );
}

function MobileBurgerMenu() {
  const router = useRouter();
  return (
    <Menu as="div" className="md:hidden">
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
        <Menu.Items className="absolute right-5 w-40 z-50 origin-top-right divide-y divide-gray-100 rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => router.push("/resources")}
                >
                  AP Resources
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => router.push("/forum")}
                >
                  Forum
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
