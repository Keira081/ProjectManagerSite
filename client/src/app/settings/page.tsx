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

      <div className="space-y-6 max-w-md">
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
    </div>
  );
};

export default Settings;
