"use client";

{
  /* 
okay, I want to focus on these:

Task Metrics:
Tasks overdue: Number of tasks past their due date.

Upcoming deadlines: Tasks due within X days.

Average task completion time: Measures efficiency.

Team Metrics:

Team attached to project 
  */
}

import React, { useMemo } from "react";
import {
  useGetProjectByIdQuery,
  useGetTasksQuery,
  useDeleteProjectMutation,
  Status,
} from "@/states/api";
import { statusColors } from "@/styles/TagColors";
import {
  Calendar,
  ClipboardList,
  FileText,
  Clock,
  CheckCircle2,
  PauseCircle,
  Trash2,
  PenSquare,
  Pencil,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type DescriptionProps = {
  projectId: number;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const Description = ({
  projectId,
  setIsModalNewTaskOpen,
}: DescriptionProps) => {
  const { data: project } = useGetProjectByIdQuery({ id: projectId });
  const { data: tasks } = useGetTasksQuery({ projectId });
  const [deleteProject] = useDeleteProjectMutation();

  // Count tasks by status
  const statusData = useMemo(() => {
    if (!tasks) return [];

    return Object.values(Status)
      .map((status) => ({
        name: status,
        value: tasks.filter((task) => task.status === status).length,
      }))
      .filter((entry) => entry.value > 0); // optional: remove 0-count statuses
  }, [tasks]);

  //Will make Modal for this
  const handleDeleteProject = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this project? This action cannot be undone."
      )
    )
      return;
    try {
      await deleteProject({ id: projectId }).unwrap();
      alert("Project deleted successfully.");
      // Optionally redirect user after deletion
    } catch (err) {
      console.error("Failed to delete project:", err);
      alert("Failed to delete project.");
    }
  };
  //---

  if (!project)
    return (
      <div className="p-8 text-gray-500 dark:text-gray-200">Loading...</div>
    );

  return (
    <div className="pt-4 px-4 pb-4 bg-gray-100 dark:bg-purple-600 min-h-screen transition-colors duration-300">
      {/* INFO ITEMS +  BUTTONS */}
      <div className="p-4 rounded-xl bg-white dark:bg-purple-500 shadow-md flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* INFO ITEMS (dates, etc) */}
        <div className="flex flex-wrap items-center gap-6 text-gray-700 dark:text-gray-200">
          {project.startDate && (
            <div className="flex items-center gap-2 whitespace-nowrap">
              <Clock className="w-5 h-5 text-purple-500 dark:text-purple-25" />
              <span>
                Start: {new Date(project.startDate).toLocaleDateString()}
              </span>
            </div>
          )}
          {project.dueDate && (
            <div className="flex items-center gap-2 whitespace-nowrap">
              <ClipboardList className="w-5 h-5 text-purple-500 dark:text-purple-25" />
              <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
            </div>
          )}
          {project.dateFinished && (
            <div className="flex items-center gap-2 whitespace-nowrap">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>
                Finished: {new Date(project.dateFinished).toLocaleDateString()}
              </span>
            </div>
          )}
          {project.datePostponed && (
            <div className="flex items-center gap-2 whitespace-nowrap">
              <PauseCircle className="w-5 h-5 text-yellow-500" />
              <span>
                Postponed:
                {new Date(project.datePostponed).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2 ml-auto">
          {/* EDIT BUTTON */}
          <button
            onClick={() => console.log("Edit clicked")}
            title="Edit Project"
            className="p-2 rounded hover:bg-purple-100 dark:hover:bg-purple-400 transition-colors cursor-pointer"
          >
            <Pencil className="w-5 h-5 text-purple-500 dark:text-white" />
          </button>

          {/* DELETE BUTTON */}
          <button
            onClick={handleDeleteProject}
            title="Delete Project"
            className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-200 transition-colors cursor-pointer"
          >
            <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
          </button>
        </div>
      </div>

      <div className="flex flex-col min-[700px]:flex-row gap-6 mb-10">
        {/* LEFT: DESCRIPTION */}
        <div className="min-[700px]:w-1/3 p-4 rounded-xl bg-white dark:bg-purple-500 shadow-md flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-purple-500 dark:text-purple-25" />
            <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
              Description
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-200">
            {project.description || "No description provided."}
          </p>
        </div>

        {/* RIGHT: PIE CHART */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="p-6 rounded-xl bg-white dark:bg-purple-500 shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-purple-500 dark:text-purple-25" />
              Task Status Overview
            </h2>
            <div className="w-full h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={
                      statusData.length
                        ? statusData
                        : [{ name: "No Tasks", value: 1 }]
                    }
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={statusColors[entry.name as Status] || "#ccc"}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={
                      statusData.length
                        ? (value, name) => [`${value}`, `${name}`]
                        : (value, name) => [`${name}`]
                    }
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
