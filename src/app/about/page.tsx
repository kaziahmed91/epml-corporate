import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  // Company information - in a real app, this would be fetched from a CMS
  const companyInfo = {
    founded: "2010",
    projects: "20+",
    employees: "150+",
    locations: "5 cities",
    mission:
      "To create exceptional living and working environments that enhance communities and provide lasting value.",
    vision:
      "To be the most trusted and innovative real estate developer in our markets, known for quality, sustainability, and community engagement.",
  };

  // Team members - in a real app, this would be fetched from a CMS
  const teamMembers = [
    {
      name: "Robert Taylor",
      position: "CEO",
      image: "/landscape.jpg",
      bio: "With over 25 years in real estate development, Robert has led the company from its founding to become a regional leader in sustainable development.",
    },
    {
      name: "Jennifer Martinez",
      position: "COO",
      image: "/landscape.jpg",
      bio: "Jennifer brings 20 years of operational excellence to EPML, ensuring our projects are delivered on time, within budget, and to the highest standards.",
    },
    {
      name: "Michael Chen",
      position: "CFO",
      image: "/landscape.jpg",
      bio: "Michaels financial expertise has been instrumental in securing funding for our ambitious projects and delivering strong returns for our investors.",
    },
    {
      name: "Maria Rodriguez",
      position: "Community Relations Director",
      image: "/landscape.jpg",
      bio: "Maria ensures our developments positively impact the communities where we build, fostering strong relationships with local stakeholders.",
    },
  ];

  return (
    <main className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full">
        <div className="absolute inset-0">
          <Image
            src="/landscape.jpg"
            alt="EPML Properties Headquarters"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About EPML Properties
          </h1>
          <p className="text-xl max-w-3xl">
            Building exceptional spaces and communities since 2010
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="mb-4">
              EPML Properties was founded in 2010 with a vision to create
              exceptional spaces where people can live, work, and thrive. What
              began as a small team with big ideas has grown into one of the
              region&apos;s most respected real estate development companies.
            </p>
            <p className="mb-4">
              Our approach combines innovative design, quality construction, and
              a deep commitment to sustainability and community integration. We
              believe that successful developments must not only meet the needs
              of their occupants but also enhance the broader communities in
              which they exist.
            </p>
            <p className="mb-4">
              Over the years, we&apos;ve completed more than 20 projects across
              5 cities, ranging from luxury residential buildings to commercial
              complexes and mixed-use developments. Each project reflects our
              dedication to excellence and our responsibility as community
              builders.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(companyInfo)
              .slice(0, 4)
              .map(([key, value]) => (
                <div
                  key={key}
                  className="bg-gray-50 p-6 rounded-lg text-center"
                >
                  <div className="text-3xl font-bold text-blue-600">
                    {value}
                  </div>
                  <div className="text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p>{companyInfo.mission}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p>{companyInfo.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 text-center">
            <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-8 w-8 text-blue-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality</h3>
            <p className="text-gray-600">
              We are committed to excellence in design, materials, and
              construction in every project we undertake.
            </p>
          </div>
          <div className="p-6 text-center">
            <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-8 w-8 text-green-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p className="text-gray-600">
              We develop properties with environmental responsibility and
              long-term sustainability in mind.
            </p>
          </div>
          <div className="p-6 text-center">
            <div className="bg-purple-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-8 w-8 text-purple-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">
              We build with the broader community in mind, creating spaces that
              enhance neighborhoods and foster connection.
            </p>
          </div>
          <div className="p-6 text-center">
            <div className="bg-amber-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-8 w-8 text-amber-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              We embrace new ideas, technologies, and approaches to create
              better living and working environments.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.position}
                  </p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Work With Us</h2>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Whether you&apos;re looking for your next home, an investment
          opportunity, or a partnership with EPML Properties, we&apos;d love to
          hear from you.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/projects">View Our Projects</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
