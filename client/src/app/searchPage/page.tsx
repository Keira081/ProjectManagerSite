"use client";

import { useSearchQuery } from "@/states/api";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { Search, FileText, Users, Layers, Users2 } from "lucide-react";
import TaskCard from "@/components/Cards/TaskCard";
import UserCard from "@/components/Cards/UserCard";
import ProjectCard from "@/components/Cards/ProjectCard";
import TeamCard from "@/components/Cards/TeamCard";
import { useSearchParams } from "next/navigation";

export const highlightText = (text: string, searchTerm?: string) => {
  if (!text) return "";
  if (!searchTerm) return text;
  const escapedTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  const regex = new RegExp(`(${escapedTerm})`, "gi");

  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-200 dark:bg-yellow-500">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query") || "";

  const [searchTerm, setSearchTerm] = useState(queryParam);

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 2,
  });

  // Shared container class for card lists
  const cardContainerClass =
    "max-h-96 overflow-y-auto space-y-2 mt-2 p-3 rounded-lg shadow-sm bg-gray-100 dark:bg-purple-600";
  const sectionTitleClass =
    "font-semibold text-purple-600 dark:text-purple-200";
  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500
  );

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      {/* Search input */}
      <div className="flex justify-between items-center px-4 py-2 mb-6 border rounded-lg bg-white dark:bg-purple-100 border-purple-200 dark:border-purple-400 shadow-sm">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none w-full bg-transparent text-purple-700"
          onChange={handleSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter") setSearchTerm(e.currentTarget.value);
          }}
        />
        <Search className="w-5 h-5 text-purple-500 dark:text-purple-500 ml-2" />
      </div>

      {/* Summary Counts */}
      {!isLoading && !isError && searchResults && (
        <div className="flex gap-4 mb-4 text-gray-500 dark:text-gray-300 text-sm">
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            Tasks: {searchResults.tasks?.length || 0}
          </div>
          <div className="flex items-center gap-1">
            <Layers className="w-4 h-4" />
            Projects: {searchResults.projects?.length || 0}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            Users: {searchResults.users?.length || 0}
          </div>
          <div className="flex items-center gap-1">
            <Users2 className="w-4 h-4" />
            Teams: {searchResults.teams?.length || 0}
          </div>
        </div>
      )}

      <div className="p-2">
        {isLoading && (
          <p className="text-gray-500 dark:text-gray-300">Loading...</p>
        )}
        {isError && (
          <p className="text-red-500">
            Error occurred while fetching search results.
          </p>
        )}

        {!isLoading && !isError && searchResults && (
          <>
            {/* PROJECTS */}
            {searchResults.projects && searchResults.projects.length > 0 && (
              <div className="mb-4">
                <h2 className={sectionTitleClass}>Projects</h2>
                <div className={cardContainerClass}>
                  {searchResults.projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      searchTerm={searchTerm}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* TASKS */}
            {searchResults.tasks && searchResults.tasks.length > 0 && (
              <div className="mb-4">
                <h2 className={sectionTitleClass}>Tasks</h2>
                <div className={cardContainerClass}>
                  {searchResults.tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      searchTerm={searchTerm}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* USERS */}
            {searchResults.users && searchResults.users.length > 0 && (
              <div className="mb-4">
                <h2 className={sectionTitleClass}>Users</h2>
                <div className={cardContainerClass}>
                  {searchResults.users.map((user) => (
                    <UserCard
                      key={user.userId}
                      user={user}
                      searchTerm={searchTerm}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* TEAMS */}
            {searchResults.teams && searchResults.teams.length > 0 && (
              <div className="mb-4">
                <h2 className={sectionTitleClass}>Teams</h2>
                <div className={cardContainerClass}>
                  {searchResults.teams.map((team) => (
                    <TeamCard
                      key={team.teamId}
                      team={team}
                      searchTerm={searchTerm}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* NO RESULTS MESSAGE */}
            {!searchResults.projects?.length &&
              !searchResults.tasks?.length &&
              !searchResults.users?.length &&
              !searchResults.teams?.length && (
                <div className="mt-6 p-4 rounded-lg bg-yellow-200 dark:bg-yellow-200 text-yellow-900  text-center">
                  No results found for "
                  <span className="font-semibold">{searchTerm}</span>"
                </div>
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
