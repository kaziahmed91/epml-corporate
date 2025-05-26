import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Dummy data for the buyer's guide sections
const buyingSteps = [
  {
    title: "Research & Planning",
    description: "Begin your property journey by defining your needs, budget, and timeline.",
    details: [
      "Determine your budget and financing options",
      "Identify preferred locations and property types",
      "Create a list of must-have features and amenities",
      "Consider future needs and growth potential",
      "Research the market and property values in target areas"
    ]
  },
  {
    title: "Viewing Properties",
    description: "Explore available units and developments that match your criteria.",
    details: [
      "Schedule viewings of potential properties",
      "Visit at different times of day to assess lighting and noise levels",
      "Inspect common areas and amenities",
      "Take notes and photos during viewings",
      "Ask questions about construction quality and materials"
    ]
  },
  {
    title: "Making an Offer",
    description: "When you find the right property, work with our team to prepare and submit your offer.",
    details: [
      "Determine a competitive offer price",
      "Include any specific conditions or contingencies",
      "Prepare necessary documentation",
      "Submit your offer through our sales team",
      "Be prepared for potential negotiation"
    ]
  },
  {
    title: "Legal Process",
    description: "Once your offer is accepted, legal work begins to secure your new property.",
    details: [
      "Engage a qualified real estate attorney",
      "Review all contracts and agreements thoroughly",
      "Conduct necessary property inspections",
      "Ensure all permits and approvals are in place",
      "Complete due diligence on the property and development"
    ]
  },
  {
    title: "Financing",
    description: "Secure your financing and complete the necessary financial arrangements.",
    details: [
      "Finalize mortgage approval",
      "Arrange for down payment funds",
      "Prepare for closing costs",
      "Schedule final walkthrough",
      "Set up utilities and services"
    ]
  },
  {
    title: "Closing & Handover",
    description: "Complete the transaction and receive the keys to your new property.",
    details: [
      "Sign closing documents",
      "Complete final payment transfer",
      "Receive keys and access credentials",
      "Review homeowner manuals and warranties",
      "Complete move-in inspection with our team"
    ]
  }
];

const financingOptions = [
  {
    title: "Conventional Mortgage",
    description: "Traditional home loans offered by banks and financial institutions.",
    features: [
      "Competitive interest rates",
      "Various term options (15, 20, 30 years)",
      "Requires good credit score and income verification",
      "Typically requires 10-20% down payment"
    ]
  },
  {
    title: "FHA Loans",
    description: "Government-backed loans with more flexible qualifying requirements.",
    features: [
      "Lower down payment requirements (as low as 3.5%)",
      "More flexible credit score requirements",
      "Higher debt-to-income ratios may be accepted",
      "Mortgage insurance required"
    ]
  },
  {
    title: "VA Loans",
    description: "Special financing options for veterans and active military personnel.",
    features: [
      "No down payment required in many cases",
      "No private mortgage insurance",
      "Competitive interest rates",
      "Limited closing costs"
    ]
  },
  {
    title: "Developer Financing",
    description: "Special financing arrangements offered directly through EPML Properties.",
    features: [
      "Tailored payment plans",
      "Potential for reduced closing costs",
      "Simplified application process",
      "Special incentives for early buyers"
    ]
  }
];

const faqItems = [
  {
    question: "What is the typical deposit requirement for your properties?",
    answer: "Our standard deposit is 10% of the purchase price, typically paid in stages: 5% upon signing the purchase agreement and 5% within 30 days. For pre-construction properties, we offer extended deposit schedules."
  },
  {
    question: "Can I customize the interior of my unit?",
    answer: "Yes, for pre-construction purchases, we offer various customization options depending on the project. These may include flooring selections, kitchen finishes, bathroom fixtures, and paint colors. Our design team will guide you through available options."
  },
  {
    question: "What warranties are included with your properties?",
    answer: "All our new properties come with a comprehensive warranty package including a 1-year workmanship warranty, 2-year systems warranty, and 10-year structural warranty. Specific warranty details are provided in your purchase documentation."
  },
  {
    question: "How are property taxes and HOA fees determined?",
    answer: "Property taxes are established by local government assessments. HOA fees are determined based on the amenities, services, and maintenance requirements of each development. We provide estimated fees during the sales process, which are subject to adjustment based on actual operating costs."
  },
  {
    question: "What happens if construction is delayed?",
    answer: "Our purchase agreements include provisions addressing potential delays. If completion is delayed beyond the scheduled date, you'll be kept informed with regular updates. For significant delays, specific remedies are outlined in your purchase agreement."
  },
  {
    question: "Can I sell my unit before I take possession?",
    answer: "Assignment policies vary by development. Some projects allow assignment of the purchase agreement before closing, usually subject to developer approval and an administration fee. Please consult your sales representative for the specific assignment policy for your property."
  }
];

