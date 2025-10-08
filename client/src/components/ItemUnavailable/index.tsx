import { ArrowRight, FileWarning, House } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  item: string;
  promptNewItem?: boolean;
};

const ItemUnavailable = ({ item, promptNewItem }: Props) => {
  return (
    <div
      className="
        flex flex-col items-center justify-center min-h-[20rem] w-full h-[80%] p-4 mx-5
        rounded-2xl border border-gray-200 dark:border-purple-500/30
        bg-gray-100 dark:bg-purple-700
        text-gray-600 dark:text-purple-100
        shadow-sm
      "
    >
      <FileWarning className="h-10 w-10 mb-3 opacity-80 text-red-600 dark:text-red-400" />
      <p className="text-lg font-semibold">No {item} Available</p>

      {promptNewItem ? (
        <p className="text-sm font-semibold opacity-70">
          Add a new task to get started
        </p>
      ) : (
        <Link
          href="/projects/allProjects"
          className="font-semibold mt-2 inline-flex items-center gap-1 text-gray-600 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
        >
          <span>Head home</span>
          <House className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
};

export default ItemUnavailable;
