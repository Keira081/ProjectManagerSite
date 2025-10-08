"use client";
import React from "react";
import { User, Mail, Users, Briefcase } from "lucide-react";

const Settings = () => {
  const userSettings = {
    username: "johndoe",
    email: "john.doe@example.com",
    teamName: "Development Team",
    roleName: "Developer",
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-purple-600 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6 text-purple-500 dark:text-purple-25">
        Settings
      </h1>

      {/* Main Flex Container */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT: User Info */}
        <div className="space-y-6 max-w-md w-full">
          {/* Username */}
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-purple-500 dark:text-purple-25" />
            <label className="text-sm font-medium text-gray-700 dark:text-white">
              Username
            </label>
          </div>
          <div className="p-2 border border-gray-200 dark:border-purple-400 rounded-md bg-white dark:bg-purple-500 text-black dark:text-white shadow-sm">
            {userSettings.username}
          </div>

          {/* Email */}
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-purple-500 dark:text-purple-25" />
            <label className="text-sm font-medium text-gray-700 dark:text-white">
              Email
            </label>
          </div>
          <div className="p-2 border border-gray-200 dark:border-purple-400 rounded-md bg-white dark:bg-purple-500 text-black dark:text-white shadow-sm">
            {userSettings.email}
          </div>

          {/* Team */}
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500 dark:text-purple-25" />
            <label className="text-sm font-medium text-gray-700 dark:text-white">
              Team
            </label>
          </div>
          <div className="p-2 border border-gray-200 dark:border-purple-400 rounded-md bg-white dark:bg-purple-500 text-black dark:text-white shadow-sm">
            {userSettings.teamName}
          </div>

          {/* Role */}
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-purple-500 dark:text-purple-25" />
            <label className="text-sm font-medium text-gray-700 dark:text-white">
              Role
            </label>
          </div>
          <div className="p-2 border border-gray-200 dark:border-purple-400 rounded-md bg-white dark:bg-purple-500 text-black dark:text-white shadow-sm">
            {userSettings.roleName}
          </div>
        </div>

        {/* RIGHT: Coming Soon */}
        <div className="flex flex-col items-center justify-center min-h-[25rem] flex-1 rounded-lg border border-dashed border-purple-300 bg-purple-50 dark:bg-purple-500 p-6 text-center shadow-sm">
          <p className="text-lg font-medium text-purple-600 dark:text-purple-100 mb-1">
            👤 User Login & Account Management Coming Soon
          </p>
          <p className="text-sm text-purple-400 dark:text-purple-200 opacity-80">
            Stay tuned — soon you’ll be able to create accounts, log in, and
            manage your profile right here!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
