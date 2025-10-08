import { Status } from "@/states/api";
import { EllipsisVertical } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { statusColors } from "@/styles/TagColors";
import styled from "styled-components";

type Props = {
  header: any;
  activeTab: string;
  setActiveTab: (tabName: string) => void;
  tabOptions: { name: string; icon: React.JSX.Element }[];
  otherComponent?: any;
  threshold?: number;
};

const TabsWrapper = styled.div<{ threshold: number }>`
  @media (min-width: ${(props) => props.threshold}px) {
    display: flex !important;
  }
  display: none;
`;

const DropdownWrapper = styled.div<{ threshold: number }>`
  @media (min-width: ${(props) => props.threshold}px) {
    display: none !important;
  }
  display: flex;
`;

const Header = ({
  header,
  activeTab,
  setActiveTab,
  tabOptions,
  otherComponent,
  threshold = 862,
}: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const renderTabButton = (tab: (typeof tabOptions)[0], isDropdown = false) => (
    <button
      key={tab.name}
      onClick={() => {
        setActiveTab(tab.name);
        if (isDropdown) setDropdownOpen(false);
      }}
      className={`flex items-center gap-2 px-1 py-1 ${
        activeTab === tab.name
          ? "text-purple-700 dark:text-white"
          : "text-gray-500 hover:text-purple-600 dark:text-neutral-400 dark:hover:text-white"
      } ${isDropdown ? "w-full" : ""}`}
    >
      {tab.icon}
      {tab.name}
    </button>
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-end px-5 pb-2 justify-between border-b border-purple-100 dark:border-purple-250 gap-3">
      <div>{header}</div>

      {/* TABS FOR LARGER SCREENS */}
      <TabsWrapper
        threshold={threshold}
        className="flex-1 justify-end items-end transform translate-y-2 gap-2"
      >
        {tabOptions.map((tab) => renderTabButton(tab))}
      </TabsWrapper>

      {/* DROPDOWN FOR SMALLER SCREENS */}
      <DropdownWrapper
        threshold={threshold}
        className="relative flex-1 justify-end"
        ref={dropdownRef}
      >
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center transform translate-y-1 text-purple-500 dark:text-white cursor-pointer hover:text-purple-250 dark:hover:text-purple-100 transition-colors duration-200"
        >
          Views
          <EllipsisVertical className="pl-2 translate-y-0.4" />
        </button>
        <div
          className={`translate-x-15 overflow-hidden transition-all duration-300 ease-in-out 
            origin-top-right absolute top-full mt-1 w-40 shadow-lg
            bg-white dark:bg-purple-700 border border-gray-300 dark:border-gray-600 z-10
            ${
              dropdownOpen
                ? "max-h-96 opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
            }`}
        >
          <ul>
            {tabOptions.map((tab) => (
              <li key={tab.name}>{renderTabButton(tab, true)}</li>
            ))}
          </ul>
        </div>
      </DropdownWrapper>

      {otherComponent}
    </div>
  );
};

export default Header;
