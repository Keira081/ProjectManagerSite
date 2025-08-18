import { Project, useGetTasksQuery } from "@/states/api";
import React from "react";
import {
  CalendarDays,
  ClipboardList,
  Info,
  Folder,
  ClipboardX,
} from "lucide-react";
import { format } from "date-fns";
import { highlightText } from "@/app/searchPage/page";
import Link from "next/link";

type Props = {
  project: Project;
  searchTerm?: string;
};

const ProjectCard = ({ project, searchTerm }: Props) => {
  const { data: tasks } = useGetTasksQuery({ projectId: project.id });

  return (
    <Link href={`/projects/${project.id}`}>
      <div className="mb-3 rounded-lg bg-white dark:bg-purple-700 border border-purple-200 dark:border-purple-500 shadow-md p-5 transition hover:shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Folder
              className="text-purple-500 dark:text-purple-300"
              size={20}
            />
            <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-200">
              {highlightText(project.name, searchTerm)}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex items-start gap-2">
          <Info className="text-purple-400 mt-0.5" size={16} />
          {project.description ? (
            highlightText(project.description, searchTerm)
          ) : (
            <em>No description provided</em>
          )}{" "}
        </p>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-300 mb-4">
          <div className="flex items-center gap-1">
            <CalendarDays
              size={16}
              className="text-purple-500 dark:text-purple-300"
            />
            <strong>Start:</strong>{" "}
            {project.startDate
              ? format(new Date(project.startDate), "P")
              : "Not set"}
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays
              size={16}
              className="text-purple-500 dark:text-purple-300"
            />
            <strong>Due:</strong>{" "}
            {project.dueDate
              ? format(new Date(project.dueDate), "P")
              : "Not set"}
          </div>
        </div>

        {/* Tasks Count */}
        {tasks && tasks.length > 0 ? (
          <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-300">
            <ClipboardList size={16} />
            {tasks.length} {tasks.length === 1 ? "Task" : "Tasks"}
          </div>
        ) : (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <ClipboardX size={16} />
            No tasks linked to this project
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProjectCard;
