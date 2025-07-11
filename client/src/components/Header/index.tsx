"use client";
import { setIsDarkMode } from "@/states/slices";
import { useAppDispatch, useAppSelector } from "@/states/store";
import { Moon, Sun } from "lucide-react";
import React from "react";

const Header = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  return (
    <div className="flex items-center justify-between h-10 w-[100%] bg-purple-100 dark:bg-purple-600">
      {/* LOGO */}
      <div className="flex justify-center items-center h-[40px] w-[40px] bg-purple-300 dark:bg-purple-500 dark:border dark:border-purple-700">
        <h1 className="relative right-[2px] bottom-[2px] text-3xl font-bold italic text-white">
          K
        </h1>
      </div>

      {/* LIGHT/DARK MODE */}
      <button
        onClick={() => {
          dispatch(setIsDarkMode(!isDarkMode));
        }}
        className="rounded-full mr-3 p-2 cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-500"
      >
        {isDarkMode ? (
          <Sun className="h-4 w-4 dark:text-white" />
        ) : (
          <Moon className="h-4 w-4 dark:text-white" />
        )}
      </button>
    </div>
  );
};
export default Header;
