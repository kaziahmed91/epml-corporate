import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { careers, getJobById } from '@/lib/data/careersData';

// Define the props type
type JobDetailPageProps = {
  params: { 'job-id': string };
};

export default function JobDetailPage({ params }: JobDetailPageProps) {
  // In a real app, we would fetch the job data from an API using the ID
  // const { data: job, isLoading } = useQuery(['job', params['job-id']], () => fetchJob(params['job-id']))
  
  // For demo purposes, we're using the static data
  const job = getJobById(params['job-id']);
  
  // If job doesn't exist
  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Job Not Found</h1>
          <p className="mb-6">The position you're looking for doesn't exist or has been filled.</p>
          <Button asChild>
            <Link href="/careers">View All Openings</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full">
        <div className="absolute inset-0">
          <Image 
            src="/landscape.jpg" 
            alt={`${job.title} at EPML Properties`} 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-600 rounded-full">
              {job.department}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {job.title}
          </h1>
          <div className="flex flex-wrap items-center text-gray-200 text-lg">
            <span className="flex items-center mr-6">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.location}
            </span>
            <span className="flex items-center mr-6">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {job.type}
            </span>
            <span className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Posted: {formatDate(job.posted)}
            </span>
          </div>
        </div>
      </section>

      {/* Job Content */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content - 2/3 width on large screens */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Job Description</h2>
              <p className="text-lg mb-6">{job.description}</p>
            </div>
            
            {/* Key Responsibilities */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Key Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Requirements */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Benefits */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Benefits</h2>
              <ul className="space-y-3">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Sidebar - 1/3 width on large screens */}
          <div>
            {/* Apply Now Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 sticky top-24">
              <h3 className="text-xl font-bold mb-4 pb-4 border-b">Apply Now</h3>
              <p className="mb-6">
                Ready to join our team? Submit your application for this position.
              </p>
              <Button asChild className="w-full mb-4">
                <Link href={`/contact?inquiry=careers&position=${job.title}`}>Apply for This Position</Link>
              </Button>
              <p className="text-sm text-gray-600">
                You will be directed to our application form. Please have your resume and cover letter ready.
              </p>
            </div>
            
            {/* Job Details Card */}
            <div className="bg-gray-50 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Job Details</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700">Department</h4>
                  <p>{job.department}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700">Location</h4>
                  <p>{job.location}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700">Employment Type</h4>
                  <p>{job.type}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700">Posted Date</h4>
                  <p>{formatDate(job.posted)}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700">Reference ID</h4>
                  <p>{job.id}</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium text-gray-700 mb-2">Share This Job</h4>
                <div className="flex space-x-3">
                  <Button variant="outline" size="icon" className="rounded-full w-8 h-8 p-0">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full w-8 h-8 p-0">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full w-8 h-8 p-0">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full w-8 h-8 p-0">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Jobs */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Similar Positions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careers
              .filter(item => item.id !== job.id && item.department === job.department)
              .slice(0, 3)
              .map((similarJob) => (
                <div key={similarJob.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{similarJob.title}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        {similarJob.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{similarJob.location}</p>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/careers/${similarJob.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              ))}
            
            {careers.filter(item => item.id !== job.id && item.department === job.department).length === 0 && (
              <div className="col-span-3 bg-white p-6 rounded-lg shadow-md text-center">
                <p>No other positions available in this department at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Talent Community</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Not ready to apply or don't see the right fit? Join our talent community to stay updated on future opportunities.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
            <Link href="/contact?inquiry=careers&subject=talent-community">Join Talent Community</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

// In a real application, this would use getStaticPaths to pre-render all job detail pages
/*
export async function generateStaticParams() {
  // Fetch all job IDs
  const jobs = await fetch('https://api.example.com/jobs').then(res => res.json())
  
  return jobs.map((job) => ({
    'job-id': job.id,
  }))
}

export async function generateMetadata({ params }: JobDetailPageProps) {
  // Fetch job data
  const job = await fetch(`https://api.example.com/jobs/${params['job-id']}`).then(res => res.json())
  
  return {
    title: `${job.title} | Careers at EPML Properties`,
    description: job.description,
  }
}
*/