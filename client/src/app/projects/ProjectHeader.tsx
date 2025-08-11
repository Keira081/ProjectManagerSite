import { useGetProjectByIdQuery } from "@/states/api";
import { format } from "date-fns";
import {
  CalendarDays,
  EllipsisVertical,
  List,
  Pencil,
  PencilLine,
  Table2,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import colors from "tailwindcss/colors";

type Props = {
  projectId: number;
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const tabOptions = [
  { name: "Description", icon: <Pencil className="h-5 w-5" /> },
  { name: "Board", icon: <Table2 className="h-5 w-5" /> },
  { name: "Timeline", icon: <CalendarDays className="h-5 w-5" /> },
  { name: "Table", icon: <List className="h-5 w-5" /> },
];

const ProjectHeader = ({ projectId, activeTab, setActiveTab }: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: project } = useGetProjectByIdQuery({ id: projectId });
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);

  const formattedCreationDate = project?.creationDate
    ? format(new Date(project.creationDate), "P")
    : "";

  const renderTabButton = (tab: (typeof tabOptions)[0], isDropdown = false) => (
    <button
      key={tab.name}
      onClick={() => {
        setActiveTab(tab.name);
        if (isDropdown) setDropdownOpen(false);
      }}
      className={`flex items-center gap-2 px-1 py-1 ${
        activeTab === tab.name
          ? "text-purple-700 dark:text-white"
          : "text-gray-500 hover:text-purple-600 dark:text-neutral-400 dark:hover:text-white"
      } ${isDropdown ? "w-full" : ""}`}
    >
      {tab.icon}
      {tab.name}
    </button>
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-end px-5 justify-between border-b border-purple-100 dark:border-purple-250 pb-2 gap-3">
      {/* MODAL */}
      {/* <ModalNewProject
        isOpen={isModalNewProjectOpen}
        onClose={() => setIsModalNewProjectOpen(false)}
      /> */}

      {/* PROJECT */}
      <ProjectDetails
        name={project?.name || "Loading..."}
        status={project?.status || "Loading..."}
      />

      {/* TABS */}
      <div className="hidden min-[862px]:flex flex-1 justify-end items-end gap-2">
        {tabOptions.map((tab) => renderTabButton(tab))}
      </div>

      {/* DROPDOWN FOR SMALLER SCREENS */}
      <div
        className="relative min-[862px]:hidden flex-1 flex justify-end flex-shrink-0"
        ref={dropdownRef}
      >
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center text-purple-500 dark:text-white cursor-pointer hover:text-purple-250 dark:hover:text-purple-100 transition-colors duration-200"
        >
          Views
          <EllipsisVertical className="pl-2 translate-y-0.5" />
        </button>

        <div
          className={`translate-x-15 overflow-hidden transition-all duration-300 ease-in-out 
            origin-top-right absolute top-full mt-1 w-40 shadow-lg
            bg-white dark:bg-purple-700 border border-gray-300 dark:border-gray-600 z-10
            ${
              dropdownOpen
                ? "max-h-96 opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
            }`}
        >
          <ul>
            {tabOptions.map((tab) => (
              <li key={tab.name}>{renderTabButton(tab, true)}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Creation Date */}
      <div className="flex items-center gap-1 text-xs font-thin text-purple-300 dark:text-neutral-400">
        <PencilLine className="h-4 w-4" />
        <p>Created: {formattedCreationDate}</p>
      </div>
    </div>
  );
};

type ProjectDetailProps = {
  name: string;
  status: string;
};

const statusColors: Record<string, string> = {
  "To Do": colors.orange[300],
  Postponed: colors.yellow[300],
  "In Progress": colors.blue[400],
  Completed: colors.green[600],
  "In Review": colors.fuchsia[400],
  Backlog: colors.gray[500],
};

const ProjectDetails = ({ name, status }: ProjectDetailProps) => {
  const statusColorClass = statusColors[status] || "gray-200";

  return (
    <div className="flex items-baseline gap-4">
      <h1 className="text-4xl tracking-[.10em] font-medium text-purple-400 dark:text-white">
        {name}
      </h1>
      <p
        className="text-sm font-semibold"
        style={{ color: statusColorClass, filter: "drop-shadow(0 0 8px)" }}
      >
        {status}
      </p>
    </div>
  );
};

export default ProjectHeader;
