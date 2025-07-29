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
  WorkInProgress = "In Progress",
  UnderReview = "Under Review",
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

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks", "Groups"], //point of tags and invalidating or providng them
  endpoints: (build) => ({
    // PROJECT ENDPOINTS
    getProjects: build.query<Project[], void>({
      query: () => "/projects",
      //Attaches '/projcets' to base url ^
      providesTags: ["Projects"],
    }),
    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "/projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),
    //TASK ENDPOINTS
    getTasks: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`, //single values need {} to stay in json format
      // "projectId" is a param in the URL we pass in
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }], //make sense of this
    }),
    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTaskStatus: build.mutation<Task, { taskId: number; status: number }>({
      query: ({ taskId, status }) => ({
        //needed to place vars in {} to work
        url: `/tasks/${taskId}/status`,
        method: "PATCH",
        body: { status }, //diff between status and { status }
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ], //make sense of this
    }),
  }),
});

export const {
  useGetProjectsQuery, //"Query" is associated with GET commands
  useCreateProjectMutation, //"Mutation" is associated with POST commands...and I assume any command that changes the data in some way
  useGetTasksQuery,
  useCreateTaskMutation,
} = api;