/**
 * Comprehensive Type Definitions for EPML Properties
 * 
 * This is the main type barrel file that exports all types used throughout the application.
 * Follows industry best practices for type organization and extensibility.
 * 
 * @fileoverview Main type exports for the entire application
 * @version 2.0.0
 */

// Core Strapi Types
export type {
  StrapiEntity,
  StrapiResponse,
  StrapiCollectionResponse,
  StrapiRelation,
  StrapiMedia,
  StrapiMetadata,
  StrapiQuery,
  StrapiFilters,
  StrapiSort,
  StrapiPagination,
  StrapiPopulate,
  StrapiPopulateValue
} from './strapi';

// Content Types
export type {
  Project,
  ProjectStatus,
  ProjectType,
  Location,
  City,
  Document,
  ConstructionUpdate,
  Testimonial,
  RecentNews,
  FeatureTemplate,
  AmenityTemplate
} from './content';

// Component Types  
export type {
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

// API Types
export {
  APIResponse,
  APIError as APIErrorType,
  APIConfig,
  StrapiQueryFilters,
  ProjectFilters,
  LocationFilters,
  DocumentFilters,
  TestimonialFilters,
  StrapiQueryParams
} from './api';

// UI/Component Props Types
export {
  PageProps,
  ProjectDetailPageProps,
  ProjectCardProps,
  LocationMapProps,
  FilterComponentProps,
  LoadingStateProps,
  ErrorBoundaryProps as ErrorBoundaryPropsType
} from './ui';

// Utility Types
export {
  FormState as FormStateType,
  ValidationRule,
  ValidationRules,
  MenuItem,
  Route,
  AppConfig,
  ThemeConfig
} from './utils';

// Form Types
export {
  ContactFormData as ContactFormDataType
} from './forms';

// Navigation Types - currently empty, will be populated as needed
// export {} from './navigation';

// Error Types
export {
  ValidationError
} from './errors';

// Configuration Types - currently empty, will be populated as needed
// export {} from './config';