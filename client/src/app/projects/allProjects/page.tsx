"use client";

import React, { useState } from "react";
import ProjectTimelineView from "./ProjectTimelineView";
import { CalendarDays, ChartNoAxesColumn, PencilLine } from "lucide-react";
import Header from "../Header";
import { useGetProjectsQuery } from "@/states/api";
const tabOptions = [
  { name: "Data", icon: <ChartNoAxesColumn className="h-5 w-5" /> },
  { name: "Timeline", icon: <CalendarDays className="h-5 w-5" /> },
];

const Project = () => {
  const { data: projects } = useGetProjectsQuery();
  // const query = useGetProjectsQuery();
  // console.log(query);

  const projectCount = projects?.length || 0;

  const [activeTab, setActiveTab] = useState("Timeline");

  return (
    <div className="pt-2">
      <Header
        header={
          <h1 className="text-4xl tracking-[.10em] font-medium text-purple-400 dark:text-white">
            All Projects
          </h1>
        }
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabOptions={tabOptions}
        otherComponent={
          <div className="flex items-center gap-1 text-xs font-thin text-purple-300 dark:text-neutral-400">
            <PencilLine className="h-4 w-4" />
            <p>Total Projects: </p>
            <div className="w-[30px] h-[20px] ml-2 inline-block rounded-full bg-gray-200 dark:bg-purple-400 p-1  font-semibold text-center leading-none">
              {projectCount}
            </div>
          </div>
        }
        threshold={650}
      />
      {activeTab === "Timeline" && <ProjectTimelineView />}
      {/* {activeTab === "Data" && (
        <DataView

        />
      )} */}
    </div>
  );
};

export default Project;
