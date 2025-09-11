import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedModel(fileName: string, modelName: string) {
  const filePath = path.join(__dirname, "seedData", fileName);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${fileName}, skipping...`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  for (const item of data) {
    await (prisma as any)[modelName].create({ data: item });
  }
  console.log(`Seeded ${modelName}`);
}

async function main() {
  try {
    // Delete existing data in order (children first)
    await prisma.comment.deleteMany();
    await prisma.attachment.deleteMany();
    await prisma.taskAssignment.deleteMany();
    await prisma.task.deleteMany();
    await prisma.projectTeam.deleteMany();
    await prisma.project.deleteMany();
    await prisma.user.deleteMany();
    await prisma.team.deleteMany();

    // Seed data in order (parents first)
    await seedModel("team.json", "team");
    await seedModel("user.json", "user");
    await seedModel("project.json", "project");
    await seedModel("projectTeam.json", "projectTeam");
    await seedModel("task.json", "task");
    await seedModel("taskAssignment.json", "taskAssignment");
    await seedModel("attachment.json", "attachment");
    await seedModel("comment.json", "comment");

    console.log("✅ Database seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
