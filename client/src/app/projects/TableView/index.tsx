import { useGetTasksQuery } from "@/states/api";
import { useAppSelector } from "@/states/store";
import { dataGridSxStyles } from "@/styles/dataGridStyle";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Plus } from "lucide-react";

type BoardProps = {
  projectId: number;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    // COLOR MATCHES STATUS TYPE
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 130,
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value?.author || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value?.assignee || "Unassigned",
  },
];

const Table = ({ projectId, setIsModalNewTaskOpen }: BoardProps) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: projectId });

  if (isLoading) return <div>Loading...</div>;
  if (error || !tasks) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="flex items-center justify-between pt-4 pb-5">
        <h1 className=" text-lg font-bold dark:text-white">Table </h1>
        <div className="flex items-center pr-2 dark:text-white">
          <button
            className="flex items-center rounded bg-purple-100 dark:bg-purple-200 px-1 py-1 mx-2 cursor-pointer dark:text-white hover:bg-purple-200 dark:hover:bg-purple-400"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            <Plus size={16} />
          </button>
          Add New Task
        </div>
      </div>
      <DataGrid
        rows={tasks || []}
        columns={columns}
        sx={dataGridSxStyles(isDarkMode)}
      />
    </div>
  );
};
export default Table;
