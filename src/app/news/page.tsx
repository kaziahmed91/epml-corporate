import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { news } from '@/lib/data/newsData';

export default function NewsPage() {
  // In a real application, this would fetch news data from the API
  // const { data: newsArticles } = useQuery(['news'], fetchNewsArticles)
  
  // Filter news by categories for sidebar
  const categories = Array.from(new Set(news.map(item => item.category)));
  
  return (
    <main className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full">
        <div className="absolute inset-0">
          <Image 
            src="/landscape.jpg" 
            alt="EPML Properties News" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            News & Updates
          </h1>
          <p className="text-xl max-w-3xl">
            Stay informed about our latest developments and company announcements
          </p>
        </div>
      </section>

      {/* News Content */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl font-bold mb-8">Latest News</h2>
            
            {/* Featured Article */}
            {news.length > 0 && (
              <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-12">
                <div className="relative h-80 w-full">
                  <Image 
                    src={news[0].image} 
                    alt={news[0].title} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-sm text-gray-500 mr-4">{new Date(news[0].date).toLocaleDateString()}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      {news[0].category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{news[0].title}</h3>
                  <p className="mb-4">{news[0].excerpt}</p>
                  <Button asChild>
                    <Link href={`/news/${news[0].slug}`}>Read More</Link>
                  </Button>
                </div>
              </div>
            )}
            
            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {news.slice(1).map((article) => (
                <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative h-48 w-full">
                    <Image 
                      src={article.image} 
                      alt={article.title} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-sm text-gray-500 mr-4">{new Date(article.date).toLocaleDateString()}</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                    <p className="mb-4 text-gray-600 line-clamp-3">{article.excerpt}</p>
                    <Button asChild variant="outline">
                      <Link href={`/news/${article.slug}`}>Read More</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            {/* Search */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Search</h3>
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Search news..." 
                  className="flex-grow rounded-l-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-2"
                />
                <Button className="rounded-l-none">Search</Button>
              </div>
            </div>
            
            {/* Categories */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/news" className="text-blue-600 hover:underline font-medium">
                    All News
                  </Link>
                </li>
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link 
                      href={`/news?category=${category.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="text-gray-700 hover:text-blue-600"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
              <div className="space-y-4">
                {news.slice(0, 3).map((article) => (
                  <div key={article.id} className="flex items-start">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image 
                        src={article.image} 
                        alt={article.title} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <Link 
                        href={`/news/${article.slug}`} 
                        className="text-sm font-medium hover:text-blue-600 line-clamp-2"
                      >
                        {article.title}
                      </Link>
                      <span className="text-xs text-gray-500 block mt-1">
                        {new Date(article.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="bg-blue-50 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Subscribe to Updates</h3>
              <p className="text-gray-600 mb-4">
                Stay informed about our latest news and project updates.
              </p>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-2 mb-4"
              />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// In a real application, this would be a Server Component 
// using Next.js data fetching to get news from the CMS
/*
export async function generateMetadata() {
  // Fetch necessary data for the metadata
  return {
    title: 'News & Updates | EPML Properties',
    description: 'Stay informed about our latest developments and company announcements.',
  };
}

async function getData() {
  // Fetch data from API
  const res = await fetch('https://api.example.com/news', { next: { revalidate: 3600 } })
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
*/