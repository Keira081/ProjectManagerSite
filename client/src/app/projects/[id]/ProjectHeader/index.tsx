import { Status, useGetProjectByIdQuery } from "@/states/api";
import { format } from "date-fns";
import { CalendarDays, List, Pencil, PencilLine, Table2 } from "lucide-react";
import React from "react";
import { statusColors } from "@/styles/TagColors";
import Header from "../../Header";

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
  const { data: project } = useGetProjectByIdQuery({ id: projectId });

  const formattedCreationDate = project?.creationDate
    ? format(new Date(project.creationDate), "P")
    : "";

  return (
    <Header
      header={
        <ProjectStatus
          name={project?.name || "Loading..."}
          status={project?.status || "Loading..."}
        />
      }
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      tabOptions={tabOptions}
      otherComponent={
        <>
          <PencilLine className="h-4 w-4 flex-shrink-0 text-purple-300 dark:text-neutral-400" />
          <div className="flex text-xs font-thin text-purple-300 dark:text-neutral-400 ">
            <span>Created: {formattedCreationDate}</span>
          </div>
        </>
      }
    />
  );
};

type ProjectStatusProps = {
  name: string;
  status: Status | string;
};

const ProjectStatus = ({ name, status }: ProjectStatusProps) => {
  const statusColorClass = statusColors[status as Status];

  return (
    <h1 className="text-4xl font-medium text-purple-400 dark:text-white text-nowrap mr-4">
      <span>{name} </span>
      <span
        className="text-sm font-semibold"
        style={{ color: statusColorClass, filter: "drop-shadow(0 0 8px)" }}
      >
        {status}
      </span>
    </h1>
  );
};

export default ProjectHeader;
