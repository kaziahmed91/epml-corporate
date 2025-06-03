import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  getProjects,
  getProjectTypes,
  getProjectStatuses,
  getLocations,
} from "@/api/queries";
import { getStrapiMedia } from "@/lib/strapi";
import {
  filterData,
  projects as projectsDummyData,
} from "@/lib/data/projectsData"; // Fallback data
import LocationMap from "@/components/LocationMap/LocationMap";

export const revalidate = 3600; // Revalidate every hour

export default async function ProjectsPage() {
  // Fetch projects and filters data from Strapi API
  const projectsData = await getProjects({}, "*");
  const projectTypesData = await getProjectTypes();
  const projectStatusesData = await getProjectStatuses();
  const locationsData = await getLocations();

  // Use fallback data if API calls don't return results
  const projects = projectsData.length > 0 ? projectsData : projectsDummyData;
  const projectTypes =
    projectTypesData.length > 0 ? projectTypesData : filterData.projectTypes;
  const projectStatuses =
    projectStatusesData.length > 0
      ? projectStatusesData
      : filterData.projectStatuses;
  const locations =
    locationsData.length > 0 ? locationsData : filterData.locations;
  return (
    <main className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full">
        <div className="absolute inset-0">
          <Image
            src="/landscape.jpg"
            alt="EPML Properties Projects"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
          <p className="text-xl max-w-3xl">
            Explore our portfolio of premium developments across multiple
            locations
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">Filter Projects</h2>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="outline">
                <Link href="/projects/ongoing">Ongoing</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/projects/upcoming">Upcoming</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/projects/completed">Completed</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border">
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Type
              </label>
              <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border">
                <option value="">All Types</option>
                {projectTypes.map((type) => (
                  <option key={type.id} value={type.Type}>
                    {type.Type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border">
                <option value="">All Statuses</option>
                {projectStatuses.map((status) => (
                  <option key={status.id} value={status.Statuses}>
                    {status.Statuses}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">All Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative h-60 w-full">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={
                      project.photos?.length > 0
                        ? getStrapiMedia({ data: project.photos[0] }) ||
                          "/landscape.jpg"
                        : "/landscape.jpg"
                    }
                    alt={project.name || project.title}
                    fill
                    className="object-cover"
                  />
                </AspectRatio>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">
                    {project.name || project.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      (project.project_status?.Statuses || project.status) ===
                      "Completed"
                        ? "bg-green-100 text-green-800"
                        : (project.project_status?.Statuses ||
                            project.status) === "Ongoing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {project.project_status?.Statuses ||
                      project.status ||
                      "Unknown"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {project.location?.name || project.location || "Location TBD"}{" "}
                  •{" "}
                  {project.project_type?.Type || project.type || "Unknown Type"}
                </p>
                <p className="mb-4">{project.description}</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/projects/${project.slug || project.id}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Project Locations</h2>
          <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
            <LocationMap />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Find Your Perfect Property
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Can't find what you're looking for? Our team is here to help you
            find the perfect property for your needs.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-900 hover:bg-gray-100"
          >
            <Link href="/contact">Contact Our Team</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

// In a real application, this would be a Server Component
// using Next.js data fetching to get projects from the CMS
/*
export async function generateMetadata() {
  // Fetch necessary data for the metadata
  return {
    title: 'Projects | EPML Properties',
    description: 'Explore our portfolio of premium real estate developments.',
  };
}

async function getData() {
  // Fetch data from API
  const res = await fetch('https://api.example.com/projects', { next: { revalidate: 3600 } })
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
*/
