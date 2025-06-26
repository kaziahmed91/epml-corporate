/**
 * Core Strapi v5 Type Definitions
 * 
 * These types define the core structure of Strapi v5 responses and data formats.
 * They provide a foundation for all content types and API interactions.
 * 
 * @fileoverview Core Strapi v5 type definitions
 */

/**
 * Base Strapi entity with common fields
 */
export interface StrapiEntity {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale?: string;
}

/**
 * Strapi v5 API response wrapper
 */
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Strapi v5 collection response
 */
export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Strapi v5 media/file structure
 */
export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: Record<string, any> | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

/**
 * Strapi media format (thumbnail, small, medium, large)
 */
export interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
  path: string | null;
  sizeInBytes: number;
  provider_metadata?: Record<string, any>;
}

/**
 * Strapi relation wrapper
 */
export interface StrapiRelation<T> {
  data: T | null;
}

/**
 * Strapi collection relation wrapper
 */
export interface StrapiCollectionRelation<T> {
  data: T[];
}

/**
 * Generic Strapi populate options
 */
export type StrapiPopulateValue = 
  | '*' 
  | string 
  | string[] 
  | boolean;

export type StrapiPopulate = 
  | '*' 
  | string 
  | string[] 
  | Record<string, StrapiPopulateValue>;

/**
 * Strapi filter operators
 */
export interface StrapiFilters {
  $eq?: any;
  $ne?: any;
  $lt?: any;
  $lte?: any;
  $gt?: any;
  $gte?: any;
  $in?: any[];
  $notIn?: any[];
  $contains?: string;
  $notContains?: string;
  $containsi?: string;
  $notContainsi?: string;
  $null?: boolean;
  $notNull?: boolean;
  $between?: [any, any];
  $startsWith?: string;
  $endsWith?: string;
  $or?: StrapiFilters[];
  $and?: StrapiFilters[];
  $not?: StrapiFilters;
}

/**
 * Strapi query parameters
 */
export interface StrapiQuery {
  filters?: Record<string, StrapiFilters | any>;
  populate?: StrapiPopulate;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  publicationState?: 'live' | 'preview';
  locale?: string | string[];
}

/**
 * Strapi error response
 */
export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: Record<string, any>;
}

/**
 * Strapi error collection
 */
export interface StrapiErrorResponse {
  data: null;
  error: StrapiError;
}