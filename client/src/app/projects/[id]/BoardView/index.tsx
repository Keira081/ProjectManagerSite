"use client";

import {
  Priority,
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
} from "@/states/api";
import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task as TaskType, Status } from "@/states/api";
import {
  ChevronDown,
  ChevronUp,
  EllipsisVertical,
  MessageSquareMore,
  Plus,
} from "lucide-react";
import { statusColors, priorityBubbles } from "@/styles/TagColors";
import { format } from "date-fns";
import Image from "next/image";
type BoardProps = {
  projectId: number;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
  setImportedStatus: (importedStatus: Status) => void;
};

const taskStatus: Status[] = Object.values(Status);

const Board = ({
  projectId,
  setIsModalNewTaskOpen,
  setImportedStatus,
}: BoardProps) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: projectId });

  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const moveTask = (taskId: number, toStatus: Status) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured while fetching tasks :c</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className=" pt-4">
        <div className="hidden min-[740px]:flex overflow-x-auto overflow-y-hidden gap-4 px-1 pb-1">
          <div className="flex min-w-max">
            {taskStatus.map((status) => (
              <div
                key={status}
                className="border-r-1 border-purple-200 min-w-[300px] max-w-[320px]"
              >
                <TaskColumn
                  key={status}
                  status={status}
                  tasks={tasks || []}
                  moveTask={moveTask}
                  setIsModalNewTaskOpen={setIsModalNewTaskOpen}
                  setImportedStatus={setImportedStatus}
                  isMobile={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE layout (stacked) */}
        <div className="min-[740px]:hidden flex flex-col gap-4">
          {taskStatus.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks || []}
              moveTask={moveTask}
              setIsModalNewTaskOpen={setIsModalNewTaskOpen}
              setImportedStatus={setImportedStatus}
              isMobile={true}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};
// .filter((status) => status.toLowerCase() !== "backlog"
//npm i @mui/material @emotion/react @emotion/styled numeral date-fns axios recharts react-dnd react-dnd-html5-backend gantt-task-react

type TaskColumnProps = {
  status: Status;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: Status) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
  setImportedStatus: (importedStatus: Status) => void;
  isMobile: boolean;
};

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
  setImportedStatus,
  isMobile,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const columnTasks = tasks.filter((task) => task.status === status);
  const taskCount = tasks.filter((task) => task.status == status).length;

  //Work around for not being able to update Tailwind class dynamically
  const statusColorClass = statusColors[status];
  const [hover, setHover] = useState(false);
  //- - -

  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (isMobile && taskCount === 0 && isExpanded) {
      setIsExpanded(false);
    }
  }, [isMobile, taskCount]);

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`flex flex-col  ${
        isOver ? "bg-blue-100 dark:bg-neutral-950" : ""
      } `}
    >
      <div
        className="w-full h-2"
        style={{ backgroundColor: statusColorClass }}
      />

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b-1 border-purple-200 dark:bg-purple-500">
        <h3 className="flex items-center text-lg font-semibold dark:text-white">
          {status}
          <div className="w-[20px] h-[20px] ml-2 inline-block rounded-full bg-gray-200 dark:bg-purple-300 p-1 text-center text-sm leading-none">
            {taskCount}
          </div>
        </h3>

        {/* BUTTONS */}
        <div className="flex items-center gap-1">
          <button className=" text-neutral-500 cursor-pointer">
            <EllipsisVertical size={20} />
          </button>
          <button
            className="rounded p-1 bg-purple-100 dark:bg-purple-300  text-white cursor-pointer"
            style={{
              backgroundColor: hover ? statusColorClass : undefined,
            }}
            onClick={() => {
              setIsModalNewTaskOpen(true);
              setImportedStatus(status);
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Plus size={16} />
          </button>
          {/* MOBILE TOGGLE */}
          {isMobile && (
            <>
              <button
                className={`block min-[740px]:hidden p-1 rounded ${
                  taskCount === 0
                    ? "text-gray-400"
                    : "text-black cursor-pointer"
                }`}
                onClick={() => taskCount > 0 && setIsExpanded(!isExpanded)}
                disabled={taskCount === 0}
              >
                {isExpanded ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* TASK AREA */}
      <div
        className={`
                bg-purple-50
                ${isExpanded ? "opacity-100 p-4 " : "max-h-0 opacity-0"}
                ${isMobile ? "flex gap-2 overflow-x-auto " : "flex flex-col gap-3 overflow-y-auto h-[400px]"}
              `}
      >
        {columnTasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

type TaskProps = {
  task: TaskType;
};

const Task = ({ task }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const taskTags = task.tags ? task.tags.split(",") : [];
  const priority = (task.priority || "Backlog") as Priority;
  const formattedCreationDate = task.creationDate
    ? format(new Date(task.creationDate), "P")
    : "";
  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";

  const commentCount = (task.comments && task.comments.length) || 0;

  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`mb-4 flex flex-col rounded-md bg-white dark:bg-purple-200 shadow-xl ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="flex-1 flex flex-col p-4 md:p-6">
        <div className="flex items-start justify-between gap-2">
          <div className="flex justify-start gap-2">
            {/* PRIORITY LABEL */}
            {priority && (
              <div
                className={`rounded-full px-2 py-1 
               text-xs font-semibold `}
                style={{
                  backgroundColor: priorityBubbles[priority][1],
                  color: priorityBubbles[priority][0],
                }}
              >
                {priority}
              </div>
            )}
            {/* TAGS */}
            <div className="flex gap-2">
              {taskTags.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-purple-25 px-2 py-1 text-xs"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500">
            <EllipsisVertical size={26} />
          </button>
        </div>

        <div className="flex justify-between py-2">
          {/* TASK NAME */}
          <h4 className="text-md font-bold ">{task.name}</h4>

          {/* POINTS */}
          {typeof task.points === "number" && (
            <div className="text-xs font-semibold dark:text-white">
              {task.points} pts
            </div>
          )}
        </div>

        {/* DATES */}
        <div className="grid grid-cols-1 text-xs text-gray-500 dark:text-neutral-800 ">
          {formattedStartDate && formattedDueDate ? (
            <>
              <div>
                Start: <span>{formattedStartDate}</span>
              </div>
              <div>
                Due: <span>{formattedDueDate}</span>
              </div>
            </>
          ) : (
            <div>
              Created: <span>{formattedCreationDate}</span>
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        <p className="my-1 text-sm text-gray-600 dark:text-neutral-900">
          {task.description}
        </p>
      </div>

      {/* BOTTOM SECTION */}
      <div className="p-2 mt-auto">
        <div className="mt-4 border-t border-gray-200 dark:border-stroke-dark" />
        {/* Users */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-[8px] overflow-hidden">
            {task.assignee && (
              <Image
                key={task.assignee.userId}
                src={`/${task.assignee.profilePictureUrl!}`}
                alt={task.assignee.username}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-2 border-white object-cover"
              />
            )}
            {task.author && (
              <Image
                key={task.author.userId}
                src={`/${task.author.profilePictureUrl!}`}
                alt={task.author.username}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-2 border-white object-cover"
              />
            )}
          </div>
          {/* COMMENTS */}
          <div className="flex items-center text-gray-500 dark:text-white">
            <MessageSquareMore size={20} />
            <span className="ml-1 text-sm ">{commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Board;
