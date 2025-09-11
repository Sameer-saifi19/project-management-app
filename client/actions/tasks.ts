import { prisma } from "@/lib/prisma";

export const getTasks = async (projectId: string) => {
  if (!projectId) throw new Error("Missing projectId");

  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        author: true,
        assignee: true,
        attachments: true,
        comments: true,
      },
    });

    if (!tasks || tasks.length === 0) {
      return { status: 404, message: "No tasks found" };
    }

    return { status: 200, data: tasks };
  } catch (error) {
    return { status: 500, message: "Internal server error", data: [], error };
  }
};

type createDataType = {
  title: string;
  description: string;
  status?: string;
  priority?: string;
  tags?: string;
  startDate?: Date;
  endDate?: Date;
  points?: number;
  pojectId: string;
  authorUserId: string;
  assignedUserId: string;
};

export const createTask = async ({
  title,
  description,
  status,
  priority,
  tags,
  startDate,
  endDate,
  points,
  pojectId,
  authorUserId,
  assignedUserId,
}: createDataType) => {
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        endDate,
        points,
        pojectId,
        authorUserId,
        assignedUserId,
      },
    });

    if (!newTask) {
      return { status: 404, message: "cannot create task at this moment" };
    }

    return { status: 201, data: newTask };
  } catch (error) {
    return { status: 500, message: "Something went wrong", data: [], error };
  }
};


