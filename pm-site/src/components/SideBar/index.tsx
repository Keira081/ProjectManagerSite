"use client";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { setIsShowGroups, setIsSidebarCollapsed } from "@/states/slices";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isShowGroups = useAppSelector((state) => state.global.isShowGroups);

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  return (
    <div
      className={`z-1 fixed bottom-0 flex flex-col w-60 transition-all duration-500 ease-in-out
        ${
          isSidebarCollapsed
            ? "h-[40px] bg-gray-100 dark:bg-purple-400"
            : "h-full overflow-y-auto shadow-xl/60 shadow-purple-700 bg-gray-50 dark:bg-purple-400 dark:shadow-black"
        }`}
    >
      <div className="h-10 flex items-center justify-between border-b border-purple-700">
        {/* LOGO */}
        <h1 className="p-2 text- italic text-purple-700 dark:text-white dark:border-white">
          KSTACK
        </h1>
        {/* COLLAPSE BUTTON */}
        <button
          onClick={() => {
            dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
          }}
          className="pr-3 cursor-pointer"
        >
          {isSidebarCollapsed ? (
            <ChevronUp className="h-4 w-4 text-purple-700 dark:text-white" />
          ) : (
            <ChevronDown className="h-4 w-4 text-purple-700 dark:text-white" />
          )}
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
          onClick={() => dispatch(setIsShowGroups(!isShowGroups))}
          className={`flex justify-between items-center cursor-pointer px-6 ${isShowGroups ? "" : "mb-1"} text-purple-300 hover:bg-gray-100 dark:text-purple-100 hover:dark:bg-purple-300`}
        >
          <h2 className=" text-xl text-medium tracking-widest font-bold">
            Groups
          </h2>
          {isShowGroups ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>

        <div className={`mb-2 ${isShowGroups ? "" : "hidden"}`}>
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
