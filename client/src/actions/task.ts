"use server"

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const getTasks = async () => {
  
  try {
    const getAllTask = await prisma.task.findMany({
      where: {
        projectId: "proj-1",
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });

    console.log(getAllTask)

    if (!getAllTask)
      return { status: 404, message: "cannot get tasks at this moment" };

    return { status: 200, data: getAllTask };
  } catch (error) {
    return { status: 500, message: "Internal server error", data: [], error };
  }
};

export const createTask = async (formData: {
  title: string;
  description: string;
  status: string;
  priority: string;
  tags: string;
  startDate: Date;
  dueDate: Date;
  points: number;
  projectId: string;
  authorUserId: string;
  assignedUserId: string;
}) => {
  const session = await auth();
  if (!session) return { status: 401, message: "401 unauthorized" };

  try {
    const createTasks = await prisma.task.create({
      data: {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        tags: formData.tags,
        startDate: formData.startDate,
        dueDate: formData.dueDate,
        points: formData.points,
        projectId: formData.projectId,
        authorUserId: formData.authorUserId,
        assignedUserId: formData.assignedUserId,
      },
    });

    if (!createTasks)
      return { status: 404, message: "Cannot create Task at this moment" };

    return { status: 201, data: createTasks };
  } catch (error) {
    return { status: 500, message: "Internal server error", data: [], error };
  }
};

export const updateTask = async (taskId: string, status: string) => {
  const session = await auth();
  if (!session) return { status: 401, message: "401 unauthorized" };

  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status: status,
      },
    });

    if (!updatedTask) return {status: 404, message: "Cannot update Task at this moment"}

    return { status: 200, data: updatedTask, message: "Task updated Successfullly" };
  } catch (error) {
    return { status: 500, message: "Internal server error", data: [], error };
  }
};
