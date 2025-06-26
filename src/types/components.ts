/**
 * Strapi Component Type Definitions
 * 
 * These types define all reusable components used in Strapi content types.
 * They mirror the backend component schemas for complete type safety.
 * 
 * @fileoverview Strapi component type definitions
 */

import { StrapiEntity, StrapiMedia } from './strapi';

/**
 * Project Photo Item Component
 */
export interface PhotoItem {
  id: number;
  photo: StrapiMedia;
  category: 'exterior' | 'interior' | 'construction_progress' | 'floor_plan' | 'amenities' | 'site_plan' | 'elevation' | 'lobby' | 'sample_unit' | 'parking' | 'common_areas' | 'landscaping' | 'brochure';
  subcategory: string | null;
  caption: string | null;
  sortOrder: number;
  isHero: boolean;
  isMain?: boolean;
}

/**
 * Bulk Photo Upload Component
 */
export interface BulkPhotoUpload {
  id: number;
  photos: StrapiMedia[];
  category: 'exterior' | 'interior' | 'construction_progress' | 'floor_plan' | 'amenities' | 'site_plan' | 'elevation' | 'lobby' | 'sample_unit' | 'parking' | 'common_areas' | 'landscaping' | 'brochure';
  subcategory: string | null;
  defaultCaption: string | null;
  photoMetadata: Record<string, any>[];
  sortOrder: number;
}

/**
 * Project Feature Component
 */
export interface ProjectFeature {
  id: number;
  name: string;
  description: string | null;
  icon: string | null;
  category: 'security' | 'convenience' | 'utilities' | 'accessibility' | 'technology';
  isHighlighted: boolean;
  sortOrder: number;
}

/**
 * Project Amenity Component
 */
export interface ProjectAmenity {
  id: number;
  name: string;
  description: string | null;
  icon: string | null;
  category: 'recreation' | 'wellness' | 'community' | 'parking' | 'services' | 'outdoor';
  isHighlighted: boolean;
  sortOrder: number;
}

/**
 * Residential Unit Specifications
 */
export interface ResidentialSpecifications {
  id: number;
  bedrooms: number | null;
  bathrooms: number | null;
  balconies: number | null;
  area: number | null;
  areaUnit: 'sqft' | 'sqm';
  facingDirection: string | null;
  floorRange: string | null;
  priceRange: string | null;
  isAvailable: boolean;
  features: string[];
}

/**
 * Commercial Specifications
 */
export interface CommercialSpecifications {
  id: number;
  area: number | null;
  areaUnit: 'sqft' | 'sqm';
  floorHeight: number | null;
  facingDirection: string | null;
  priceRange: string | null;
  isAvailable: boolean;
  suitableFor: string[];
  features: string[];
}

/**
 * Residential Unit Component
 */
export interface ResidentialUnit {
  id: number;
  unitName: string;
  unitType: string;
  residential: ResidentialSpecifications;
  floorPlan: StrapiMedia | null;
  unitPhotos: PhotoItem[];
  unitFeatures: ProjectFeature[];
  isShowcase: boolean;
  sortOrder: number;
}

/**
 * Commercial Floor Component
 */
export interface CommercialFloor {
  id: number;
  floorName: string;
  floorNumber: number | null;
  commercial: CommercialSpecifications;
  floorPlan: StrapiMedia | null;
  floorPhotos: PhotoItem[];
  isAvailable: boolean;
  sortOrder: number;
}

/**
 * Project Floor Component
 */
export interface ProjectFloor {
  id: number;
  floorNumber: number;
  floorName: string | null;
  floorType: 'residential' | 'commercial' | 'parking' | 'amenity' | 'mechanical';
  totalUnits: number | null;
  availableUnits: number | null;
  floorPlan: StrapiMedia | null;
  description: string | null;
}

/**
 * Floor Unit Component
 */
export interface FloorUnit {
  id: number;
  unitNumber: string;
  unitType: string;
  area: number | null;
  areaUnit: 'sqft' | 'sqm';
  bedrooms: number | null;
  bathrooms: number | null;
  balconies: number | null;
  facingDirection: string | null;
  isAvailable: boolean;
  priceRange: string | null;
  features: string[];
}

/**
 * YouTube Video Component
 */
export interface YouTubeVideo {
  id: number;
  title: string;
  videoId: string;
  description: string | null;
  thumbnail: StrapiMedia | null;
  category: 'virtual_tour' | 'construction_progress' | 'promotional' | 'testimonial' | 'walkthrough';
  isFeature: boolean;
  sortOrder: number;
}

/**
 * Coordinates Component
 */
export interface Coordinates {
  id: number;
  latitude: number;
  longitude: number;
  address: string | null;
  mapZoomLevel: number;
  showOnMap: boolean;
}

/**
 * Construction Progress Update Component
 */
export interface ConstructionProgressUpdate {
  id: number;
  updateDate: string;
  progressPercentage: number;
  workCompleted: string;
  nextMilestone: string | null;
  photos: PhotoItem[];
  description: string | null;
  isPublic: boolean;
}

/**
 * Contact Information Component
 */
export interface ContactInfo {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  role: string | null;
  isPublic: boolean;
  isPrimary: boolean;
}

/**
 * Rich Text Component
 */
export interface RichText {
  id: number;
  content: string;
  title: string | null;
  category: string | null;
}

/**
 * SEO Component
 */
export interface SEO {
  id: number;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  structuredData: Record<string, any> | null;
  canonicalURL: string | null;
  metaRobots: string | null;
  metaViewport: string | null;
  metaImage: StrapiMedia | null;
}

/**
 * Social Media Component
 */
export interface SocialMedia {
  id: number;
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok';
  url: string;
  handle: string | null;
  isActive: boolean;
}

/**
 * Union type for all components
 */
export type AnyComponent = 
  | PhotoItem
  | BulkPhotoUpload
  | ProjectFeature
  | ProjectAmenity
  | ResidentialSpecifications
  | CommercialSpecifications
  | ResidentialUnit
  | CommercialFloor
  | ProjectFloor
  | FloorUnit
  | YouTubeVideo
  | Coordinates
  | ConstructionProgressUpdate
  | ContactInfo
  | RichText
  | SEO
  | SocialMedia;