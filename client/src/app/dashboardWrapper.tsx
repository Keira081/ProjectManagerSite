"use client";
//Cant put "use client" in layout.tsx -> creating an additionally wrapper
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useAppSelector } from "@/states/store";
import React, { useEffect } from "react";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex w-full flex-col bg-white dark:bg-purple-500">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default DashboardWrapper;
