"use client";
//Cant put "use client" in layout.tsx -> creating an additionally wrapper
import Banner from "@/components/Banner";
import RedirectModal from "@/components/Modals/RedirectModal";
import Sidebar from "@/components/Sidebar";
import { useAppSelector } from "@/states/store";
import React, { useEffect, useState } from "react";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  const [redirectId, setRedirectId] = useState<number | null>(null);
  const [isRedirectOpen, setIsRedirectOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        setRedirectId={(id) => {
          setRedirectId(id);
          setIsRedirectOpen(true);
        }}
      />

      <main className="flex w-full flex-col bg-white dark:bg-purple-500">
        <Banner />
        {children}
        {redirectId && (
          <RedirectModal
            id={redirectId}
            isOpen={isRedirectOpen}
            onClose={() => {
              setIsRedirectOpen(false);
              setRedirectId(null);
            }}
            url={`/projects/${redirectId}`}
            item="project"
          />
        )}
      </main>
    </div>
  );
};

export default DashboardWrapper;
