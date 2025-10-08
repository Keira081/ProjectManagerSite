"use client";

import React, { useState } from "react";
import ProjectHeader from "@/app/projects/[id]/ProjectHeader";
import { useParams } from "next/navigation";
import Board from "./BoardView";
import Table from "./TableView";
import Description from "./DescriptionView";
import NewTaskModal from "@/components/Modals/NewTaskModal";
import TaskTimelineView from "./TaskTimelineView";
import { useGetProjectByIdQuery } from "@/states/api";
import ItemUnavailable from "@/components/ItemUnavailable";

const Project = () => {
  const { id } = useParams();
  const projectId = Number(id);

  const [activeTab, setActiveTab] = useState("Description");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  const [importedStatus, setImportedStatus] = useState("");

  const {
    data: project,
    isLoading,
    isError,
    error,
  } = useGetProjectByIdQuery({ id: projectId });

  if (!project)
    return (
      <div className="flex justify-center items-center h-full">
        <ItemUnavailable item="Project" />
      </div>
    );

  return (
    <div className="pt-2">
      <NewTaskModal
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        projectId={projectId}
        importedStatus={importedStatus}
      />

      <ProjectHeader
        projectId={projectId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "Board" && (
        <Board
          projectId={projectId}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          setImportedStatus={setImportedStatus}
        />
      )}
      {activeTab === "Table" && (
        <Table
          projectId={projectId}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
      {activeTab === "Timeline" && (
        <TaskTimelineView
          projectId={projectId}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
      {activeTab === "Description" && (
        <Description
          projectId={projectId}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
    </div>
  );
};

export default Project;
