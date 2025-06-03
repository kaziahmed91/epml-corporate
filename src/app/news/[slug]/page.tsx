import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { news, getArticleBySlug, getRelatedArticles } from '@/lib/data/newsData';
import { projectsDetail } from '@/lib/data/projectsData';

// Define props type
type NewsArticlePageProps = {
  params: { slug: string };
};

export default function NewsArticlePage({ params }: NewsArticlePageProps) {
  // In a real app, we would fetch the article data from an API using the slug
  // const { data: article } = useQuery(['article', params.slug], () => fetchArticle(params.slug))
  
  // For demo purposes, we're using the static data
  const article = getArticleBySlug(params.slug);
  const relatedArticles = getRelatedArticles(params.slug);
  
  // If article doesn't exist
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="mb-6">The article you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link href="/news">Back to News</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Find related projects if they exist
  const relatedProjects = article.relatedProjects 
    ? article.relatedProjects
      .map(slug => projectsDetail[slug as keyof typeof projectsDetail])
      .filter(Boolean)
    : [];

  return (
    <main className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full">
        <div className="absolute inset-0">
          <Image 
            src={article.image} 
            alt={article.title} 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white pb-12">
          <div className="flex items-center mb-4">
            <span className="text-sm mr-4">{new Date(article.date).toLocaleDateString()}</span>
            <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
              {article.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">{article.title}</h1>
          <p className="text-lg mt-4">By {article.author}</p>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <article className="w-full lg:w-2/3">
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
            
            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Share Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Share this article:</h3>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                  Facebook
                </Button>
                <Button variant="outline" size="sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  Twitter
                </Button>
                <Button variant="outline" size="sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" clipRule="evenodd" />
                  </svg>
                  Email
                </Button>
              </div>
            </div>
          </article>
          
          {/* Sidebar */}
          <aside className="w-full lg:w-1/3">
            {/* Author Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">About the Author</h3>
              <div className="flex items-center">
                <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                  <Image 
                    src="/landscape.jpg" 
                    alt={article.author} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{article.author}</h4>
                  <p className="text-sm text-gray-600">Writer & Communications Specialist</p>
                </div>
              </div>
            </div>
            
            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Related Projects</h3>
                <div className="space-y-4">
                  {relatedProjects.map((project) => (
                    <div key={project.id} className="flex items-start">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image 
                          src={project.mainImage} 
                          alt={project.title} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <Link 
                          href={`/projects/${project.slug}`} 
                          className="text-sm font-medium hover:text-blue-600"
                        >
                          {project.title}
                        </Link>
                        <span className="text-xs text-gray-500 block mt-1">
                          {project.status} " {project.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Related Articles */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
              <div className="space-y-4">
                {relatedArticles.map((related) => (
                  <div key={related.id} className="flex items-start">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image 
                        src={related.image} 
                        alt={related.title} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <Link 
                        href={`/news/${related.slug}`} 
                        className="text-sm font-medium hover:text-blue-600 line-clamp-2"
                      >
                        {related.title}
                      </Link>
                      <span className="text-xs text-gray-500 block mt-1">
                        {new Date(related.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
      
      {/* Newsletter CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Subscribe to our newsletter to receive the latest news and updates about our projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </main>
  );
}

// In a real application, this would use getStaticPaths to pre-render all article pages
/*
export async function generateStaticParams() {
  // Fetch all article slugs
  const articles = await fetch('https://api.example.com/news').then(res => res.json())
  
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: NewsArticlePageProps) {
  // Fetch article data
  const article = await fetch(`https://api.example.com/news/${params.slug}`).then(res => res.json())
  
  return {
    title: `${article.title} | EPML Properties News`,
    description: article.excerpt,
  }
}
*/