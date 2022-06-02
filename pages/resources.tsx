import type { NextPage, GetServerSideProps } from "next";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, SearchIcon } from "@heroicons/react/solid";
import React, { useState, useRef } from "react";

import Input from "../components/Input";
import { getAllResources } from "../resourcesUtils";

type ResourcesType = {
  name: string;
  content: string;
};

type Props = {
  resources: ResourcesType[];
};

const Resources: NextPage<Props> = ({ resources }) => {
  console.log(resources);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const renderClasses = () => {
    return resources
      .filter((resource) =>
        resource.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((resource) => {
        // TODO: we want the tab to stick underneath the header when we scroll down
        // if we reach a new tab, the new tab will replace the old tab
        return (
          <Disclosure key={resource.name}>
            {({ open }) => (
              <>
                <Disclosure.Button className="p-3 my-2 flex items-center w-full justify-between rounded-md ring-1 ring-black ring-opacity-5">
                  {resource.name}
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-zinc-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="text-gray-500">
                  <article
                    className="prose"
                    dangerouslySetInnerHTML={{
                      __html: resource.content,
                    }}
                  />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        );
      });
  };

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center mb-3">
        <p>Resources</p>
        <div className="relative z-10">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button onClick={() => searchInputRef.current?.focus()}>
              <SearchIcon className="h-4 w-4 text-gray-400" />
            </button>
          </span>
          <Input
            className="py-2 text-sm rounded-md pl-7 focus:outline-none"
            placeholder="Search..."
            onChange={onSearchInputChange}
            value={searchQuery}
            ref={searchInputRef}
          />
        </div>
      </div>
      {renderClasses()}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      resources: await getAllResources(),
    },
  };
};

export default Resources;
