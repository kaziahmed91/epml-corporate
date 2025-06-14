// src/data/projects/index.ts
import { ProjectData } from "../types/project-types";
import fs from "fs";
import path from "path";

export async function getAllProjects(): Promise<ProjectData[]> {
  const projectsDir = path.join(__dirname, "./seeders/data/projects");
  const files = await fs.promises.readdir(projectsDir);
  const projects: ProjectData[] = [];

  for (const file of files) {
    if (file.endsWith(".json")) {
      const filePath = path.join(projectsDir, file);
      const content = await fs.promises.readFile(filePath, "utf8");
      const projectData = JSON.parse(content) as ProjectData;
      projects.push(projectData);
    }
  }

  return projects;
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectData | null> {
  const projects = await getAllProjects();
  return projects.find((p) => p.slug === slug) || null;
}

const equityAnirban =
  require("./seeders/data/projects/anirban.json") as ProjectData;
const azeezNeer =
  require("./seeders/data/projects/azeez-neer.json") as ProjectData;
// Add more projects as needed
// const equityMidcity = require('./equity-midcity.json') as ProjectData;
// const futureProject = require('./future-project.json') as ProjectData;

const projects: Record<string, ProjectData[]> = {
  development: [
    equityAnirban,
    azeezNeer,
    // equityMidcity,
    // futureProject
  ],
  staging: [
    equityAnirban,
    azeezNeer,
    // equityMidcity
  ],
  production: [equityAnirban, azeezNeer],
};

export const getProjectsForEnvironment = (
  env: string = "development",
): ProjectData[] => {
  return projects[env] || projects.development;
};

export const addProjectToEnvironment = (
  env: string,
  project: ProjectData,
): void => {
  if (!projects[env]) {
    projects[env] = [];
  }

  // Check if project already exists
  const existingIndex = projects[env].findIndex((p) => p.slug === project.slug);
  if (existingIndex >= 0) {
    projects[env][existingIndex] = project; // Update existing
  } else {
    projects[env].push(project); // Add new
  }
};
