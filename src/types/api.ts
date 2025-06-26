/**
 * API Type Definitions
 * 
 * These types define all API-related interfaces including request/response types,
 * query parameters, filters, and error handling.
 * 
 * @fileoverview API type definitions
 */

import { 
  StrapiResponse, 
  StrapiCollectionResponse, 
  StrapiQuery, 
  StrapiFilters,
  StrapiErrorResponse 
} from './strapi';
import { 
  Project, 
  City, 
  Location, 
  ProjectStatus, 
  ProjectType,
  Document,
  ConstructionUpdate,
  Testimonial,
  FeatureTemplate,
  AmenityTemplate,
  RecentNews,
  ContactSubmission,
  Job,
  NewsArticle
} from './content';

/**
 * API Response Types
 */
export type ProjectResponse = StrapiResponse<Project>;
export type ProjectsResponse = StrapiCollectionResponse<Project>;
export type CityResponse = StrapiResponse<City>;
export type CitiesResponse = StrapiCollectionResponse<City>;
export type LocationResponse = StrapiResponse<Location>;
export type LocationsResponse = StrapiCollectionResponse<Location>;
export type ProjectStatusResponse = StrapiResponse<ProjectStatus>;
export type ProjectStatusesResponse = StrapiCollectionResponse<ProjectStatus>;
export type ProjectTypeResponse = StrapiResponse<ProjectType>;
export type ProjectTypesResponse = StrapiCollectionResponse<ProjectType>;
export type DocumentResponse = StrapiResponse<Document>;
export type DocumentsResponse = StrapiCollectionResponse<Document>;
export type ConstructionUpdateResponse = StrapiResponse<ConstructionUpdate>;
export type ConstructionUpdatesResponse = StrapiCollectionResponse<ConstructionUpdate>;
export type TestimonialResponse = StrapiResponse<Testimonial>;
export type TestimonialsResponse = StrapiCollectionResponse<Testimonial>;
export type FeatureTemplateResponse = StrapiResponse<FeatureTemplate>;
export type FeatureTemplatesResponse = StrapiCollectionResponse<FeatureTemplate>;
export type AmenityTemplateResponse = StrapiResponse<AmenityTemplate>;
export type AmenityTemplatesResponse = StrapiCollectionResponse<AmenityTemplate>;
export type RecentNewsResponse = StrapiResponse<RecentNews>;
export type ContactSubmissionResponse = StrapiResponse<ContactSubmission>;
export type JobResponse = StrapiResponse<Job>;
export type JobsResponse = StrapiCollectionResponse<Job>;
export type NewsArticleResponse = StrapiResponse<NewsArticle>;
export type NewsArticlesResponse = StrapiCollectionResponse<NewsArticle>;

/**
 * Filter Types for each content type
 */
export interface ProjectFilters {
  name?: StrapiFilters;
  slug?: StrapiFilters;
  projectStatus?: {
    name?: StrapiFilters;
  };
  projectType?: {
    name?: StrapiFilters;
  };
  location?: {
    name?: StrapiFilters;
    city?: {
      name?: StrapiFilters;
    };
  };
  constructionStart?: StrapiFilters;
  constructionEnd?: StrapiFilters;
  isFeatured?: StrapiFilters;
  isActive?: StrapiFilters;
}

export interface DocumentFilters {
  title?: StrapiFilters;
  category?: StrapiFilters;
  isPublic?: StrapiFilters;
  isActive?: StrapiFilters;
  project?: StrapiFilters;
}

export interface ConstructionUpdateFilters {
  title?: StrapiFilters;
  updateDate?: StrapiFilters;
  isPublic?: StrapiFilters;
  isActive?: StrapiFilters;
  project?: StrapiFilters;
}

export interface TestimonialFilters {
  customerName?: StrapiFilters;
  customerType?: StrapiFilters;
  rating?: StrapiFilters;
  isFeatured?: StrapiFilters;
  isActive?: StrapiFilters;
  project?: StrapiFilters;
  testimonialType?: StrapiFilters;
}

