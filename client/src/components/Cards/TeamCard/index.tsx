import { Team } from "@/states/api";
import Image from "next/image";
import React from "react";
import { Users } from "lucide-react";
import { highlightText } from "@/app/searchPage/page";

type Props = {
  team: Team;
  searchTerm?: string;
};

const TeamCard = ({ team, searchTerm }: Props) => {
  return (
    <div className="rounded-lg border border-purple-200 bg-white p-4 shadow-md transition hover:shadow-lg dark:border-purple-500 dark:bg-purple-700 dark:text-white">
      {/* Team Name */}
      <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-200 mb-2">
        {highlightText(team.teamName, searchTerm)}
      </h3>

      {/* Team Owner */}
      {/* {team.owner ? (
        <div className="flex items-center gap-2 mb-3">
          <Image
            src={`/${team.owner.profilePictureUrl}`}
            alt={team.owner.username}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-purple-300"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Owner: {team.owner.username}
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2 mb-3 text-gray-600 dark:text-gray-300">
          <Users size={16} />
          <span>Owner not set</span>
        </div>
      )} */}

      {/* Team Members Preview */}
      {/* {team.members && team.members.length > 0 ? (
        <div className="flex -space-x-2">
          {team.members.slice(0, 5).map((member) => (
            <Image
              key={member.userId}
              src={`/${member.profilePictureUrl}`}
              alt={member.username}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-purple-300"
            />
          ))}
          {team.members.length > 5 && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-700 dark:bg-purple-500 dark:text-white border-2 border-white">
              +{team.members.length - 5}
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Users size={16} />
          <span>No members yet</span>
        </div>
      )} */}
    </div>
  );
};

export default TeamCard;
