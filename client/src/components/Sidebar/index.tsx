"use client";
import {
  ChevronDown,
  ChevronUp,
  LucideIcon,
  PencilLine,
  ChevronLeft,
  ChevronRight,
  Search,
  FolderPlus,
  Settings,
  Layers,
  Users,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  setIsShowProjects,
  setIsShowTeams,
  setIsSidebarCollapsed,
} from "@/states/slices";
import { useAppDispatch, useAppSelector } from "@/states/store";
import { useGetProjectsQuery, useGetTeamsQuery } from "@/states/api";
import NewProjectModal from "../Modals/NewProjectModal";
import Dropdown from "../DropdownMenu";

interface SidebarProps {
  setRedirectId: (id: number) => void;
}

const Sidebar = ({ setRedirectId }: SidebarProps) => {
  const { data: projects } = useGetProjectsQuery();
  const { data: teams } = useGetTeamsQuery();
  const dispatch = useAppDispatch();
  const isShowProjects = useAppSelector((state) => state.global.isShowProjects);
  const isShowTeams = useAppSelector((state) => state.global.isShowTeams);
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);
  const [sidebarSearchTerm, setSidebarSearchTerm] = useState("");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Click outside to collapse
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

  const handleSidebarSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/searchPage?query=${encodeURIComponent(sidebarSearchTerm)}`);
      dispatch(setIsSidebarCollapsed(true));
    }
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 z-60 h-full pb-6 transition-all duration-500 ease-in-out
        ${isSidebarCollapsed ? "w-0" : "w-60"} 
        bg-gray-50 dark:bg-purple-400 shadow-xl dark:shadow-black
        flex flex-col`}
    >
      {/* COLLAPSE BUTTON */}
      <button
        onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
        className="absolute top-1/2 left-full -translate-y-1/2 -translate-x-[1px] w-4 h-9 flex items-center justify-center z-20 rounded-r-lg
        bg-gray-50 dark:bg-purple-400 shadow-[2px_0_3px_rgba(0,0,0,0.1)]
        hover:bg-gray-100 dark:hover:bg-purple-200 cursor-pointer"
      >
        {isSidebarCollapsed ? (
          <ChevronRight className="h-5 w-5 text-purple-700 dark:text-white" />
        ) : (
          <ChevronLeft className="h-5 w-5 text-purple-700 dark:text-white" />
        )}
      </button>

      {/* CONTENT */}
      <div
        className={`pb-6 transition-opacity duration-500 ease-in-out overflow-y-auto flex flex-col flex-1
        ${isSidebarCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        {/* LOGO */}
        <div className=" flex items-center justify-start border-b border-purple-700 px-4 py-2">
          <h1 className="text-2xl font-semibold italic text-purple-700 dark:text-white">
            KSTACK
          </h1>
        </div>

        {/* SEARCH */}
        <div className="flex items-center m-4 px-2 py-1 border border-purple-700 bg-white dark:bg-purple-200">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none flex-1 text-gray-800 dark:text-white"
            value={sidebarSearchTerm}
            onChange={(e) => setSidebarSearchTerm(e.target.value)}
            onKeyDown={handleSidebarSearch}
          />
          <Search className=" text-gray-600 dark:text-gray-200" size={20} />
        </div>

        {/* MAIN */}
        <SidebarHeader title="MAIN" />
        <div className="mx-5 mb-2 flex flex-col gap-1">
          <NavLink title="User Settings" href="/settings" icon={Settings} />
          <NavLink
            title="Projects"
            href="/projects/allProjects"
            icon={Layers}
          />
        </div>

        {/* PROJECTS */}
        <SidebarHeader title="PROJECTS" />
        <div className="mx-5 flex flex-col gap-2">
          <ModalButton
            title="Create Project"
            href="/createProj"
            icon={FolderPlus}
            onClickCall={() => setIsModalNewProjectOpen(true)}
          />
          <NewProjectModal
            isOpen={isModalNewProjectOpen}
            onClose={() => setIsModalNewProjectOpen(false)}
            onProjectCreated={(id) => {
              setRedirectId(id);
              setIsModalNewProjectOpen(false);
            }}
          />
        </div>

        {/* EXPANDABLE PROJECTS LIST */}
        <div className="mx-5 mt-2 flex flex-col gap-1">
          <DropdownSection
            dispatch={dispatch}
            setIsCollapsed={setIsShowProjects}
            isCollapsed={isShowProjects}
            title="All Projects"
            mapping={projects?.map((project) => (
              <NavLink
                key={project.id}
                title={project.name}
                icon={PencilLine}
                href={`/projects/${project.id}`}
              />
            ))}
          />
        </div>

        {/* COMING SOON */}
        {/* TEAMS */}
        {/* <SidebarHeader title="TEAMS" />
        <div className="mx-5 flex flex-col gap-1">
          <NavLink title="Build Your Team" href="/buildTeam" icon={Users} />

          {/* EXPANDABLE TEAMS LIST }
          <DropdownSection
            dispatch={dispatch}
            setIsCollapsed={setIsShowTeams}
            isCollapsed={isShowTeams}
            title="All Teams"
            mapping={teams?.map((team) => (
              <NavLink
                key={team.teamId}
                title={team.teamName}
                icon={PencilLine}
                href={`/teams/${team.teamId}`}
              />
            ))}
          />
        </div> */}
      </div>
    </div>
  );
};

// -----------------------------------------------

// SidebarHeader
interface SidebarHeaderProps {
  title: string;
  extraStyles?: string;
}
const SidebarHeader = ({ title, extraStyles }: SidebarHeaderProps) => (
  <div
    className={`ml-1 mb-1 text-lg font-bold text-purple-600 dark:text-white tracking-wide ${extraStyles}`}
  >
    {title}
  </div>
);

// NavLink
interface NavLinkProps {
  title: string;
  href: string;
  icon?: LucideIcon;
}
const NavLink = ({ title, href, icon: Icon }: NavLinkProps) => {
  const currentPath = usePathname();
  const isSelected = href === currentPath;

  return (
    <Link href={href}>
      <div
        className={`pl-4 flex items-center gap-2 p-1 rounded
          ${
            isSelected
              ? "bg-purple-100 dark:bg-purple-250 font-semibold"
              : "hover:bg-gray-200 dark:hover:bg-purple-300"
          } transition-colors`}
      >
        {Icon && (
          <Icon className="h-4 w-4 mr-1 text-gray-700 dark:text-gray-100" />
        )}
        <span className="text-gray-800 dark:text-white">{title}</span>
      </div>
    </Link>
  );
};

// ModalButton
interface ModalButtonProps {
  title: string;
  href: string;
  icon?: LucideIcon;
  onClickCall: () => void;
}
const ModalButton = ({ title, onClickCall, icon: Icon }: ModalButtonProps) => (
  <button
    onClick={onClickCall}
    className="pl-4 flex items-center cursor-pointer gap-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-purple-300 transition-colors font-semibold text-gray-800 dark:text-white text-left"
  >
    {Icon && <Icon className="h-4 w-4 text-gray-700 dark:text-gray-100" />}
    <span>{title}</span>
  </button>
);

//DropdownSection
interface DropdownSectionProps {
  dispatch: (func: any) => void;
  setIsCollapsed: (IsCollapsed: boolean) => void;
  isCollapsed: boolean;
  title: string;
  mapping: any;
}

const DropdownSection = ({
  dispatch,
  setIsCollapsed,
  isCollapsed,
  title,
  mapping,
}: DropdownSectionProps) => (
  <>
    <button
      onClick={() => dispatch(setIsCollapsed(!isCollapsed))}
      className="flex justify-between items-center p-2 cursor-pointer text-purple-600 dark:text-purple-100 font-semibold rounded
              transition-colors"
    >
      <span>{title}</span>
      {isCollapsed ? (
        <ChevronUp className="h-4 w-4 cursor-pointer rounded-md hover:bg-gray-200 dark:hover:bg-purple-300 " />
      ) : (
        <ChevronDown className="h-4 w-4 cursor-pointer rounded-md hover:bg-gray-200 dark:hover:bg-purple-300 " />
      )}
    </button>

    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out
              ${isCollapsed ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
    >
      <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
        {mapping}
      </div>
    </div>
  </>
);

export default Sidebar;
