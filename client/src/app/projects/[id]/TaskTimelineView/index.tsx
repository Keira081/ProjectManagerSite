import React from "react";
import TimeLine from "@/components/TimeLine";
import { useGetTasksQuery } from "@/states/api";
import { useAppSelector } from "@/states/store";
import { Plus } from "lucide-react";

type Props = {
  projectId: number;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const TaskTimelineView = ({ projectId, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: projectId });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching tasks</div>;
  if (!tasks) return <div>No Tasks :c</div>;

  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5 dark:text-white w-full">
        <TimeLine
          dataType="task"
          dataSet={(tasks ?? []).map((task) => ({
            ...task,
            startDate: task.startDate || task.creationDate,
            dueDate: task.dueDate || task.creationDate, // default if missing
          }))}
          header="Project Tasks Timeline"
        />

        <div className="flex w-full items-center px-4 pb-5 pt-1">
          <button
            className="flex items-center rounded bg-purple-100 dark:bg-purple-200 px-1 py-1 mr-2 cursor-pointer  dark:text-white hover:bg-purple-200 dark:hover:bg-purple-400"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            <Plus size={16} />
          </button>
          Add New Task
        </div>
      </div>
    </div>
  );
};

export default TaskTimelineView;