export interface JobFilters {
  title?: StrapiFilters;
  department?: StrapiFilters;
  location?: StrapiFilters;
  employmentType?: StrapiFilters;
  experienceLevel?: StrapiFilters;
  isActive?: StrapiFilters;
}

export interface NewsArticleFilters {
  title?: StrapiFilters;
  category?: StrapiFilters;
  author?: StrapiFilters;
  tags?: StrapiFilters;
  isPublished?: StrapiFilters;
  isFeatured?: StrapiFilters;
  publishDate?: StrapiFilters;
}

/**
 * Query Types with specific filters
 */
export interface ProjectQuery extends Omit<StrapiQuery, 'filters'> {
  filters?: ProjectFilters;
}

export interface DocumentQuery extends Omit<StrapiQuery, 'filters'> {
  filters?: DocumentFilters;
}

export interface ConstructionUpdateQuery extends Omit<StrapiQuery, 'filters'> {
  filters?: ConstructionUpdateFilters;
}

export interface TestimonialQuery extends Omit<StrapiQuery, 'filters'> {
  filters?: TestimonialFilters;
}

export interface JobQuery extends Omit<StrapiQuery, 'filters'> {
  filters?: JobFilters;
}

export interface NewsArticleQuery extends Omit<StrapiQuery, 'filters'> {
  filters?: NewsArticleFilters;
}

/**
 * Advanced Query Options
 */
export interface ProjectAdvancedQuery {
  status?: string;
  type?: string;
  location?: string;
  city?: string;
  priceMin?: number;
  priceMax?: number;
  search?: string;
  isFeatured?: boolean;
  limit?: number;
  page?: number;
  sortBy?: 'name' | 'createdAt' | 'constructionStart' | 'constructionEnd';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Search Query Types
 */
export interface SearchQuery {
  query: string;
  contentTypes?: string[];
  limit?: number;
  page?: number;
}

export interface SearchResult {
  id: number;
  title: string;
  excerpt: string;
  type: 'project' | 'news' | 'job' | 'page';
  url: string;
  image?: string;
  publishDate?: string;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

/**
 * Form Submission Types
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  source?: 'website' | 'phone' | 'email' | 'walk_in' | 'referral';
  projectId?: number;
  inquiry?: 'general' | 'pricing' | 'viewing' | 'photos' | 'documents';
}

export interface JobApplicationData {
  name: string;
  email: string;
  phone?: string;
  resume: File;
  coverLetter?: string;
  experience?: string;
  jobId: number;
}

export interface NewsletterSubscriptionData {
  email: string;
  name?: string;
  interests?: string[];
}

/**
 * Bulk Operation Types
 */
export interface BulkOperationRequest<T> {
  action: 'create' | 'update' | 'delete';
  data: T[];
}

export interface BulkOperationResponse {
  success: boolean;
  processed: number;
  failed: number;
  errors?: Array<{
    index: number;
    error: string;
  }>;
}

/**
 * File Upload Types
 */
export interface FileUploadRequest {
  files: FileList;
  path?: string;
  refId?: number;
  ref?: string;
  field?: string;
}

export interface FileUploadResponse {
  id: number;
  name: string;
  url: string;
  size: number;
  mime: string;
}

// APIError is now imported from './errors'

/**
 * API Client Configuration
 */
// APIConfig is now imported from './config'

/**
 * Rate Limiting Types
 */
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Webhook Types
 */
export interface WebhookPayload<T = any> {
  event: string;
  model: string;
  entry: T;
  createdAt: string;
}

/**
 * Analytics Types
 */
export interface PageViewEvent {
  path: string;
  title: string;
  userId?: string;
  sessionId: string;
  timestamp: string;
  referrer?: string;
  userAgent: string;
}

export interface DownloadEvent {
  documentId: number;
  projectId?: number;
  userId?: string;
  sessionId: string;
  timestamp: string;
  userAgent: string;
}