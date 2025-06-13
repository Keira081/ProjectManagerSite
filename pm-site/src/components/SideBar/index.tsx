"use client";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const [showGroups, setShowGroups] = useState(true);

  return (
    <div
      className={`fixed top-0 flex flex-col h-full w-60 shadow-xl/60 shadow-purple-700 overflow-y-auto bg-gray-50 dark:bg-purple-400 dark:shadow-black`}
    >
      <div className="h-10 flex items-center justify-between border-b border-purple-700">
        {/* LOGO */}
        <h1 className="p-2 text- italic text-purple-700 dark:text-white dark:border-white">
          KSTACK
        </h1>
        {/* COLLAPSE BUTTON */}
        <button className="pr-3 cursor-pointer">
          <X className="h-4 w-4 text-purple-700 dark:text-white" />
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="flex justify-center items-center text-purple-700 m-4 border border-purple-700 bg-white dark:bg-purple-100">
        <input type="text" placeholder="Search..." />
        <Search className="w-[15px] h-[15px]" />
      </div>

      {/* NAVBAR LINKS */}
      <div className="flex flex-col">
        {/* PROJECTS */}
        <SidebarHeader title="PROJECTS" />
        <div className="mb-2">
          <NavLink title="Create Projects" href="/createProj" />
          <NavLink title="All Projects" href="/allProjs" />
        </div>

        {/* GROUPS */}
        <button
          onClick={() => setShowGroups(!showGroups)}
          className={`flex justify-between items-center cursor-pointer px-6 ${showGroups ? "" : "mb-1"} text-purple-300 hover:bg-gray-100 dark:text-purple-100 hover:dark:bg-purple-300`}
        >
          <h2 className=" text-xl text-medium tracking-widest font-bold">
            Groups
          </h2>
          {showGroups ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>

        <div className={`mb-2 ${showGroups ? "" : "hidden"}`}>
          <NavLink title="Create a Group" href="/createGroup" />
          {/* if empty <p>No groups created yet...</p> */}
        </div>

        {/* TASKS */}
        <SidebarHeader title="TASKS" />
        <div className="mb-2">
          <NavLink title="All Tasks" href="/allTasks" />
        </div>

        {/* TEAMS */}
        <SidebarHeader title="TEAMS" />
        <div className="mb-2">
          <NavLink title="Build Your Team" href="/buildTeam" />
          {/* if empty <p>No teams created yet...</p> */}
        </div>
      </div>

      {/* LOGO */}
    </div>
  );
};

interface SidebarHeaderProps {
  title: string;
  extraStyles?: string;
}

const SidebarHeader = ({ title, extraStyles }: SidebarHeaderProps) => {
  return (
    <div
      className={`ml-4 mb-1 text-xl text-medium tracking-widest font-bold text-purple-500 dark:text-white ${extraStyles}`}
    >
      {title}
    </div>
  );
};

interface NavLinkProps {
  title: string;
  href: string;
}

const NavLink = ({ title, href }: NavLinkProps) => {
  const currentPath = usePathname();
  const isSelected = href === currentPath;
  return (
    <Link href={href}>
      <div
        className={`p-[2px] ${isSelected ? "inset-shadow-sm/20 bg-gray-200 dark:bg-purple-250" : "hover:bg-gray-100 hover:dark:bg-purple-300"}`}
      >
        <p className="ml-[45px] font-light text-black dark:text-white">
          {title}
        </p>
      </div>
    </Link>
  );
};
export default Sidebar;