export default function BuyersGuidePage() {
  // In a real application, this content would be fetched from the CMS
  // const { data: buyersGuideContent } = useQuery(['buyersGuide'], fetchBuyersGuide)

  return (
    <main className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full">
        <div className="absolute inset-0">
          <Image 
            src="/landscape.jpg" 
            alt="Buyer's Guide" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Buyer's Guide
          </h1>
          <p className="text-xl max-w-3xl">
            Your comprehensive resource for navigating the property buying process
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Welcome to Your Property Buying Journey</h2>
          <p className="text-xl mb-8">
            Purchasing a property is one of the most significant investments you'll make. This guide will walk you through the entire process of buying a property from EPML, ensuring you have all the information you need to make confident decisions.
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg">
              <a href="#buying-steps">Get Started</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Buying Steps */}
      <section id="buying-steps" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">The Property Buying Process</h2>
          
          <div className="relative">
            {/* Process Timeline */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2"></div>
            
            {buyingSteps.map((step, index) => (
              <div key={index} className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start mb-16`}>
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold mb-3">{`Step ${index + 1}: ${step.title}`}</h3>
                    <p className="mb-4">{step.description}</p>
                    <ul className={`space-y-2 text-gray-600 ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <svg className={`h-5 w-5 text-blue-500 mr-2 mt-0.5 ${index % 2 === 0 ? 'md:order-last md:ml-2 md:mr-0' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className={index % 2 === 0 ? 'md:text-right' : ''}>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="hidden md:block absolute left-1/2 top-6 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center -translate-x-1/2 z-10">
                  <span>{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing Options */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center">Financing Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {financingOptions.map((option, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">{option.title}</h3>
              <p className="mb-4 text-gray-600">{option.description}</p>
              <ul className="space-y-2">
                {option.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg shadow-md mt-12">
          <div className="flex items-start">
            <svg className="h-6 w-6 text-blue-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-xl font-semibold mb-2">Financing Assistance</h3>
              <p className="mb-3">
                Our team can connect you with preferred lenders who understand our properties and can offer competitive financing packages tailored to your needs.
              </p>
              <Button asChild variant="outline">
                <Link href="/contact?inquiry=financing">Request Financing Information</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Checklist */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Essential Documents Checklist</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 pb-3 border-b">For Financing Pre-Approval</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span>Government-issued photo ID</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span>Proof of income (pay stubs, employment letter)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span>Tax returns (last 2 years)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span>Bank statements (last 3 months)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span>List of assets and liabilities</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span>Credit report authorization</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6 pb-3 border-b">For Purchase Completion</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span>Purchase agreement (signed)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span>Mortgage approval documents</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span>Down payment proof of funds</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span>Insurance verification</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span>Closing statement</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span>Identification for closing</span>
                </li>
              </ul>
              
              <div className="mt-8 bg-blue-50 p-4 rounded-md">
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm">
                    Our sales team will provide a complete checklist specific to your purchase. This overview is provided as a general guide only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">{item.question}</h3>
              <p className="text-gray-600">{item.answer}</p>
            </div>
          ))}
          
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Have More Questions?</h3>
            <p className="text-gray-600 mb-4">
              Our team is ready to answer any questions you may have about the buying process. Contact us for personalized assistance.
            </p>
            <Button asChild>
              <Link href="/contact">Contact Our Sales Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Additional Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Downloadable Guides</h3>
              <p className="text-gray-600 mb-4">
                Access our collection of detailed guides covering various aspects of the property buying process.
              </p>
              <Button asChild variant="outline">
                <a href="#" download>Download PDF Guides</a>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Property Valuation Tools</h3>
              <p className="text-gray-600 mb-4">
                Use our interactive tools to understand property values and investment potential in different areas.
              </p>
              <Button asChild variant="outline">
                <Link href="#">Access Tools</Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Mortgage Calculator</h3>
              <p className="text-gray-600 mb-4">
                Estimate your monthly payments and affordability with our interactive mortgage calculator.
              </p>
              <Button asChild variant="outline">
                <Link href="#">Calculate Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Property?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our team is ready to guide you through every step of the buying process.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
              <Link href="/projects">View Available Properties</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white hover:bg-white/10">
              <Link href="/contact">Contact Sales Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

// In a real application, this would be a Server Component 
// using Next.js data fetching to get buyer's guide content from the CMS
/*
export async function generateMetadata() {
  // Fetch necessary data for the metadata
  return {
    title: "Buyer's Guide | EPML Properties",
    description: 'Your comprehensive resource for navigating the property buying process with EPML Properties.',
  };
}

async function getData() {
  // Fetch data from API
  const res = await fetch('https://api.example.com/buyers-guide', { next: { revalidate: 86400 } })
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
*/