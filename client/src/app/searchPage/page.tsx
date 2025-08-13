"use client";
import { useSearchQuery } from "@/states/api";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import TaskCard from "@/components/TaskCard";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

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
      <div className="flex justify-between items-center text-purple-700 px-2 m-4 border border-purple-700 bg-white dark:bg-purple-100">
        <input
          type="text"
          placeholder="Search..."
          className=" outline-none w-full"
        />
        <Search className="w-[15px] h-[15px]" />
      </div>

      <div className="p-5">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occurred while fetching search results.</p>}
        {!isLoading && !isError && searchResults && (
          <div>
            {searchResults.tasks && searchResults.tasks?.length > 0 && (
              <>
                <h2>Tasks</h2>
                <div className="w-[30px] h-[20px] ml-2 inline-block rounded-full bg-gray-200 dark:bg-purple-400 p-1  font-semibold text-center leading-none">
                  {searchResults.tasks.length}
                </div>
              </>
            )}
            {searchResults.tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}

            {searchResults.projects && searchResults.projects?.length > 0 && (
              <>
                <h2>Projects</h2>
                <div className="w-[30px] h-[20px] ml-2 inline-block rounded-full bg-gray-200 dark:bg-purple-400 p-1  font-semibold text-center leading-none">
                  {searchResults.projects.length}
                </div>
              </>
            )}
            {/* {searchResults.projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))} */}

            {searchResults.users && searchResults.users?.length > 0 && (
              <>
                <h2>Users</h2>
                <div className="w-[30px] h-[20px] ml-2 inline-block rounded-full bg-gray-200 dark:bg-purple-400 p-1  font-semibold text-center leading-none">
                  {searchResults.users.length}
                </div>
              </>
            )}
            {/* {searchResults.users?.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
