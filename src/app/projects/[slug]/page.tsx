import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getProject } from '@/api/queries';
import { getStrapiMedia } from '@/lib/strapi';
import { projectsDetail } from '@/lib/data/projectsData'; // Fallback data

// Defining types for our props
type ProjectDetailPageProps = {
  params: { slug: string };
};

// Set revalidation period
export const revalidate = 3600; // Revalidate every hour

// Generate static params for all projects at build time
export async function generateStaticParams() {
  // In a real implementation, we would fetch all project slugs from the API
  // For now, just return the slugs of our dummy data
  return Object.keys(projectsDetail).map((slug) => ({
    slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const projectData = await getProject(params.slug);
  const project = projectData || projectsDetail[params.slug as keyof typeof projectsDetail];
  
  return {
    title: `${project.title} | EPML Properties`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  // Fetch project data from Strapi API using the slug
  const projectData = await getProject(params.slug);
  
  // Fall back to static data if API call fails or returns no data
  const project = projectData || projectsDetail[params.slug as keyof typeof projectsDetail];

  // If project doesn't exist, handle gracefully
  if (!project) {
    return <div className="min-h-screen flex items-center justify-center">Project not found</div>;
  }

  return (
    <main className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full">
        <div className="absolute inset-0">
          <Image 
            src={project.featuredImage?.data ? getStrapiMedia(project.featuredImage) : (project.mainImage || '/landscape.jpg')}
            alt={project.title} 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white pb-12">
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
              (project.status?.name || project.status) === 'Completed' ? 'bg-green-500' :
              (project.status?.name || project.status) === 'Ongoing' ? 'bg-blue-500' :
              'bg-amber-500'
            }`}>
              {project.status?.name || project.status}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {project.title}
          </h1>
          <p className="text-xl max-w-3xl mb-2">
            {project.description}
          </p>
          <p className="text-lg opacity-90">
            {project.location?.name || project.location}, {project.city?.name || project.city}
          </p>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500">Project Type</div>
              <div className="font-semibold">{project.type?.name || project.type}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500">Start Date</div>
              <div className="font-semibold">
                {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'TBD'}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500">Completion Date</div>
              <div className="font-semibold">
                {project.endDate ? new Date(project.endDate).toLocaleDateString() : 
                (project.completionDate ? new Date(project.completionDate).toLocaleDateString() : 'TBD')}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500">Total Units</div>
              <div className="font-semibold">{project.totalUnits || 
                (project.unitTypes ? project.unitTypes.reduce((acc, unit) => acc + (unit.available || 0), 0) : 'N/A')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Project Details */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">About This Development</h2>
            <div className="prose prose-lg max-w-none">
              {project.content ? (
                <div dangerouslySetInnerHTML={{ __html: project.content }} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: project.longDescription }} />
              )}
            </div>

            {/* Gallery */}
            <h3 className="text-2xl font-bold mt-12 mb-6">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.gallery?.data ? (
                // Strapi data structure
                project.gallery.data.map((image, index) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                    <Image 
                      src={getStrapiMedia({ data: image }) || '/landscape.jpg'} 
                      alt={`${project.title} - Image ${index + 1}`} 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))
              ) : (
                // Fallback data structure
                (project.galleryImages || []).map((image, index) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                    <Image 
                      src={image} 
                      alt={`${project.title} - Image ${index + 1}`} 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))
              )}
            </div>

            {/* Features & Amenities */}
            <h3 className="text-2xl font-bold mt-12 mb-6">Features & Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h4 className="text-xl font-semibold mb-4">Key Features</h4>
                <ul className="space-y-2">
                  {(project.amenities || project.features || []).map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">Nearby Attractions</h4>
                <ul className="space-y-2">
                  {(project.nearbyAttractions || []).map((attraction, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {attraction}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Construction Progress - Only show if not completed */}
            {(project.status?.name || project.status) !== 'Completed' && (
              <>
                <h3 className="text-2xl font-bold mt-12 mb-6">Construction Progress</h3>
                <div className="bg-gray-200 h-4 rounded-full overflow-hidden mb-2">
                  <div 
                    className="bg-blue-600 h-full rounded-full" 
                    style={{ width: `${project.constructionProgress || 50}%` }}
                  ></div>
                </div>
                <p className="text-gray-600 mb-12">{project.constructionProgress || 50}% Complete</p>
              </>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md sticky top-24">
              {/* Project Info */}
              <h3 className="text-xl font-bold mb-4">Project Information</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Developer:</span>
                  <span className="font-medium">{project.developer || 'EPML Properties'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Architect:</span>
                  <span className="font-medium">{project.architect || 'EPML Design Studio'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium">{project.status?.name || project.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">
                    {project.location?.name || project.location}, 
                    {project.city?.name || project.city}
                  </span>
                </div>
              </div>

              {/* Unit Types */}
              <h3 className="text-xl font-bold mb-4">Available Units</h3>
              <div className="space-y-4 mb-6">
                {(project.unitTypes || []).map((unit, index) => (
                  <div key={index} className="p-4 bg-white rounded-md shadow-sm">
                    <div className="font-semibold mb-1">{unit.name || unit.type}</div>
                    <div className="text-sm text-gray-600 mb-1">
                      Size: {unit.area ? `${unit.area}m²` : unit.size}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Price: {unit.price ? `$${unit.price.toLocaleString()}` : unit.priceRange}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {unit.bedrooms && <span>Bed: {unit.bedrooms} | </span>}
                        {unit.bathrooms && <span>Bath: {unit.bathrooms} | </span>}
                        Available: <span className="text-blue-600">{unit.available || 'Limited'}</span>
                      </span>
                      <Button size="sm" variant="outline">Inquire</Button>
                    </div>
                  </div>
                ))}
                
                {/* If no unitTypes data is available, show a default message */}
                {(!project.unitTypes || project.unitTypes.length === 0) && (
                  <div className="p-4 bg-white rounded-md shadow-sm">
                    <div className="text-center text-gray-600">
                      Contact us for unit availability and pricing information
                    </div>
                    <div className="mt-4 text-center">
                      <Button asChild size="sm">
                        <Link href="/contact">Contact Sales Team</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{project.contactEmail || 'sales@epmlproperties.com'}</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{project.contactPhone || '+1 (555) 123-4567'}</span>
                </div>
              </div>

              <Button asChild className="w-full">
                <Link href="/contact?project=${project.title}">Schedule a Viewing</Link>
              </Button>
              
              {project.brochureUrl && (
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full mt-3"
                >
                  <a href={project.brochureUrl} target="_blank" rel="noopener noreferrer">
                    Download Brochure
                  </a>
                </Button>
              )}
              
              {!project.brochureUrl && project.floorPlanUrl && (
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full mt-3"
                >
                  <a href={project.floorPlanUrl} target="_blank" rel="noopener noreferrer">
                    View Floor Plans
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in this project?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact our sales team for more information or to schedule a personal consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
              <Link href="/contact">Contact Sales Team</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white hover:bg-white/10">
              <Link href="/projects">View Other Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

// In a real application, this would use getStaticPaths to pre-render all project pages
/*
export async function generateStaticParams() {
  // Fetch all project slugs
  const projects = await fetch('https://api.example.com/projects').then(res => res.json())
  
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  // Fetch project data
  const project = await fetch(`https://api.example.com/projects/${params.slug}`).then(res => res.json())
  
  return {
    title: `${project.title} | EPML Properties`,
    description: project.description,
  }
}
*/