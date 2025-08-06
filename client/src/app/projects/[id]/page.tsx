"use client";

import React, { useState } from "react";
import ProjectHeader from "@/app/projects/ProjectHeader";
// import { useGetProjectByIdQuery } from "@/states/api";
import { useParams } from "next/navigation";
import Board from "../BoardView";
import Timeline from "../CalendarView";

const Project = () => {
  const { id } = useParams();
  const projectId = Number(id);

  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div className="pt-2">
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

      {activeTab === "Board" && (
        <Board
          projectId={projectId}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
      {/* {activeTab === "Table" && (
        <Table
          projectId={projectId}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )} */}
      {activeTab === "Timeline" && (
        <>
          hii
          <Timeline
            projectId={projectId}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        </>
      )}
      {/*{activeTab === "Table" && (
        <Table projectId={projectId} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )} */}
    </div>
  );
};

export default Project;
