import { User } from "@/states/api";
import Image from "next/image";
import React from "react";
import { Mail, UserCheck } from "lucide-react";
import { highlightText } from "@/app/searchPage/page";

type Props = {
  user: User;
  searchTerm?: string;
};

const UserCard = ({ user, searchTerm }: Props) => {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-purple-200 bg-white p-4 shadow-md transition hover:shadow-lg dark:border-purple-500 dark:bg-purple-700 dark:text-white">
      {/* Avatar */}
      <div className="relative h-12 w-12 flex-shrink-0">
        {user.profilePictureUrl ? (
          <Image
            src={`/${user.profilePictureUrl}`}
            alt={`${user.username} profile`}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full border-2 border-white object-cover dark:border-purple-300"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-200 dark:bg-purple-500 text-white">
            <UserCheck size={24} />
          </div>
        )}
      </div>

      {/* User Info */}
      <div className="flex flex-col">
        <h3 className="text-md font-semibold text-purple-700 dark:text-purple-200">
          {highlightText(user.username, searchTerm)}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <Mail size={14} />
          <span>{highlightText(user.email, searchTerm)}</span>
        </div>
        {/* {user.role && (
          <span className="mt-1 inline-block rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-500 dark:text-white">
            {user.role}
          </span>
        )} */}
      </div>
    </div>
  );
};

export default UserCard;
