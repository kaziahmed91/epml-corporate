import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { careers } from '@/lib/data/careersData';

// Function to group careers by department
const groupByDepartment = (jobs: typeof careers) => {
  return jobs.reduce((acc, job) => {
    const { department } = job;
    if (!acc[department]) {
      acc[department] = [];
    }
    acc[department].push(job);
    return acc;
  }, {} as Record<string, typeof careers>);
};

export default function CareersPage() {
  // In a real app, this would fetch careers data from an API
  // const { data: careers } = useQuery(['careers'], fetchCareers)
  
  const careersByDepartment = groupByDepartment(careers);
  
  return (
    <main className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full">
        <div className="absolute inset-0">
          <Image 
            src="/landscape.jpg" 
            alt="Careers at EPML Properties" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Careers at EPML Properties
          </h1>
          <p className="text-xl max-w-3xl">
            Join our team and help build the communities of tomorrow
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why Join EPML Properties</h2>
            <p className="mb-4">
              At EPML Properties, we're more than just a real estate developer. We're a team of passionate professionals dedicated to creating exceptional spaces and vibrant communities.
            </p>
            <p className="mb-4">
              Our success is built on the talent, creativity, and dedication of our diverse team. We foster a collaborative environment where innovation is encouraged, excellence is recognized, and personal growth is supported.
            </p>
            <p className="mb-6">
              Join us and be part of a company that values sustainability, community impact, and the well-being of its employees.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <svg className="h-8 w-8 mx-auto text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <h3 className="font-semibold">Meaningful Work</h3>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <svg className="h-8 w-8 mx-auto text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <h3 className="font-semibold">Career Growth</h3>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <svg className="h-8 w-8 mx-auto text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="font-semibold">Collaborative Culture</h3>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <svg className="h-8 w-8 mx-auto text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-semibold">Competitive Benefits</h3>
              </div>
            </div>
          </div>
          
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Image 
              src="/landscape.jpg" 
              alt="EPML Properties team" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Current Openings</h2>
          
          {Object.entries(careersByDepartment).map(([department, jobs]) => (
            <div key={department} className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 pb-3 border-b">{department}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-semibold">{job.title}</h4>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                          {job.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{job.location}</p>
                      <p className="mb-6">{job.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Posted: {new Date(job.posted).toLocaleDateString()}</span>
                        <Button asChild variant="outline">
                          <Link href={`/careers/${job.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {Object.keys(careersByDepartment).length === 0 && (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold mb-2">No current openings</h3>
              <p className="text-gray-600 mb-4">We don't have any open positions at the moment. Please check back later or submit your resume for future consideration.</p>
            </div>
          )}
        </div>
      </section>

      {/* Employee Testimonials */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center">Life at EPML Properties</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="relative h-16 w-16 rounded-full overflow-hidden mb-4">
              <Image 
                src="/landscape.jpg" 
                alt="Employee photo" 
                fill 
                className="object-cover"
              />
            </div>
            <p className="italic mb-4">
              "Working at EPML has given me the opportunity to grow professionally while contributing to meaningful projects that shape our communities."
            </p>
            <div>
              <h4 className="font-semibold">Michael Rodriguez</h4>
              <p className="text-sm text-gray-600">Project Manager, 4 years</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="relative h-16 w-16 rounded-full overflow-hidden mb-4">
              <Image 
                src="/landscape.jpg" 
                alt="Employee photo" 
                fill 
                className="object-cover"
              />
            </div>
            <p className="italic mb-4">
              "The collaborative culture and emphasis on innovation at EPML makes it an exciting place to work. Every day brings new challenges and opportunities."
            </p>
            <div>
              <h4 className="font-semibold">Anita Patel</h4>
              <p className="text-sm text-gray-600">Architectural Coordinator, 2 years</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="relative h-16 w-16 rounded-full overflow-hidden mb-4">
              <Image 
                src="/landscape.jpg" 
                alt="Employee photo" 
                fill 
                className="object-cover"
              />
            </div>
            <p className="italic mb-4">
              "EPML truly values its employees. The support for professional development and work-life balance has been exceptional."
            </p>
            <div>
              <h4 className="font-semibold">David Chen</h4>
              <p className="text-sm text-gray-600">Finance Manager, 5 years</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Employee Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <svg className="h-10 w-10 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Healthcare</h3>
              <p className="text-gray-600">
                Medical, dental, and vision insurance for you and your dependents.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <svg className="h-10 w-10 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Retirement Planning</h3>
              <p className="text-gray-600">
                401(k) plan with company matching and financial planning assistance.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <svg className="h-10 w-10 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Professional Development</h3>
              <p className="text-gray-600">
                Education reimbursement, training programs, and career advancement opportunities.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <svg className="h-10 w-10 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Work-Life Balance</h3>
              <p className="text-gray-600">
                Flexible work arrangements, generous PTO, and wellness initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Application Process</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          <div className="relative">
            <div className="bg-white p-6 rounded-lg shadow-md z-10 relative h-full">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Apply Online</h3>
              <p className="text-gray-600">
                Submit your application through our careers portal, including your resume, cover letter, and any required supporting documents.
              </p>
            </div>
            <div className="hidden md:block absolute h-1/2 w-full top-1/2 left-full z-0">
              <div className="h-0.5 w-full bg-gray-200 absolute top-0 left-0"></div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white p-6 rounded-lg shadow-md z-10 relative h-full">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Interview Process</h3>
              <p className="text-gray-600">
                Selected candidates will be invited for interviews, which may include phone screenings, in-person or video interviews, and possibly assessments relevant to the role.
              </p>
            </div>
            <div className="hidden md:block absolute h-1/2 w-full top-1/2 left-full z-0">
              <div className="h-0.5 w-full bg-gray-200 absolute top-0 left-0"></div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4">
              <span className="font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Offer & Onboarding</h3>
            <p className="text-gray-600">
              Successful candidates will receive an offer, and once accepted, will be guided through our comprehensive onboarding process to integrate smoothly into the team.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Explore our current openings or submit your resume for future opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
              <a href="#current-openings">View Openings</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white hover:bg-white/10">
              <Link href="/contact?inquiry=careers">Submit Resume</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

// In a real application, this would be a Server Component 
// using Next.js data fetching to get career data from the CMS
/*
export async function generateMetadata() {
  // Fetch necessary data for the metadata
  return {
    title: 'Careers | EPML Properties',
    description: 'Explore career opportunities at EPML Properties and join our team of real estate professionals.',
  };
}

async function getData() {
  // Fetch data from API
  const res = await fetch('https://api.example.com/careers', { next: { revalidate: 86400 } })
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
*/