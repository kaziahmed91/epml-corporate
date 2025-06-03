import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Dummy data for landowner partnerships
const partnershipBenefits = [
  {
    title: 'Fair Market Value',
    description: 'We offer competitive, transparent valuations based on current market conditions and future potential.',
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Flexible Partnership Models',
    description: 'Choose from outright purchase, joint venture, or profit-sharing arrangements to suit your preferences.',
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    title: 'Expedited Process',
    description: 'Our experienced team ensures efficient evaluation, negotiation, and closing processes.',
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Development Expertise',
    description: 'Benefit from our extensive experience in navigating complex development regulations and processes.',
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Legacy Planning',
    description: 'We work with landowners to ensure their vision for the property is respected and incorporated where possible.',
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: 'Long-term Relationships',
    description: 'Many of our landowner partners have worked with us on multiple projects over the years.',
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

// Dummy testimonials from landowner partners
const testimonials = [
  {
    quote: "Working with EPML Properties was a seamless experience. They offered a fair price for our family land and kept us informed throughout the development process. The end result exceeded our expectations.",
    author: "Sarah Johnson",
    role: "Family Estate Owner",
    image: "/landscape.jpg",
  },
  {
    quote: "As a long-time landowner looking to maximize the value of my property, I found EPML's joint venture approach to be the perfect solution. Their development expertise combined with our land created a successful partnership.",
    author: "Robert Chen",
    role: "Agricultural Land Owner",
    image: "/landscape.jpg",
  },
  {
    quote: "I appreciated EPML's transparent approach to valuation and their respect for the history of our property. They incorporated elements of the land's heritage into their development plan.",
    author: "Thomas Wilson",
    role: "Third-generation Property Owner",
    image: "/landscape.jpg",
  },
];

// Dummy case studies
const caseStudies = [
  {
    title: "Family Estate Transformation",
    location: "Metro City",
    description: "A 5-acre family estate was transformed into a sustainable residential community while preserving the historic main house as a community center.",
    results: "The landowners received fair market value plus ongoing revenue through a profit-sharing agreement.",
    image: "/landscape.jpg",
  },
  {
    title: "Agricultural Land Conversion",
    location: "Greenfield",
    description: "A 20-acre farm was developed into Green Valley, an eco-friendly residential community with extensive green spaces.",
    results: "The former landowner now resides in one of the premium homes and serves as a community advisor.",
    image: "/landscape.jpg",
  },
];

export default function LandownersPage() {
  // In a real application, this data would come from an API call
  // const { data: partnershipInfo } = useQuery(['landowners'], fetchLandownerInfo)

  return (
    <main className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full">
        <div className="absolute inset-0">
          <Image 
            src="/landscape.jpg" 
            alt="Landowner Partnerships" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Landowner Partnerships
          </h1>
          <p className="text-xl max-w-3xl">
            Partner with EPML Properties to maximize the value and potential of your land
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Unlock Your Land's Potential</h2>
            <p className="mb-4">
              At EPML Properties, we understand that your land represents not just a financial asset, but often a personal legacy. Our approach to landowner partnerships is built on respect, transparency, and mutual benefit.
            </p>
            <p className="mb-4">
              Whether you own a small urban lot or extensive rural acreage, we offer tailored solutions to help you realize the full potential of your property. Our experienced team will guide you through every step of the process, from initial evaluation to final development.
            </p>
            <p className="mb-4">
              We pride ourselves on creating developments that enhance communities while providing fair returns to our landowner partners. Our flexible partnership models allow you to choose the level of involvement and return structure that best meets your needs.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image 
              src="/landscape.jpg" 
              alt="Land development" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Partnership Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Partnership Process</h2>
        
        <div className="relative">
          {/* Process Timeline */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2"></div>
          
          <div className="space-y-16">
            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <h3 className="text-2xl font-semibold mb-2">Initial Consultation</h3>
                <p className="text-gray-600">
                  We meet to understand your goals, evaluate your property, and discuss potential development options.
                </p>
              </div>
              <div className="hidden md:block absolute left-1/2 top-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center -translate-x-1/2 z-10">
                <span>1</span>
              </div>
              <div className="md:w-1/2 md:pl-12 mt-4 md:mt-0">
                <div className="bg-gray-50 rounded-lg overflow-hidden h-48 relative shadow-md">
                  <Image 
                    src="/landscape.jpg" 
                    alt="Initial consultation" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-1/2 md:pl-12 md:text-left">
                <h3 className="text-2xl font-semibold mb-2">Property Assessment</h3>
                <p className="text-gray-600">
                  Our team conducts a thorough assessment of your property, including market analysis, zoning review, and development potential.
                </p>
              </div>
              <div className="hidden md:block absolute left-1/2 top-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center -translate-x-1/2 z-10">
                <span>2</span>
              </div>
              <div className="md:w-1/2 md:pr-12 mt-4 md:mt-0">
                <div className="bg-gray-50 rounded-lg overflow-hidden h-48 relative shadow-md">
                  <Image 
                    src="/landscape.jpg" 
                    alt="Property assessment" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <h3 className="text-2xl font-semibold mb-2">Partnership Proposal</h3>
                <p className="text-gray-600">
                  Based on our assessment, we present partnership options tailored to your circumstances and preferences.
                </p>
              </div>
              <div className="hidden md:block absolute left-1/2 top-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center -translate-x-1/2 z-10">
                <span>3</span>
              </div>
              <div className="md:w-1/2 md:pl-12 mt-4 md:mt-0">
                <div className="bg-gray-50 rounded-lg overflow-hidden h-48 relative shadow-md">
                  <Image 
                    src="/landscape.jpg" 
                    alt="Partnership proposal" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="relative flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-1/2 md:pl-12 md:text-left">
                <h3 className="text-2xl font-semibold mb-2">Agreement & Planning</h3>
                <p className="text-gray-600">
                  Once terms are agreed upon, we formalize the partnership and begin the development planning process.
                </p>
              </div>
              <div className="hidden md:block absolute left-1/2 top-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center -translate-x-1/2 z-10">
                <span>4</span>
              </div>
              <div className="md:w-1/2 md:pr-12 mt-4 md:mt-0">
                <div className="bg-gray-50 rounded-lg overflow-hidden h-48 relative shadow-md">
                  <Image 
                    src="/landscape.jpg" 
                    alt="Agreement and planning" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Step 5 */}
            <div className="relative flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <h3 className="text-2xl font-semibold mb-2">Development & Realization</h3>
                <p className="text-gray-600">
                  We execute the development plan, keeping you informed throughout the process until project completion.
                </p>
              </div>
              <div className="hidden md:block absolute left-1/2 top-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center -translate-x-1/2 z-10">
                <span>5</span>
              </div>
              <div className="md:w-1/2 md:pl-12 mt-4 md:mt-0">
                <div className="bg-gray-50 rounded-lg overflow-hidden h-48 relative shadow-md">
                  <Image 
                    src="/landscape.jpg" 
                    alt="Development and realization" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Partners Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-blue-800 p-6 rounded-lg">
                <svg className="h-10 w-10 text-blue-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="mb-4 italic">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-blue-300 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center">Success Stories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-60 w-full">
                <Image 
                  src={study.image} 
                  alt={study.title} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
                <p className="text-blue-600 mb-4">{study.location}</p>
                <p className="mb-3">{study.description}</p>
                <p className="font-medium">Results: {study.results}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">What types of land are you interested in?</h3>
              <p className="text-gray-600">
                We consider a wide range of properties, from small urban lots to large rural parcels. Our main criteria include location, zoning potential, and market demand in the area.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">How is land valued?</h3>
              <p className="text-gray-600">
                We conduct a thorough assessment that considers current market conditions, development potential, zoning, location, infrastructure, and environmental factors to determine fair market value.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">What partnership models do you offer?</h3>
              <p className="text-gray-600">
                We offer several options including outright purchase, joint venture development, land contribution in exchange for finished units, and profit-sharing arrangements.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">How long does the process take?</h3>
              <p className="text-gray-600">
                The timeline varies depending on property size, location, and complexity. Typically, the initial assessment takes 2-4 weeks, with the entire process from first contact to agreement taking 2-6 months.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Can I be involved in the development planning?</h3>
              <p className="text-gray-600">
                Yes, we welcome landowner input and can structure agreements that allow for various levels of involvement in the development process, from minimal to significant participation.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">What if my land has existing structures?</h3>
              <p className="text-gray-600">
                We evaluate properties with existing structures on a case-by-case basis. In some cases, we incorporate or repurpose existing buildings; in others, we may propose removal to maximize development potential.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Discuss Your Land's Potential?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our team is ready to explore partnership opportunities that maximize the value of your land.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
            <Link href="/contact?inquiry=landowner">Schedule a Consultation</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

// In a real application, this would be a Server Component 
// using Next.js data fetching to get landowner partnership info from the CMS
/*
export async function generateMetadata() {
  // Fetch necessary data for the metadata
  return {
    title: 'Landowner Partnerships | EPML Properties',
    description: 'Partner with EPML Properties to maximize the value and potential of your land through our flexible partnership models.',
  };
}

async function getData() {
  // Fetch data from API
  const res = await fetch('https://api.example.com/landowner-info', { next: { revalidate: 86400 } })
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
*/