// src/data/projects/index.ts
import { ProjectData } from "../types/project-types";

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

export const getAllProjects = (): ProjectData[] => {
  return Object.values(projects)
    .flat()
    .reduce((unique: ProjectData[], project: ProjectData) => {
      if (!unique.find((p) => p.slug === project.slug)) {
        unique.push(project);
      }
      return unique;
    }, []);
};

export const getProjectBySlug = (slug: string): ProjectData | undefined => {
  const allProjects = getAllProjects();
  return allProjects.find((p) => p.slug === slug);
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
