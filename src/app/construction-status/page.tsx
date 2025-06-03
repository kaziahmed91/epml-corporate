import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data/projectsData";

export default function ConstructionStatusPage() {
  // Filter only ongoing and upcoming projects
  const activeProjects = projects.filter(
    (project) => project.status === "Ongoing" || project.status === "Upcoming"
  );

  // In a real app, we would fetch construction updates from an API
  // const { data: constructionUpdates } = useQuery(['constructionUpdates'], fetchConstructionUpdates)

  return (
    <main className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full">
        <div className="absolute inset-0">
          <Image
            src="/landscape.jpg"
            alt="Construction Progress"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Construction Status
          </h1>
          <p className="text-xl max-w-3xl">
            Track the progress of our ongoing development projects
          </p>
        </div>
      </section>

      {/* Project Progress Tracker */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Current Project Progress</h2>

        {activeProjects.length > 0 ? (
          <div className="space-y-10">
            {activeProjects.map((project) => {
              // For this example, we'll generate a random construction progress if not defined
              const progress =
                project.status === "Upcoming"
                  ? 0
                  : Math.round(Math.random() * 100);

              // Calculate milestone dates based on start and completion dates
              const startDate = new Date(project.startDate);
              const completionDate = new Date(project.completionDate);
              const totalDays =
                (completionDate.getTime() - startDate.getTime()) /
                (1000 * 3600 * 24);

              const foundation = new Date(startDate);
              foundation.setDate(
                foundation.getDate() + Math.round(totalDays * 0.2)
              );

              const structure = new Date(startDate);
              structure.setDate(
                structure.getDate() + Math.round(totalDays * 0.5)
              );

              const interior = new Date(startDate);
              interior.setDate(
                interior.getDate() + Math.round(totalDays * 0.8)
              );

              return (
                <div
                  key={project.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center mb-2">
                        <h3 className="text-2xl font-bold mr-3">
                          {project.title}
                        </h3>
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-full ${
                            project.status === "Ongoing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <p className="text-gray-600">
                        {project.location}, {project.city}
                      </p>
                    </div>
                    <Button asChild variant="outline" className="mt-4 md:mt-0">
                      <Link href={`/projects/${project.slug}`}>
                        View Project
                      </Link>
                    </Button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        Construction Progress
                      </span>
                      <span className="text-sm font-medium">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mt-8 relative">
                    <div className="absolute left-0 top-0 w-0.5 bg-gray-200 h-full ml-6"></div>

                    <div className="mb-8 pl-14 relative">
                      <div
                        className={`absolute left-0 top-0 w-3 h-3 rounded-full mt-1.5 border-2 ${
                          progress >= 0
                            ? "border-blue-600 bg-blue-100"
                            : "border-gray-300 bg-white"
                        }`}
                      ></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div className="mb-2 sm:mb-0">
                          <h4 className="text-lg font-semibold">
                            Project Start
                          </h4>
                          <p>Site preparation and groundbreaking</p>
                        </div>
                        <time
                          className={`sm:text-right ${
                            progress >= 0
                              ? "text-blue-600 font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          {startDate.toLocaleDateString()}
                        </time>
                      </div>
                    </div>

                    <div className="mb-8 pl-14 relative">
                      <div
                        className={`absolute left-0 top-0 w-3 h-3 rounded-full mt-1.5 border-2 ${
                          progress >= 20
                            ? "border-blue-600 bg-blue-100"
                            : "border-gray-300 bg-white"
                        }`}
                      ></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div className="mb-2 sm:mb-0">
                          <h4 className="text-lg font-semibold">
                            Foundation Complete
                          </h4>
                          <p>Foundation work and underground utilities</p>
                        </div>
                        <time
                          className={`sm:text-right ${
                            progress >= 20
                              ? "text-blue-600 font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          {foundation.toLocaleDateString()}
                        </time>
                      </div>
                    </div>

                    <div className="mb-8 pl-14 relative">
                      <div
                        className={`absolute left-0 top-0 w-3 h-3 rounded-full mt-1.5 border-2 ${
                          progress >= 50
                            ? "border-blue-600 bg-blue-100"
                            : "border-gray-300 bg-white"
                        }`}
                      ></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div className="mb-2 sm:mb-0">
                          <h4 className="text-lg font-semibold">
                            Structure Complete
                          </h4>
                          <p>Main structure and exterior walls</p>
                        </div>
                        <time
                          className={`sm:text-right ${
                            progress >= 50
                              ? "text-blue-600 font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          {structure.toLocaleDateString()}
                        </time>
                      </div>
                    </div>

                    <div className="mb-8 pl-14 relative">
                      <div
                        className={`absolute left-0 top-0 w-3 h-3 rounded-full mt-1.5 border-2 ${
                          progress >= 80
                            ? "border-blue-600 bg-blue-100"
                            : "border-gray-300 bg-white"
                        }`}
                      ></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div className="mb-2 sm:mb-0">
                          <h4 className="text-lg font-semibold">
                            Interior Work
                          </h4>
                          <p>Interior finishes and fixtures</p>
                        </div>
                        <time
                          className={`sm:text-right ${
                            progress >= 80
                              ? "text-blue-600 font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          {interior.toLocaleDateString()}
                        </time>
                      </div>
                    </div>

                    <div className="pl-14 relative">
                      <div
                        className={`absolute left-0 top-0 w-3 h-3 rounded-full mt-1.5 border-2 ${
                          progress >= 100
                            ? "border-blue-600 bg-blue-100"
                            : "border-gray-300 bg-white"
                        }`}
                      ></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div className="mb-2 sm:mb-0">
                          <h4 className="text-lg font-semibold">
                            Project Completion
                          </h4>
                          <p>Final inspections and handover</p>
                        </div>
                        <time
                          className={`sm:text-right ${
                            progress >= 100
                              ? "text-blue-600 font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          {completionDate.toLocaleDateString()}
                        </time>
                      </div>
                    </div>
                  </div>

                  {/* Recent Updates */}
                  <div className="mt-10">
                    <h4 className="text-xl font-semibold mb-4">
                      Recent Updates
                    </h4>
                    <div className="space-y-4">
                      {project.status === "Ongoing" ? (
                        <>
                          <div className="bg-gray-50 p-4 rounded-md">
                            <div className="flex justify-between mb-2">
                              <span className="font-medium">
                                Milestone Achieved
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date().toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-600">
                              {progress > 80
                                ? "Interior finishing work is progressing well. Flooring installation is complete and cabinetry installation has begun."
                                : progress > 50
                                ? "Exterior cladding has been completed. Window installation is 90% complete."
                                : progress > 20
                                ? "Structural framework is now complete. Roof installation has begun."
                                : "Foundation work has been completed. Steel framework installation has begun."}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-md">
                            <div className="flex justify-between mb-2">
                              <span className="font-medium">
                                Construction Update
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(
                                  Date.now() - 7 * 24 * 60 * 60 * 1000
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-600">
                              {progress > 80
                                ? "Electrical and plumbing fixtures installation is progressing according to schedule."
                                : progress > 50
                                ? "HVAC system installation is underway. Electrical wiring is 75% complete."
                                : progress > 20
                                ? "Plumbing rough-in work has commenced. Electrical conduit installation is in progress."
                                : "Concrete pouring for the ground floor has been completed successfully."}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="bg-gray-50 p-4 rounded-md">
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">
                              Project Announcement
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date().toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-600">
                            We're excited to announce that {project.title} has
                            received all necessary approvals. Construction is
                            scheduled to begin on{" "}
                            {new Date(project.startDate).toLocaleDateString()}.
                            Stay tuned for regular updates on the construction
                            progress.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-2">No active projects</h3>
            <p className="text-gray-600 mb-4">
              There are currently no ongoing or upcoming projects to display.
            </p>
            <Button asChild>
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        )}
      </section>

      {/* Construction Process */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Our Construction Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Planning & Design</h3>
              <p className="text-gray-600">
                Detailed architectural plans, engineering designs, and permits
                are prepared before construction begins.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Site Preparation</h3>
              <p className="text-gray-600">
                The site is cleared, graded, and utilities are installed.
                Foundation work begins.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Construction</h3>
              <p className="text-gray-600">
                The main structure is built, followed by exterior finishes,
                roofing, and internal systems.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Completion</h3>
              <p className="text-gray-600">
                Final touches, inspections, landscaping, and preparation for
                occupancy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Quality Standards</h2>
            <p className="mb-4">
              At EPML Properties, we maintain the highest standards of
              construction quality and safety on all our projects. Our
              developments are built to last, with attention to every detail.
            </p>
            <p className="mb-4">
              We work with trusted contractors and suppliers who share our
              commitment to excellence. Our construction teams follow rigorous
              quality control processes, with regular inspections at every
              stage.
            </p>
            <p className="mb-4">
              We prioritize sustainable construction practices, minimizing waste
              and environmental impact while maximizing energy efficiency and
              resource conservation.
            </p>
            <ul className="mt-6 space-y-2">
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Regular quality inspections by independent experts
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Use of premium materials and fixtures
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Strict adherence to building codes and regulations
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Industry-leading safety protocols
              </li>
            </ul>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/landscape.jpg"
              alt="Construction quality control"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Questions About Our Construction Process?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our team is ready to provide detailed information about any of our
            ongoing or upcoming projects.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-900 hover:bg-gray-100"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

// In a real application, this would be a Server Component
// using Next.js data fetching to get construction status data from the CMS
/*
export async function generateMetadata() {
  // Fetch necessary data for the metadata
  return {
    title: 'Construction Status | EPML Properties',
    description: 'Track the progress of our ongoing real estate development projects.',
  };
}

async function getData() {
  // Fetch data from API
  const res = await fetch('https://api.example.com/construction-status', { next: { revalidate: 3600 } })
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
*/
