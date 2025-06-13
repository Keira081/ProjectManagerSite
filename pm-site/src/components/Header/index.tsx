import { Moon } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-between h-10 w-[100%] bg-purple-100 dark:bg-purple-600">
      {/* LOGO */}
      <div className="flex justify-center items-center h-[40px] w-[40px] bg-purple-300 dark:bg-purple-500">
        <h1 className="relative right-[2px] bottom-[2px] text-3xl font-bold italic text-white">
          K
        </h1>
      </div>

      {/* LIGHT/DARK MODE */}
      <button className="rounded-full mr-3 p-2 cursor-pointer hover:bg-purple-50">
        <Moon className="h-4 w-4 dark:text-white" />
      </button>
    </div>
  );
};
// The title is in the middle of the LOGO and the moon, I want it's div to fill 100% of the spacethat's between the it and the logo and the moon but h-100% in it's class name isnt working (I'm using TailwindCSS)
export default Header;
