"use client";
import {
  ChevronDown,
  ChevronUp,
  LucideIcon,
  PencilLine,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { setIsShowProjects, setIsSidebarCollapsed } from "@/states/slices";
import { useAppDispatch, useAppSelector } from "@/states/store";
import { useGetProjectsQuery } from "@/states/api";
import NewProjectModal from "../NewProjectModal";

const Sidebar = () => {
  const { data: projects } = useGetProjectsQuery();
  const query = useGetProjectsQuery();
  console.log(query);

  const dispatch = useAppDispatch();
  const isShowProjects = useAppSelector((state) => state.global.isShowProjects);

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);

  // ⬅ NEW: ref for sidebar
  const sidebarRef = useRef<HTMLDivElement>(null);

  // ⬅ NEW: close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !isSidebarCollapsed
      ) {
        dispatch(setIsSidebarCollapsed(true));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarCollapsed, dispatch]);

  return (
    <div
      ref={sidebarRef} // ⬅ added ref
      className={`fixed top-0 left-0 z-10 transition-all duration-500 ease-in-out h-full 
    ${isSidebarCollapsed ? "w-0  top-0" : "w-60 "}
    bg-gray-50 shadow-xl dark:bg-purple-400 dark:shadow-black`}
    >
      {/* COLLAPSE BUTTON CENTERED VERTICALLY */}
      <button
        onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
        className="shadow-[2px_0_3px_rgba(0,0,0,0.1)] absolute top-1/2 -translate-y-1/2 left-full -translate-x-[1px] w-4 h-9 flex items-center justify-center z-20 rounded-r-lg bg-gray-50 dark:bg-purple-400 hover:bg-gray-100 dark:hover:bg-purple-200"
      >
        {isSidebarCollapsed ? (
          <ChevronRight className="h-5 w-5 text-purple-700 dark:text-white" />
        ) : (
          <ChevronLeft className="h-5 w-5 text-purple-700 dark:text-white" />
        )}
      </button>

      {/* CONTENT WRAPPER */}
      <div
        className={`
    transition-all duration-500 ease-in-out overflow-y-auto
    ${isSidebarCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"}
    flex flex-col
  `}
      >
        {/* LOGO */}

        <div className="h-10 flex items-center justify-between border-b border-purple-700 px-2">
          <h1 className="text- italic text-purple-700 dark:text-white">
            KSTACK
          </h1>
        </div>

        {/* SEARCH BAR */}
        <div className="flex justify-center items-center text-purple-700 m-4 border border-purple-700 bg-white dark:bg-purple-100">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none"
          />
          <Search className="w-[15px] h-[15px]" />
        </div>
        {/* NAVBAR LINKS */}
        <SidebarHeader title="PROJECTS" />
        {/* CREATE PROJECT */}
        <div className="mb-2 cursor-pointer">
          <ModalButton
            title="+ Create Projects"
            href="/createProj"
            onClickCall={() => setIsModalNewProjectOpen(true)}
          />

          <NewProjectModal
            isOpen={isModalNewProjectOpen}
            onClose={() => setIsModalNewProjectOpen(false)}
          />
          <NavLink title="All Projects" href="/projects/allProjects" />
        </div>
        {/* ALL PROJECTS */}
        <button
          onClick={() => dispatch(setIsShowProjects(!isShowProjects))}
          className={`flex justify-between items-center cursor-pointer px-6 ${isShowProjects ? "" : "mb-1"} text-purple-300 hover:bg-gray-100 dark:text-purple-100 hover:dark:bg-purple-300`}
        >
          <h2 className="text-xl tracking-widest font-bold">All Projects</h2>
          {isShowProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isShowProjects
              ? "max-h-96 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2"
          }`}
        >
          {/* GROUPS */}
          <div className="mb-2 cursor-pointer">
            <ModalButton
              title="+ Create a Group"
              href="/createGroup"
              onClickCall={() => setIsModalNewProjectOpen(true)}
            />
          </div>
          {/* MAPPING PROJECTS */}
          {projects?.map((project) => (
            <NavLink
              key={project.id}
              title={project.name}
              icon={PencilLine}
              href={`/projects/${project.id}`}
            />
          ))}
        </div>
        {/* TASKS */}
        {/* <SidebarHeader title="TASKS" />
        <div className="mb-2">
          <NavLink title="All Tasks" href="/allTasks" />
        </div> */}
        {/* TEAMS */}
        <SidebarHeader title="TEAMS" />
        <div className="mb-2">
          <NavLink title="Build Your Team" href="/buildTeam" />
        </div>
      </div>
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
  icon?: LucideIcon;
  textClassName?: string;
}

const NavLink = ({
  title,
  href,
  icon: Icon,
  textClassName = "font-light",
}: NavLinkProps) => {
  const currentPath = usePathname();
  const isSelected = href === currentPath;

  return (
    <Link href={href}>
      <div
        className={`ml-8 flex items-center gap-3 p-[2px] ${
          isSelected
            ? "inset-shadow-sm/20 bg-gray-200 dark:bg-purple-250"
            : "hover:bg-gray-100 hover:dark:bg-purple-300"
        }`}
      >
        {Icon && <Icon className="h-4 w-4 text-gray-800 dark:text-gray-100" />}
        <p className={`${textClassName} text-black dark:text-white`}>{title}</p>
      </div>
    </Link>
  );
};

interface ModalButtonProps {
  title: string;
  href: string;
  icon?: LucideIcon;
  onClickCall: () => void;
}

const ModalButton = ({
  title,
  href,
  icon: Icon,
  onClickCall,
}: ModalButtonProps) => {
  const currentPath = usePathname();
  const isSelected = href === currentPath;

  return (
    <div className="ml-8 flex items-center gap-3 p-[2px] hover:bg-gray-100 hover:dark:bg-purple-300">
      <button onClick={onClickCall}>
        {Icon && <Icon className="h-4 w-4 text-gray-800 dark:text-gray-100" />}
        <p className="font-semibold text-black dark:text-white">{title}</p>
      </button>
    </div>
  );
};

export default Sidebar;
