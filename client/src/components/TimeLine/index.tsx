import React, { useEffect, useMemo, useRef, useState } from "react";
import { DisplayOption, Gantt, ViewMode } from "@rsagiev/gantt-task-react-19";
import "@rsagiev/gantt-task-react-19/dist/index.css";
import { useAppSelector } from "@/states/store";

type GanttItemType = "task" | "milestone" | "project";

interface dataSetItem {
  id: number | string;
  name?: string;
  startDate: string | undefined;
  dueDate: string | undefined;
  points?: number;
}

type Props = {
  dataType: GanttItemType;
  dataSet: dataSetItem[];
  header: string;
};

const viewOptions = [
  { label: "Day", value: ViewMode.Day },
  { label: "Week", value: ViewMode.Week },
  { label: "Month", value: ViewMode.Month },
];

const TimeLine = ({ dataSet, dataType, header }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const ganttTasks = useMemo(() => {
    if (!dataSet) return [];

    return dataSet
      .map((item) => {
        if (!item.startDate || !item.dueDate) return null;

        const start = new Date(item.startDate);
        const end = new Date(item.dueDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
          return null;
        }

        return {
          start,
          end,
          name: item.name ?? "Untitled",
          id: `${dataType}-${item.id}`,
          type: dataType,
          progress: item.points ? (item.points / 10) * 100 : 0,
          isDisabled: false,
        };
      })
      .filter((t): t is NonNullable<typeof t> => t !== null);
  }, [dataSet, dataType]);

  const handleViewModeChange = (value: ViewMode) => {
    setDisplayOptions((prev) => ({ ...prev, viewMode: value }));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between gap-2 py-5 w-full">
        <h1 className="me-2 text-lg font-bold dark:text-white">{header}</h1>

        {/* VIEW MODE DROP DOWN */}
        <div className="relative inline-block" ref={dropdownRef}>
          {/* BUTTON */}
          <div
            className="flex justify-center rounded border border-gray-400 bg-white px-4 py-2 leading-tight 
                       hover:border-gray-500 cursor-pointer dark:bg-purple-300 dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {displayOptions.viewMode}
          </div>

          {/* MENU */}
          <div
            className={`flex justify-start absolute left-0 w-full mt-1 shadow-lg bg-purple-600 
                       transition-all duration-200 origin-top z-10
                       ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"} `}
          >
            <div className="border border-gray-300 dark:border-gray-600">
              {viewOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleViewModeChange(option.value)}
                  className={`px-4 py-2 cursor-pointer bg-white dark:bg-purple-700
                           hover:bg-purple-200 dark:hover:bg-purple-300 hover:text-white transition-colors duration-150
                           ${displayOptions.viewMode === option.value ? "bg-purple-300 text-purple-700 dark:text-white" : "text-gray-500 hover:text-purple-600 dark:text-neutral-400 dark:hover:text-white"}`}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden dark:text-white shadow">
        <Gantt
          tasks={ganttTasks}
          {...displayOptions}
          columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
          listCellWidth="120px" // slightly wider for readability
          projectBackgroundColor={isDarkMode ? "#f7bb53" : "#9C7FA3"}
          projectBackgroundSelectedColor={isDarkMode ? "#3c303f" : "#f7bb53"}
          barBackgroundColor={isDarkMode ? "#E0AF55" : "#9C7FA3"}
          barBackgroundSelectedColor={isDarkMode ? "#3c303f" : "#827386"}
        />
      </div>
    </>
  );
};

export default TimeLine;
