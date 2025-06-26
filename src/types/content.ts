/**
 * Content Type Definitions
 * 
 * These types define all main content types from Strapi.
 * They provide complete type safety for all content operations.
 * 
 * @fileoverview Main content type definitions
 */

import { StrapiEntity, StrapiMedia, StrapiRelation, StrapiCollectionRelation } from './strapi';
import {
  PhotoItem,
  BulkPhotoUpload,
  ProjectFeature,
  ProjectAmenity,
  ResidentialUnit,
  CommercialFloor,
  ProjectFloor,
  YouTubeVideo,
  Coordinates,
  ConstructionProgressUpdate,
  ContactInfo,
  SEO
} from './components';

/**
 * Project Status Content Type
 */
export interface ProjectStatus extends StrapiEntity {
  name: string;
  description: string | null;
  color: string | null;
  isActive: boolean;
  sortOrder: number;
}

/**
 * Project Type Content Type
 */
export interface ProjectType extends StrapiEntity {
  name: string;
  description: string | null;
  icon: string | null;
  isActive: boolean;
  sortOrder: number;
}

/**
 * City Content Type
 */
export interface City extends StrapiEntity {
  name: string;
  slug: string;
  description: string | null;
  coordinates: Coordinates | null;
  isActive: boolean;
  sortOrder: number;
  locations: StrapiCollectionRelation<Location>;
}

/**
 * Location Content Type
 */
export interface Location extends StrapiEntity {
  name: string;
  slug: string;
  description: string | null;
  coordinates: Coordinates | null;
  city: StrapiRelation<City>;
  isActive: boolean;
  sortOrder: number;
  projects: StrapiCollectionRelation<Project>;
}

/**
 * Project Content Type (Main)
 */
export interface Project extends StrapiEntity {
  name: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  constructionStart: string | null;
  constructionEnd: string | null;
  launchDate: string | null;
  handoverDate: string | null;
  totalFloors: number | null;
  landSize: number | null;
  landSizeUnit: 'katha' | 'bigha' | 'acre' | 'sqft' | 'sqm' | null;
  landFacing: string | null;
  roadWidth: number | null;
  parkingFloors: number | null;
  parkingSpaces: number | null;
  totalUnits: number | null;
  availableUnits: number | null;
  priceRange: string | null;
  
  // Relations
  projectStatus: StrapiRelation<ProjectStatus>;
  projectType: StrapiRelation<ProjectType>;
  location: StrapiRelation<Location>;
  
  // Components
  photos: PhotoItem[];
  bulkPhotoUploads: BulkPhotoUpload[];
  features: ProjectFeature[];
  amenities: ProjectAmenity[];
  residentialUnits: ResidentialUnit[];
  commercialFloors: CommercialFloor[];
  floors: ProjectFloor[];
  youtubeVideos: YouTubeVideo[];
  coordinates: Coordinates | null;
  constructionUpdates: ConstructionProgressUpdate[];
  contactInfo: ContactInfo[];
  seo: SEO | null;
  
  // Content
  brochure: StrapiMedia | null;
  floorPlan: StrapiMedia | null;
  sitePlan: StrapiMedia | null;
  approvalDocuments: StrapiMedia[];
  
  // Meta
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  
  // Relations
  documents: StrapiCollectionRelation<Document>;
  testimonials: StrapiCollectionRelation<Testimonial>;
}

/**
 * Document Content Type
 */
export interface Document extends StrapiEntity {
  title: string;
  description: string | null;
  file: StrapiMedia;
  category: 'brochure' | 'floor_plan' | 'site_plan' | 'approval' | 'permit' | 'noc' | 'layout' | 'specification' | 'other';
  subcategory: string | null;
  fileSize: number | null;
  downloadCount: number;
  isPublic: boolean;
  isActive: boolean;
  sortOrder: number;
  
  // Relations
  project: StrapiRelation<Project>;
}

/**
 * Construction Update Content Type
 */
export interface ConstructionUpdate extends StrapiEntity {
  title: string;
  content: string | null;
  updateDate: string;
  progressPercentage: number;
  workCompleted: string;
  nextMilestone: string | null;
  photos: PhotoItem[];
  isPublic: boolean;
  isActive: boolean;
  
  // Relations
  project: StrapiRelation<Project>;
}

/**
 * Testimonial Content Type
 */
export interface Testimonial extends StrapiEntity {
  customerName: string;
  designation: string | null;
  companyName: string | null;
  content: string;
  rating: number | null;
  customerPhoto: StrapiMedia | null;
  customerType: 'customer' | 'partner' | 'employee' | 'media';
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  
  // Relations
  project: StrapiRelation<Project>;
}

/**
 * Feature Template Content Type
 */
export interface FeatureTemplate extends StrapiEntity {
  name: string;
  description: string | null;
  icon: string | null;
  category: 'security' | 'convenience' | 'utilities' | 'accessibility' | 'technology';
  isActive: boolean;
  sortOrder: number;
}

/**
 * Amenity Template Content Type
 */
export interface AmenityTemplate extends StrapiEntity {
  name: string;
  description: string | null;
  icon: string | null;
  category: 'recreation' | 'wellness' | 'community' | 'parking' | 'services' | 'outdoor';
  isActive: boolean;
  sortOrder: number;
}

/**
 * Recent News Content Type (Single Type)
 */
export interface RecentNews extends StrapiEntity {
  title: string;
  content: string;
  publishDate: string;
  featuredImage: StrapiMedia | null;
  tags: string[];
  isActive: boolean;
}

/**
 * Contact Submission Content Type
 */
export interface ContactSubmission extends StrapiEntity {
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  source: 'website' | 'phone' | 'email' | 'walk_in' | 'referral';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
  notes: string | null;
  
  // Relations
  project: StrapiRelation<Project> | null;
}

/**
 * Job Content Type
 */
export interface Job extends StrapiEntity {
  title: string;
  slug: string;
  description: string;
  requirements: string | null;
  responsibilities: string | null;
  department: string | null;
  location: string | null;
  employmentType: 'full_time' | 'part_time' | 'contract' | 'internship';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
  salaryRange: string | null;
  applicationDeadline: string | null;
  isActive: boolean;
  sortOrder: number;
}

/**
 * News Article Content Type
 */
export interface NewsArticle extends StrapiEntity {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: StrapiMedia | null;
  publishDate: string;
  author: string | null;
  tags: string[];
  category: string | null;
  isPublished: boolean;
  isFeatured: boolean;
  viewCount: number;
  
  // SEO
  seo: SEO | null;
}

/**
 * Union type for all content types
 */
export type AnyContentType = 
  | Project
  | ProjectStatus
  | ProjectType
  | City
  | Location
  | Document
  | ConstructionUpdate
  | Testimonial
  | FeatureTemplate
  | AmenityTemplate
  | RecentNews
  | ContactSubmission
  | Job
  | NewsArticle;