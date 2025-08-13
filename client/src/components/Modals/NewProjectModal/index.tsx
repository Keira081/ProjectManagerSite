import Modal from "@/components/Modal";
import React, { useState } from "react";
import { formatISO } from "date-fns";
import { Priority, Status, useCreateProjectMutation } from "@/states/api";
import { statusBubbles, priorityBubbles } from "@/styles/TagColors";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const NewProjectModal = ({ isOpen, onClose }: Props) => {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = async () => {
    if (!projectName || !startDate || !dueDate) return;

    onClose();

    await new Promise((resolve) => setTimeout(resolve, 50));

    const today = formatISO(new Date(), { representation: "complete" });

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formatteddueDate = formatISO(new Date(dueDate), {
      representation: "complete",
    });

    await createProject({
      name: projectName,
      description,
      creationDate: today,
      startDate: formattedStartDate,
      dueDate: formatteddueDate,
      status,
    });
  };

  const isFormValid = () => {
    return projectName && description && startDate && dueDate;
  };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Project Name */}
        <input
          type="text"
          className={inputStyles}
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        {/* Description */}
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* Dates */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={`${inputStyles}`}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={`${inputStyles}`}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        {/* Status Selector */}
        <div className="flex items-center gap-2">
          <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Status
          </h3>
          <div className="flex p-2 overflow-x-auto pb-2">
            {(Object.keys(statusBubbles) as Status[]).map((s) => (
              <div
                key={s}
                onClick={() => setStatus(s)}
                className={`cursor-pointer rounded-full px-3 py-1 text-xs mx-1 font-semibold transition 
                    whitespace-nowrap flex-shrink-0
                    ${status === s ? "ring-2 ring-purple-400" : ""}`}
                style={{
                  backgroundColor: statusBubbles[s][1],
                  color: statusBubbles[s][0],
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
        {/* Submit */}
        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent text-purple-700 dark:text-white bg-purple-100 dark:bg-purple-300 px-4 py-2 font-medium shadow-xl hover:bg-purple-200 dark:hover:bg-purple-400 focus:outline-none focus:ring-2 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </Modal>
  );
};

export default NewProjectModal;
