"use client";

import React, { useState } from "react";
import ProjectHeader from "@/app/projects/[id]/ProjectHeader";
import { useParams } from "next/navigation";
import Board from "./BoardView";
import Table from "./TableView";
import NewTaskModal from "@/components/NewTaskModal";
import TaskTimelineView from "./TaskTimelineView";

const Project = () => {
  const { id } = useParams();
  const projectId = Number(id);

  const [activeTab, setActiveTab] = useState("Table");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  const [importedStatus, setImportedStatus] = useState("");

  const [showLoading, setShowLoading] = useState(false); // <-- NEW

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
      {/*{activeTab === "Description" && (
        <Description projectId={projectId} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )} */}
    </div>
  );
};

export default Project;
