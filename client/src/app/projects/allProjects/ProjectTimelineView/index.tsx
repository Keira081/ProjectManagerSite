import React from "react";
import TimeLine from "@/components/TimeLine";
import { useGetProjectsQuery } from "@/states/api";
import { useAppSelector } from "@/states/store";
import { Plus } from "lucide-react";

type Props = {};

const ProjectTimelineView = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: projects, error, isLoading } = useGetProjectsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching projects</div>;
  if (!projects) return <div>No Projects :c</div>;

  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <TimeLine
          dataType="project"
          dataSet={(projects ?? []).map((task) => ({
            ...task,
            startDate: task.startDate || task.creationDate,
            dueDate: task.dueDate || task.creationDate, // default if missing
          }))}
          header="Projects Timeline"
        />
      </div>
    </div>
  );
};

export default ProjectTimelineView;
