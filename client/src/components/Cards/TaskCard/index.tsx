import { Task, User, useGetUsersQuery } from "@/states/api";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import { Tag } from "lucide-react";
import { useGetProjectByIdQuery } from "@/states/api";
import { highlightText } from "@/app/searchPage/page";
import Link from "next/link";

type Props = {
  task: Task;
  searchTerm?: string;
};

const priorityColors: Record<string, string> = {
  High: "bg-red-100 text-red-700 dark:bg-red-500 dark:text-white",
  Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500 dark:text-white",
  Low: "bg-green-100 text-green-700 dark:bg-green-500 dark:text-white",
};

const TaskCard = ({ task, searchTerm }: Props) => {
  const { data: project } = useGetProjectByIdQuery({ id: task.projectId });
  const { data: users } = useGetUsersQuery();

  // Find author and assignee from the users list
  const author: User | undefined = users?.find(
    (u) => u.userId === task.authorUserId
  );
  const assignee: User | undefined = users?.find(
    (u) => u.userId === task.assignedUserId
  );

  return (
    <Link href={`/tasks/${task.id}`}>
      <div className="mb-3 rounded-lg bg-white p-5 shadow-md border border-purple-200 dark:bg-purple-700 dark:border-purple-500 dark:text-white transition hover:shadow-lg">
        {/* Project Name */}
        {project?.name && (
          <div className="mb-2 inline-block bg-purple-100 text-purple-700 dark:bg-purple-600 dark:text-white px-3 py-1 rounded-full text-xs font-medium">
            Project: {highlightText(project.name, searchTerm)}
          </div>
        )}

        {/* Title & Priority */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-200">
            {highlightText(task.name, searchTerm)}
          </h3>
          {task.priority && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                priorityColors[task.priority] ||
                "bg-gray-200 text-gray-700 dark:bg-gray-500 dark:text-white"
              }`}
            >
              {task.priority}
            </span>
          )}
        </div>

        {/* Attachments */}
        {task.attachments && task.attachments.length > 0 && (
          <div className="mb-4">
            <div className="flex gap-2 flex-wrap">
              {task.attachments.map((file, idx) => (
                <Image
                  key={idx}
                  src={`/${file.fileURL}`}
                  alt={file.fileName}
                  width={120}
                  height={80}
                  className="rounded-md object-cover border border-purple-300 dark:border-purple-500"
                />
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <p className="text-sm mb-3 text-gray-700 dark:text-gray-300">
          {task.description ? (
            highlightText(task.description, searchTerm)
          ) : (
            <em>No description provided</em>
          )}
        </p>

        {/* Status */}
        <div className="mb-3">
          <span className="text-xs font-semibold mr-2 text-purple-600 dark:text-purple-300">
            Status:
          </span>
          <span className="text-sm capitalize">{task.status || "Unknown"}</span>
        </div>

        {/* Tags */}
        <div className="flex items-center flex-wrap gap-2 mb-3">
          <Tag size={14} className="text-purple-500 dark:text-purple-300" />
          {task.tags && task.tags.trim() !== "" ? (
            task.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag.length > 0)
              .map((tag) => (
                <span
                  key={tag}
                  className="bg-purple-100 text-purple-700 dark:bg-purple-500 dark:text-white px-2 py-0.5 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))
          ) : (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              No tags
            </span>
          )}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 gap-4 mb-3 text-sm text-gray-600 dark:text-gray-300">
          <div>
            <strong>Start: </strong>
            {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
          </div>
          <div>
            <strong>Due: </strong>
            {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
          </div>
        </div>

        {/* People */}
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>
            <strong>Author: </strong>
            {author ? highlightText(author.username, searchTerm) : "Unknown"}
          </span>
          <span>
            <strong>Assignee: </strong>
            {assignee
              ? highlightText(assignee.username, searchTerm)
              : "Unknown"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
