import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getProjects, getRecentNews } from "@/api/queries";
import { getStrapiMedia } from "@/lib/strapi";

export const revalidate = 3600; // Revalidate this page every hour

export default async function Home() {
  // Fetch recent projects from Strapi (removed featured filter since field doesn't exist)
  const projects = await getProjects({}, "*");

  // If no projects are found, use a default set of projects
  const featuredProjects =
    projects.length > 0
      ? projects.slice(0, 3) // Limit to first 3 projects
      : [
          {
            id: 1,
            slug: "skyline-residences",
            title: "Skyline Residences",
            location: {
              name: "Downtown District",
            },
            type: {
              name: "Residential",
            },
            status: {
              name: "Ongoing",
            },
            featuredImage: {
              data: {
                attributes: {
                  url: "/landscape.jpg",
                },
              },
            },
            description: "Luxury apartments with panoramic city views.",
          },
          {
            id: 2,
            slug: "harbor-heights",
            title: "Harbor Heights",
            location: {
              name: "Waterfront Area",
            },
            type: {
              name: "Mixed Use",
            },
            status: {
              name: "Upcoming",
            },
            featuredImage: {
              data: {
                attributes: {
                  url: "/landscape.jpg",
                },
              },
            },
            description:
              "Modern living spaces with commercial outlets on the ground floor.",
          },
          {
            id: 3,
            slug: "green-valley",
            title: "Green Valley",
            location: {
              name: "Suburban District",
            },
            type: {
              name: "Residential",
            },
            status: {
              name: "Completed",
            },
            featuredImage: {
              data: {
                attributes: {
                  url: "/landscape.jpg",
                },
              },
            },
            description:
              "Eco-friendly residential community with extensive green spaces.",
          },
        ];

  // Fetch latest news from Strapi
  const news = await getRecentNews(2);

  // If no news articles are found, use default news data
  const latestNews =
    news && Array.isArray(news) && news?.length > 0
      ? news
      : [
          {
            id: 1,
            slug: "new-development-announced",
            title: "New Development Announced",
            publishedAt: "2025-05-15",
            excerpt:
              "EPML has announced plans for a new luxury development in the city center.",
            featuredImage: {
              data: {
                attributes: {
                  url: "/landscape.jpg",
                },
              },
            },
          },
          {
            id: 2,
            slug: "project-completion",
            title: "Project Completion Ahead of Schedule",
            publishedAt: "2025-05-10",
            excerpt:
              "The Green Valley development has been completed three months ahead of schedule.",
            featuredImage: {
              data: {
                attributes: {
                  url: "/landscape.jpg",
                },
              },
            },
          },
        ];
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full">
        <div className="absolute inset-0">
          <Image
            src="/landscape.jpg"
            alt="Modern real estate development"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center items-start h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Building Tomorrow's Communities Today
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Premium real estate developments focused on quality, sustainability,
            and community.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/projects">View Projects</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-white hover:bg-white/10"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <Button asChild variant="link">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <div className="h-60 w-full relative">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={
                        project.featuredImage?.data
                          ? getStrapiMedia(project.featuredImage) ||
                            "/landscape.jpg"
                          : "/landscape.jpg"
                      }
                      alt={project?.title || ""}
                      fill
                      className="object-cover"
                    />
                  </AspectRatio>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                      {project.status?.name || project.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {project.location?.name || "Location TBD"} •{" "}
                    {project.type?.name || "Residential"}
                  </p>
                  <p className="mb-4">{project.description}</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/projects/${project.slug}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About EPML Properties</h2>
              <p className="mb-4">
                EPML Properties is a premier real estate development company
                with over 15 years of experience in creating exceptional spaces
                for living, working, and leisure.
              </p>
              <p className="mb-4">
                Our developments are characterized by innovative design, quality
                construction, and a deep commitment to sustainability and
                community integration.
              </p>
              <p className="mb-6">
                From urban high-rises to suburban communities, we bring vision
                and expertise to every project we undertake.
              </p>
              <Button asChild>
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/landscape.jpg"
                alt="EPML Properties headquarters"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest News</h2>
            <Button asChild variant="link">
              <Link href="/news">View All News</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestNews.map((newsItem) => (
              <div
                key={newsItem.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row"
              >
                <div className="md:w-1/3 relative h-48 md:h-auto">
                  <Image
                    src={
                      newsItem.featuredImage?.data
                        ? getStrapiMedia(newsItem.featuredImage) ||
                          "/landscape.jpg"
                        : "/landscape.jpg"
                    }
                    alt={newsItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(newsItem.publishedAt).toLocaleDateString()}
                  </p>
                  <h3 className="text-xl font-semibold mb-2">
                    {newsItem.title}
                  </h3>
                  <p className="mb-4">{newsItem.excerpt}</p>
                  <Button asChild variant="link" className="p-0">
                    <Link href={`/news/${newsItem.slug}`}>Read More</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Browse our selection of premium properties or get in touch with our
            team to discuss your requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-900 hover:bg-gray-100"
            >
              <Link href="/projects">Browse Properties</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white hover:bg-white/10"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
