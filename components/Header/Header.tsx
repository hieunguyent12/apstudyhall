import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MenuIcon } from "@heroicons/react/outline";

export default function Header() {
  return (
    <div className="flex items-center justify-between z-99999">
      <p className="text-xl">📚 AP Study Hall</p>
      <DesktopMenu />
      <MobileBurgerMenu />
    </div>
  );
}

function DesktopMenu() {
  return (
    <div className="hidden md:flex">
      <p className="px-4">AP Resources</p>
      <p>Forum</p>
    </div>
  );
}

function MobileBurgerMenu() {
  return (
    <Menu as="div" className="md:hidden">
      <div>
        <Menu.Button className="inline-flex w-full justify-cente py-2 text-sm font-medium">
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
                >
                  Edit
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
