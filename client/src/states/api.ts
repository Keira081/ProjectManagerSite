import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // /react allows for added features lie exporting in such a way {at the bottom}

export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

export enum Status {
  ToDo = "To Do",
  InProgress = "In Progress",
  UnderReview = "In Review",
  Postponed = "Postponed",
  Completed = "Completed",
}

export interface User {
  userId?: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId: string;
  teamId?: number;
}

export interface Attachment {
  id: number;
  fileURL: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}
export interface Group {
  id: number;
  name: string;
}
export interface Project {
  id: number;
  name: string;
  description: string;
  creationDate: string;
  startDate?: string;
  dueDate?: string;
  dateFinished?: string;
  datePostponed?: string;
  status?: string;

  groupAssigned: Group;
}

export interface Task {
  id: number;
  name: string;
  description?: string;
  status?: string;
  priority?: string;
  tags?: string;
  creationDate: string;
  startDate?: string;
  dueDate?: string;
  dateFinished?: string;
  datePostponed?: string;
  projectId: number;
  authorUserId: number;
  assignedUserId?: number;
  points?: number;

  author: User;
  assignee: User;
  attachments: Attachment[];
  comments: Comment[];
}

export interface Team {
  teamId: number;
  teamName: string;
  teamOwnerUserId?: number;
}

export interface SearchResults {
  tasks?: Task[];
  projects?: Project[];
  users?: User[];
  teams?: Team[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    prepareHeaders: (headers) => {
      console.log("BASE URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
      return headers;
    },
  }),

  reducerPath: "api",
  tagTypes: ["Projects", "Tasks", "Users", "Teams", "Groups"], //point of tags and invalidating or providng them
  endpoints: (build) => ({
    // SEARCH ENDPOINT
    search: build.query<SearchResults, string>({
      query: (query) => `search?query=${query}`,
    }),

    // PROJECT ENDPOINTS
    getProjects: build.query<Project[], void>({
      query: () => "/projects",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Projects" as const, id })),
              { type: "Projects", id: "LIST" },
            ]
          : [{ type: "Projects", id: "LIST" }],
    }),
    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "/projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: [{ type: "Projects", id: "LIST" }], // triggers getProjects refetch
    }),
    getProjectById: build.query<Project, { id: number }>({
      query: ({ id }) => `/projects?id=${id}`,
      providesTags: (result, error, { id }) => [{ type: "Projects", id }],
    }),
    deleteProject: build.mutation<{ message: string }, { id: number }>({
      query: ({ id }) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Projects", id }, // invalidate specific project
        { type: "Projects", id: "LIST" }, // invalidate the list
      ],
    }),

    //TASK ENDPOINTS
    getTasks: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`, //single values need {} to stay in json format
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }], //make sense of this
    }),
    getTaskById: build.query<Task, { id: number }>({
      query: ({ id }) => `/tasks?id=${id}`,
      providesTags: (result, error, { id }) => [{ type: "Tasks", id }],
    }),
    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
      query: ({ taskId, status }) => ({
        url: `/tasks/${taskId}/status`,
        method: "PATCH",
        body: { status }, //diff between status and { status }
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ], //make sense of this
    }),
    deleteTasks: build.mutation<{ message: string }, { id: number }>({
      query: ({ id }) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    //USER ENDPOINTS
    getUsers: build.query<User[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),
    //TEAM ENDPOINT
    getTeams: build.query<Team[], void>({
      query: () => "teams",
      providesTags: ["Teams"],
    }),
  }),
});

export const {
  useSearchQuery,
  useGetProjectsQuery, //"Query" is associated with GET commands
  useGetProjectByIdQuery,
  useCreateProjectMutation, //"Mutation" is associated with POST commands...and I assume any command that changes the data in some way
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  useDeleteProjectMutation,
  useDeleteTasksMutation,
  useGetTaskByIdQuery,
  useGetTeamsQuery,
  useGetUsersQuery,
} = api;
