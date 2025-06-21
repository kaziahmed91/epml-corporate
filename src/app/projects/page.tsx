import React from "react";
import {
  getProjects,
  getProjectTypes,
  getProjectStatuses,
  getLocations,
} from "@/api/queries";
import {
  filterData,
  projects as projectsDummyData,
} from "@/lib/data/projectsData"; // Fallback data
import { ProjectsPageClient } from "./ProjectsPageClient";

export const revalidate = 3600; // Revalidate every hour

export default async function ProjectsPage() {
  // Fetch projects and filters data from Strapi API with full population
  const projectsData = await getProjects({}, "*");
  const projectTypesData = await getProjectTypes();
  const projectStatusesData = await getProjectStatuses();
  const locationsData = await getLocations();


  // Use fallback data if API calls don't return results
  const allProjects = projectsData.length > 0 ? projectsData : projectsDummyData;
  const projectTypes =
    projectTypesData.length > 0 ? projectTypesData : filterData.projectTypes;
  const projectStatuses =
    projectStatusesData.length > 0
      ? projectStatusesData
      : filterData.projectStatuses;
  const locations =
    locationsData.length > 0 ? locationsData : filterData.locations;

  return <ProjectsPageClient 
    allProjects={allProjects}
    projectTypes={projectTypes}
    projectStatuses={projectStatuses}
    locations={locations}
  />;
}