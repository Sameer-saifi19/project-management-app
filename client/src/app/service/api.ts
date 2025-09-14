import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getProjects } from "../../../actions/projects";

export interface Project {
  id: string;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export enum Status {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  teamId?: string;
}

export interface Attachment {
  id: string;
  fileUrl: string;
  filename: string;
  taskId: string;
  uploadedById: string;
}

export interface Task {
  title: string;
  description: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: string;
  projectId: string;
  authorUserId?: string;
  assignedUserId?: string;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "projects",
    }),
  }),
});

export const { useGetProjectsQuery } = api;
