import Modal from "@/components/Modals/Modal";
import React, { useState } from "react";
import { formatISO } from "date-fns";
import { Priority, Status, useCreateTaskMutation } from "@/states/api";
import { statusBubbles, priorityBubbles } from "@/styles/TagColors";
import RedirectModal from "../RedirectModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  projectId: number;
  importedStatus?: string;
};

const NewTaskModal = ({
  isOpen,
  onClose,
  projectId,
  importedStatus,
}: Props) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const [name, setname] = useState("");
  const [description, setDescription] = useState("");

  const [status, setStatus] = useState<Status>(Status.ToDo);
  React.useEffect(() => {
    if (importedStatus) {
      setStatus(importedStatus as Status);
    }
  }, [importedStatus]);

  const [priority, setPriority] = useState<Priority>(Priority.Backlog);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");

  const [redirectId, setRedirectId] = useState<number | null>(null);
  const [isRedirectOpen, setIsRedirectOpen] = useState(false);

  const statusesToShow = importedStatus
    ? [importedStatus as Status]
    : (Object.keys(statusBubbles) as Status[]);

  console.log("before submission");
  console.log(status);

  const handleSubmit = async () => {
    if (!name || !description || !authorUserId) return;
    onClose();

    const today = formatISO(new Date(), { representation: "complete" });
    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedDueDate = formatISO(new Date(dueDate), {
      representation: "complete",
    });

    const newTask = await createTask({
      name,
      description,
      status,
      priority,
      tags,
      creationDate: today,
      startDate: formattedStartDate,
      dueDate: formattedDueDate,
      authorUserId: parseInt(authorUserId),
      assignedUserId: parseInt(assignedUserId),
      projectId: projectId,
    }).unwrap();

    if (newTask?.id) {
      setRedirectId(newTask.id);
      setIsRedirectOpen(true);
    }
    console.log(newTask.status);
  };

  const isFormValid = () => {
    return name && description && authorUserId;
  };

  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
        <form
          className="mt-4 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="text"
            className={inputStyles}
            placeholder="Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <textarea
            className={inputStyles}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Status Selector */}
          <div className="flex items-center gap-2">
            <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              Status
            </h3>
            <div
              className={`flex p-2 overflow-x-auto pb-2 ${importedStatus ? "pointer-events-none opacity-60" : ""}`}
            >
              {statusesToShow.map((s) => (
                <div
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`cursor-pointer rounded-full px-3 py-1 text-xs mx-1 font-semibold transition whitespace-nowrap flex-shrink-0 ${
                    status === s ? "ring-2 ring-purple-400" : ""
                  }`}
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

          {/* Priority Selector */}
          <div className="flex items-center gap-2">
            <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              Priority
            </h3>
            <div className="flex p-2 overflow-x-auto pb-2">
              {(Object.keys(priorityBubbles) as Priority[]).map((p) => (
                <div
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`cursor-pointer rounded-full px-3 py-1 text-xs mx-1 font-semibold transition 
                              whitespace-nowrap flex-shrink-0
                              ${priority === p ? "ring-2 ring-purple-400" : ""}`}
                  style={{
                    backgroundColor: priorityBubbles[p][1],
                    color: priorityBubbles[p][0],
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
          </div>

          <input
            type="text"
            className={inputStyles}
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
            <input
              type="date"
              className={inputStyles}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className={inputStyles}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <input
            type="text"
            className={inputStyles}
            placeholder="Author User ID"
            value={authorUserId}
            onChange={(e) => setAuthorUserId(e.target.value)}
          />
          <input
            type="text"
            className={inputStyles}
            placeholder="Assigned User ID"
            value={assignedUserId}
            onChange={(e) => setAssignedUserId(e.target.value)}
          />
          {/* Submit */}
          <button
            type="submit"
            className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent text-purple-700 dark:text-white bg-purple-100 dark:bg-purple-300 px-4 py-2 font-medium shadow-xl hover:bg-purple-200 dark:hover:bg-purple-400 focus:outline-none focus:ring-2 ${
              !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={!isFormValid() || isLoading}
          >
            <p>Create Task</p>
          </button>
        </form>
      </Modal>

      {redirectId && (
        <RedirectModal
          id={redirectId}
          isOpen={isRedirectOpen}
          onClose={() => {
            setIsRedirectOpen(false);
            setRedirectId(null);
          }}
          url={`/tasks/${redirectId}`}
          item="task"
        />
      )}
    </>
  );
};

export default NewTaskModal;
