import { useGetProjectByIdQuery, useGetProjectsQuery } from "@/states/api";
import {
  CalendarDays,
  EllipsisVertical,
  List,
  Pencil,
  PencilLine,
  Table2,
} from "lucide-react";
import React from "react";
import { useState } from "react";
type Props = {
  projectId: number;
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const tabOptions = [
  { name: "Description", icon: <Pencil className="h-5 w-5" /> },
  { name: "Board", icon: <Table2 className="h-5 w-5" /> },
  { name: "Calendar", icon: <CalendarDays className="h-5 w-5" /> },
  { name: "List", icon: <List className="h-5 w-5" /> },
];

const ProjectHeader = ({ projectId, activeTab, setActiveTab }: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);
  const { data: project } = useGetProjectByIdQuery({ id: projectId });

  const renderTabButton = (tab: (typeof tabOptions)[0], isDropdown = false) => (
    <button
      key={tab.name}
      onClick={() => {
        setActiveTab(tab.name);
        if (isDropdown) setDropdownOpen(false);
      }}
      className={`flex items-center gap-2 px-1 py-2 ${
        activeTab === tab.name
          ? "text-blue-600 after:bg-blue-600 dark:text-white"
          : "text-gray-500 hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white"
      } ${isDropdown ? "w-full" : ""}`}
    >
      {tab.icon}
      {tab.name}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center px-8 justify-between border-b border-gray-200 dark:border-stroke-dark py-2 gap-4">
      {/* PROJECT */}
      <div className="flex-shrink-0">
        <ProjectDetails
          name={project?.name || "Loading..."}
          status={project?.status || "Loading..."}
          // buttonComponent={
          //   <button
          //     className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
          //     onClick={() => setIsModalNewProjectOpen(true)}
          //   >
          //     <PlusSquare className="mr-2 h-5 w-5" /> New Boards
          //   </button>
          // }
        />
      </div>

      {/* TABS */}
      <div className="hidden md:flex flex-1 justify-end items-center gap-2 md:gap-4 flex-wrap">
        {tabOptions.map((tab) => renderTabButton(tab))}
      </div>

      {/* VIEW DROPDOWN FOR SMALLER SCREENS */}
      <div className="relative md:hidden flex-1 flex justify-end flex-shrink-0">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-1 px-1 py-1 text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition-colors duration-200"
        >
          Views
          <EllipsisVertical className="w-5 h-5" />
        </button>

        <div
          className={` translate-x-15 overflow-hidden transition-all duration-300 ease-in-out origin-top-right absolute top-full right-0 mt-1 w-40 rounded-md shadow-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 z-10
    ${dropdownOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"}
  `}
        >
          <ul>
            {tabOptions.map((tab) => (
              <li key={tab.name}>{renderTabButton(tab, true)}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* <div className="flex flex-1 justify-end items-center gap-2 md:gap-4 flex-wrap">
        <TabButton
          name="Description"
          icon={<Pencil className="h-5 w-5" />}
          //setActiveTab={setActiveTab}
          //activeTab={activeTab}
        />
        <TabButton
          name="Board"
          icon={<Table2 className="h-5 w-5" />}
          //setActiveTab={setActiveTab}
          //activeTab={activeTab}
        />
        <TabButton
          name="Calendar"
          icon={<CalendarDays className="h-5 w-5" />}
          //setActiveTab={setActiveTab}
          //activeTab={activeTab}
        />
        <TabButton
          name="List"
          icon={<List className="h-5 w-5" />}
          //setActiveTab={setActiveTab}
          //activeTab={activeTab}
        />
      </div> */}
      {/* Creation Date */}
      <div className="flex items-center space-x-1 whitespace-nowrap text-xs font-thin text-gray-500 dark:text-neutral-400 flex-shrink-0">
        <PencilLine className="h-4 w-4" />
        <p>Created: {project?.creationDate}</p>
      </div>
    </div>
  );
};

type ProjectDetailProps = {
  name: string;
  status: string;
};

const statusColors: Record<string, string> = {
  "To Do": "text-orange-400",
  Postponed: "text-yellow-500",
  "In Progress": "text-blue-600",
  Completed: "text-green-800",
};

const ProjectDetails = ({ name, status }: ProjectDetailProps) => {
  const statusColorClass = statusColors[status] || "text-gray-400";

  return (
    <div className="flex items-baseline gap-4">
      {/* NAME */}
      <h1 className="text-4xl tracking-wide font-semibold whitespace-nowrap">
        {name}
      </h1>
      {/* STAUS */}
      <p
        className={`${statusColorClass} text-sm font-semibold
          drop-shadow-[0_0_5px] drop-shadow-[0_0_10px] drop-shadow-${statusColorClass.replace(
            "text-",
            ""
          )}`}
      >
        {status}
      </p>
    </div>
  );
};

export default ProjectHeader;
