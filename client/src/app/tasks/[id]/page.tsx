"use client";

import React from "react";
import { useParams } from "next/navigation";
import {
  useGetTaskByIdQuery,
  useDeleteTasksMutation,
  Status,
  Priority,
} from "@/states/api";
import { User, Pencil, Trash2, Plus, SendHorizontal } from "lucide-react";
import { priorityBubbles, statusBubbles } from "@/styles/TagColors";
import Link from "next/link";
import ItemUnavailable from "@/components/ItemUnavailable";

const TaskPage = () => {
  const { id } = useParams();
  const {
    data: task,
    isLoading,
    isError,
    error,
  } = useGetTaskByIdQuery({ id: Number(id) });
  const [deleteTask] = useDeleteTasksMutation();

  const handleDeleteTask = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this task? This action cannot be undone."
      )
    )
      return;
    try {
      await deleteTask({ id: Number(id) }).unwrap();
      alert("Task deleted successfully.");
    } catch (err) {
      console.error("Failed to delete task:", err);
      alert("Failed to delete task.");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-purple-500">
        Loading task...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error loading task: {JSON.stringify(error)}
      </div>
    );

  if (!task)
    return (
      <div className="flex justify-center items-center h-full">
        <ItemUnavailable item="Task" />
      </div>
    );

  console.log(task);
  console.log(task.comments);

  return (
    <div className="flex m-4 h-screen rounded-2xl bg-gray-100 dark:bg-purple-800 text-black dark:text-purple-25 overflow-hidden">
      {/* Section 1: Main Task Content */}
      <div className="flex-[2] p-6 overflow-y-auto">
        {/* Header: Status + Priority + Buttons */}
        <div className="flex items-center mb-4">
          <div
            className={`rounded-full px-2 py-1 text-xs font-semibold mr-2`}
            style={{
              backgroundColor: statusBubbles[task.status as Status][1],
              color: statusBubbles[task.status as Status][0],
            }}
          >
            {task.status}
          </div>

          <div
            className={`rounded-full px-2 py-1 text-xs font-semibold mr-2`}
            style={{
              backgroundColor: priorityBubbles[task.priority as Priority][1],
              color: priorityBubbles[task.priority as Priority][0],
            }}
          >
            {task.priority}
          </div>

          <div className="flex gap-2 ml-auto">
            {/* Edit Button */}
            <button
              onClick={() => console.log("Edit clicked")}
              title="Edit Task"
              className="p-2 rounded hover:bg-purple-100 dark:hover:bg-purple-400 transition-colors cursor-pointer"
            >
              <Pencil className="w-5 h-5 text-purple-500 dark:text-white" />
            </button>

            {/* Delete Button */}
            <button
              onClick={handleDeleteTask}
              title="Delete Task"
              className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-200 transition-colors cursor-pointer"
            >
              <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
            </button>
          </div>
        </div>

        <div className="flex justify-between pt-1">
          {/* Task Name */}
          <h1 className="text-3xl font-bold mb-4">{task.name}</h1>
          {/* Travel to Project Button */}
          <Link
            href={`/projects/${task.projectId}`}
            className="flex items-center ml-6 gap-1 px-3 py-2 rounded bg-purple-500 text-white hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-500 transition-colors"
          >
            <span>Travel to Project</span>
            <SendHorizontal className="w-4 h-4" />
          </Link>
        </div>

        {/* Add attachment Button Placeholder */}
        <div className="flex gap-2">
          <p>Add attachment</p>
          <button
            onClick={() => alert("🚧 This feature is under construction!")}
            className="rounded p-1 bg-purple-100 dark:bg-purple-300 hover:bg-purple-200 text-white cursor-pointer mb-6"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Description Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <div className="max-h-48 overflow-y-auto p-3 bg-white dark:bg-purple-700 rounded shadow">
            {task.description}
          </div>
        </div>

        {/* Comments Section */}
        <div className="mb-6 relative">
          <h2 className="text-xl font-semibold mb-2">Comments</h2>
          {/* Coming Soon Placeholder */}
          <div className="flex flex-col items-center justify-center min-h-[25rem] flex-1 rounded-lg border border-dashed border-purple-300 bg-purple-50 dark:bg-purple-500 p-6 text-center shadow-sm">
            <p className="text-lg font-medium text-purple-600 dark:text-purple-100 mb-1">
              💬 Comments Coming Soon
            </p>
            <p className="text-sm text-purple-400 dark:text-purple-200 opacity-80">
              Stay tuned — you'll soon be able to add and view comments here!
            </p>
          </div>
          {/* <div className="max-h-48 overflow-y-auto p-3 bg-white dark:bg-purple-700 rounded shadow space-y-4">
            {task.comments && task.comments.length > 0 ? (
              task.comments.map((comment) => {
                const user =
                  task.author.userId === comment.userId
                    ? task.author
                    : task.assignee?.userId === comment.userId
                      ? task.assignee
                      : null; // fallback if you want to fetch from useGetUsersQuery

                return (
                  <div key={comment.id} className="flex items-start gap-3">
                    {/* User Profile Picture 
                    <img
                      src={user?.profilePictureUrl || "/default-avatar.png"}
                      alt="user profile"
                      className="w-10 h-10 rounded-full object-cover mt-1"
                    />

                    {/* Comment Box 
                    <div className="relative inline-block max-w-[70%] bg-gray-100 dark:bg-purple-600 rounded-lg p-3 shadow">
                      {/* Date top-right 
                      <span className="absolute top-1 right-2 text-xs text-gray-500 dark:text-gray-300">
                        {new Date(comment.creationDate).toLocaleDateString(
                          "en-US"
                        )}
                      </span>

                      {/* User Name 
                      <p className="font-semibold text-sm text-purple-700 dark:text-purple-200">
                        {user?.username || `User ${comment.userId}`}
                      </p>

                      {/* Comment Text 
                      <p className="text-sm mt-1">{comment.text}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No comments yet.</p>
            )}
          </div>

          {/* Floating Add Comment Button 
          <button
            title="Add Comment"
            className=" absolute bottom-2 opacity-75  cursor-pointer right-2 rounded-full bg-purple-500 text-white p-3 shadow-lg hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-500 transition-colors"
          >
            <Plus size={15} />
          </button> */}
        </div>
      </div>

      {/* Section 2: Details Sidebar */}
      <div className="flex-[1] p-6 overflow-y-auto border-l border-gray-200 dark:border-purple-600">
        <h2 className="text-lg font-semibold mb-4">Details</h2>

        {/* Author */}
        <div className="mb-3">
          <User className="inline h-5 w-5 mr-2 text-purple-500 dark:text-purple-25" />
          <strong>Author:</strong> {task.author.username}
        </div>

        {/* Assignee */}
        <div className="mb-3">
          <User className="inline h-5 w-5 mr-2 text-purple-500 dark:text-purple-25" />
          <strong>Assignee:</strong>
          {task.assignee ? task.assignee.username : "Unassigned"}
        </div>

        {/* Tags */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Tags</h3>
          {task.tags ? (
            <div className="flex flex-wrap gap-2">
              {task.tags.split(",").map((tag) => (
                <div
                  key={tag}
                  className="rounded-full px-2 py-1 text-xs font-semibold bg-purple-200 text-purple-700 dark:bg-purple-500 dark:text-purple-25"
                >
                  {tag.trim()}
                </div>
              ))}
            </div>
          ) : (
            <p>No Tags</p>
          )}
        </div>

        {/* Attachments */}
        <div>
          <h3 className="font-semibold mb-2">Attachments</h3>
          {task.attachments && task.attachments.length > 0 ? (
            <ul className="list-disc list-inside">
              {task.attachments.map((att) => (
                <li key={att.id}>
                  <a
                    href={att.fileURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-500 dark:text-purple-200 hover:underline"
                  >
                    {att.fileName || att.fileURL}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No attachments.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
