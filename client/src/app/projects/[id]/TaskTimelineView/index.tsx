import TimeLine from "@/components/TimeLine";
import { useGetTasksQuery } from "@/states/api";
import { useAppSelector } from "@/states/store";
import { DisplayOption, Gantt, ViewMode } from "@rsagiev/gantt-task-react-19";
import "@rsagiev/gantt-task-react-19/dist/index.css";
import { Plus } from "lucide-react";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  projectId: number;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

type TaskTypeItems = "task" | "milestone" | "project";

const viewOptions = [
  { label: "Day", value: ViewMode.Day },
  { label: "Week", value: ViewMode.Week },
  { label: "Month", value: ViewMode.Month },
];

const TaskTimelineView = ({ projectId, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: projectId });

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const ganttTasks = useMemo(() => {
    if (!tasks) return [];

    return tasks
      .map((task) => {
        if (!task.startDate || !task.dueDate) {
          console.warn("Skipping task: Missing start or due date", task);
          return null;
        }

        const start = new Date(task.startDate);
        const end = new Date(task.dueDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          console.error("Skipping task: Invalid date format", {
            task,
            startRaw: task.startDate,
            endRaw: task.dueDate,
            startParsed: start,
            endParsed: end,
          });
          return null;
        }

        if (end < start) {
          console.warn("Skipping task: end date is before start date", task);
          return null;
        }

        return {
          start,
          end,
          name: task.name ?? "Untitled Task",
          id: `Task-${task.id}`,
          type: "task" as TaskTypeItems,
          progress: task.points ? (task.points / 10) * 100 : 0,
          isDisabled: false,
        };
      })
      .filter((t): t is NonNullable<typeof t> => t !== null);
  }, [tasks]);

  const handleViewModeChange = (value: ViewMode) => {
    setDisplayOptions((prev) => ({ ...prev, viewMode: value }));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching tasks</div>;
  if (!tasks) return <div>No Tasks :c</div>;

  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <TimeLine
          projectId={projectId}
          dataType="task"
          dataSet={(tasks ?? []).map((task) => ({
            ...task,
            startDate: task.startDate || task.creationDate,
            dueDate: task.dueDate || task.creationDate, // default if missing
          }))}
          error={error}
          isLoading={isLoading}
          header="Project Tasks Timeline"
        />

        <div className="flex items-center px-4 pb-5 pt-1 shadow-2xl">
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
