"use client";

import React, { useState } from "react";
import ProjectHeader from "@/app/projects/ProjectHeader";
// import { useGetProjectByIdQuery } from "@/states/api";
import { useParams } from "next/navigation";

const Project = () => {
  const { id } = useParams();
  const projectId = Number(id);

  const [activeTab, setActiveTab] = useState("List");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      {/* Header */}

      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8"></div>
      {/* <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
      /> */}
      <ProjectHeader
        projectId={projectId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {/* <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <Timeline id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && (
        <Table id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )} */}
    </div>
  );
};

export default Project;
