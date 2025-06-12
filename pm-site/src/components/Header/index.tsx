import { Moon } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-between w-[100%] bg-purple-100 dark:bg-purple-600">
      {/* LOGO */}
      <div className="flex justify-center items-center h-[48px] w-[48px] bg-purple-300 dark:bg-purple-500">
        <h1 className="relative right-[2px] bottom-[2px] text-3xl font-bold italic text-white">
          K
        </h1>
      </div>

      {/* TITTLE */}
      <div className="flex justify-center w-[100%]">
        <h1 className="text-2xl font-bold italic text-purple-700 dark:text-white">
          . PM_____Site .
        </h1>
      </div>

      {/* LIGHT/DARK MODE */}
      <button className="rounded mr-3 p-2 cursor-pointer hover:bg-purple-50">
        <Moon className="h-6 w-6 dark:text-white" />
      </button>
    </div>
  );
};
// The title is in the middle of the LOGO and the moon, I want it's div to fill 100% of the spacethat's between the it and the logo and the moon but h-100% in it's class name isnt working (I'm using TailwindCSS)
export default Header;
