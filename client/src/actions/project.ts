"use server"

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const getProjects = async () => {
  try {
    const projects = await prisma.project.findMany();

    if (projects.length === 0) {
      return { status: 404, message: "No projects found" };
    }

    return { status: 200, data: projects };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal server error", data: [], error };
  }
};

export const createProject = async (formData: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}) => {
  const session = await auth();
  if (!session) return { status: 401, message: "401 unauthorized" };

  try {
    const createNewProject = await prisma.project.create({
      data: {
        name: formData.name,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
      },
    });

    if (!createNewProject)
      return { status: 404, message: "Cannot create project at this moment" };

    return { status: 201, data: createNewProject };
  } catch (error) {
    return { status: 500, message: "Internal server error", data: [], error };
  }
};
