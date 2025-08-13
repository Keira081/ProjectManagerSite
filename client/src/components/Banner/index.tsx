"use client";
import { setIsDarkMode } from "@/states/slices";
import { useAppDispatch, useAppSelector } from "@/states/store";
import { Moon, Sun, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

const Banner = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <>
      <div className="sticky top-0 z-50 flex items-center justify-between w-full h-[40px] bg-purple-100 dark:bg-purple-600">
        {/* LOGO */}
        <div className="flex justify-center items-center h-[40px] w-[40px] bg-purple-300 dark:bg-purple-500 dark:border dark:border-purple-700">
          <h1 className="relative right-[2px] bottom-[2px] text-3xl font-bold italic text-white">
            K
          </h1>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 pr-2">
          {/* LIGHT/DARK MODE */}
          <button
            onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
            className="rounded-full p-2 cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-500"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 dark:text-white" />
            ) : (
              <Moon className="h-4 w-4 dark:text-white" />
            )}
          </button>
          {/* SETTINGS ICON */}
          <Link href="/settings">
            <button className="rounded-full p-2 cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-500">
              <Settings className="h-4 w-4  dark:text-white" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Banner;
