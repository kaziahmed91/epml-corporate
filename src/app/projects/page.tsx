import React from "react";
import {
  getProjects,
  getProjectTypes,
  getProjectStatuses,
  getLocations,
} from "@/lib/api/queries";
import {
  filterData,
  projects as projectsDummyData,
} from "@/lib/data/projectsData"; // Fallback data
import { ProjectsPageClient } from "./ProjectsPageClient";
import type { 
  Project, 
  ProjectType, 
  ProjectStatus, 
  Location,
  PageProps 
} from '@/types';

export const revalidate = 3600; // Revalidate every hour

export default async function ProjectsPage(): Promise<JSX.Element> {
  // Fetch projects and filters data from Strapi API with full population
  const projectsData: Project[] = await getProjects({}, "*");
  const projectTypesData: ProjectType[] = await getProjectTypes();
  const projectStatusesData: ProjectStatus[] = await getProjectStatuses();
  const locationsData: Location[] = await getLocations();

  // Use fallback data if API calls don't return results
  const allProjects: Project[] = projectsData.length > 0 ? projectsData : projectsDummyData;
  const projectTypes: ProjectType[] =
    projectTypesData.length > 0 ? projectTypesData : filterData.projectTypes;
  const projectStatuses: ProjectStatus[] =
    projectStatusesData.length > 0
      ? projectStatusesData
      : filterData.projectStatuses;
  const locations: Location[] =
    locationsData.length > 0 ? locationsData : filterData.locations;

  return <ProjectsPageClient 
    allProjects={allProjects}
    projectTypes={projectTypes}
    projectStatuses={projectStatuses}
    locations={locations}
  />;
}