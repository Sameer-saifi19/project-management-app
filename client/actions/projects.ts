import { prisma } from "@/lib/prisma";


export const getProjects = async () => {
  try {
    const projects = await prisma.project.findMany();

    if (projects.length === 0) {
      return { status: 404, message: "No projects found" };
    }

    return { status: 200, data: projects };
  } catch (error) {
    console.error(error)
    return { status: 500, message: "Internal server error",data: [], error };
  }
};

type projectCreationData = {
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
}


export const createProject = async ({
  name,
  description,
  startDate,
  endDate,
}: projectCreationData ) => {
  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,  
      },
    });

    return { status: 201, data: newProject }; 
  } catch (error) {
    return { status: 500, message: "Internal server error", error };
  }
};

