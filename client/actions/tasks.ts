import { prisma } from "@/lib/prisma";

export const getTasks = async () => {
    try {
        const tasks = prisma.task.findMany()
    } catch (error) {
        
    }
};
