// Legacy types for backward compatibility
// These types are deprecated - use types from @/api/types instead

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      url: string;
      width: number;
      height: number;
      formats: {
        thumbnail?: {
          url: string;
          width: number;
          height: number;
        };
        small?: {
          url: string;
          width: number;
          height: number;
        };
        medium?: {
          url: string;
          width: number;
          height: number;
        };
        large?: {
          url: string;
          width: number;
          height: number;
        };
      };
    };
  };
}

export interface StrapiMultipleMedia {
  data: Array<{
    id: number;
    attributes: {
      url: string;
      formats: {
        thumbnail?: { url: string; };
        small?: { url: string; };
        medium?: { url: string; };
        large?: { url: string; };
      };
    };
  }>;
}

// Legacy Project types - DEPRECATED
export interface ProjectAttributes {
  title: string;
  slug: string;
  description: string;
  location: string;
  city: string;
  type: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  startDate: string;
  completionDate: string;
  totalUnits: number;
  architect: string;
  developer: string;
  features: string[];
  amenities: string[];
  mainImage: StrapiImage;
  galleryImages: StrapiMultipleMedia;
  longDescription: string;
  constructionProgress: number;
  nearbyAttractions: string[];
  contactEmail: string;
  contactPhone: string;
  unitTypes: {
    type: string;
    size: string;
    priceRange: string;
    available: number;
  }[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type Project = StrapiData<ProjectAttributes>;
export type ProjectResponse = StrapiResponse<Project[]>;
export type SingleProjectResponse = StrapiResponse<Project>;

// Legacy News types - DEPRECATED
export interface NewsAttributes {
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  image: StrapiImage;
  tags: string[];
  relatedProjects: {
    data: Project[];
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type NewsArticle = StrapiData<NewsAttributes>;
export type NewsResponse = StrapiResponse<NewsArticle[]>;
export type SingleNewsResponse = StrapiResponse<NewsArticle>;

// Legacy Job types - DEPRECATED
export interface JobAttributes {
  title: string;
  department: string;
  location: string;
  type: string;
  posted: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type Job = StrapiData<JobAttributes>;
export type JobsResponse = StrapiResponse<Job[]>;
export type SingleJobResponse = StrapiResponse<Job>;

// Contact form submission
export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  inquiry: string;
  message: string;
  privacyConsent: boolean;
}