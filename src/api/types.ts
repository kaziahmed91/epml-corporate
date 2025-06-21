// Strapi common types
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
      name: string;
      alternativeText: string | null;
      caption: string | null;
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
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface StrapiRelation<T> {
  data: StrapiData<T> | null;
}

export interface StrapiRelationMultiple<T> {
  data: StrapiData<T>[];
}

// Component types based on backend structure
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface PhotoItem {
  photo: StrapiImage;
  category: 'exterior' | 'interior' | 'amenities' | 'floor_plans' | 'brochure' | 'construction_progress' | 'site_plan' | 'location' | 'view' | 'parking' | 'featured';
  caption?: string;
  isMain: boolean;
}

export interface ResidentialSpecifications {
  bedrooms?: number;
  bathrooms?: number;
  livingRooms?: number;
  kitchens?: number;
  diningRooms?: number;
  balconies?: number;
  terraces?: number;
  studyRooms?: number;
  servantRooms?: number;
  storageRooms?: number;
  washRooms?: number;
  prayerRooms?: number;
  familyRooms?: number;
  guestRooms?: number;
  additionalFeatures?: string[];
}

export interface CommercialSpecifications {
  type: 'ATM' | 'Bank' | 'Clinic' | 'Diagnostic_Center' | 'Food_Court' | 'Gym' | 'Kids_Zone' | 'Office' | 'Pharmacy' | 'Restaurant' | 'Salon' | 'Shop' | 'Showroom';
  description?: string;
  powerLoad?: string;
  airConditioning?: string;
  storageArea?: string;
  additionalFeatures?: string[];
}

export interface Dimensions {
  length?: number;
  width?: number;
  height?: number;
  area?: number;
  builtUpArea?: number;
  carpetArea?: number;
  balconyArea?: number;
  terraceArea?: number;
  commonArea?: number;
  parkingArea?: number;
  unit?: 'sqft' | 'sqm' | 'katha' | 'bigha' | 'acre';
}

export interface FloorUnit {
  unitName: string;
  unitType: 'residential' | 'commercial' | 'parking' | 'utility';
  isAvailable: boolean;
  specifications?: ResidentialSpecifications | CommercialSpecifications;
  dimensions?: Dimensions;
  price?: number;
  currency?: string;
  layoutPlan?: StrapiImage;
  features?: string[];
}

export interface ProjectFloor {
  floorNumber: number;
  floorName: string;
  floorType: 'residential' | 'commercial' | 'parking' | 'utility' | 'mixed';
  description?: string;
  commercialType?: 'mobile_floor' | 'kids' | 'womens_fashion' | 'mens_fashion' | 'electronics' | 'home_appliances' | 'books_stationery' | 'food_court' | 'restaurants' | 'salon_spa' | 'gym_fitness' | 'medical_services' | 'offices' | 'banks_atm' | 'pharmacy' | 'grocery_convenience' | 'entertainment' | 'services' | 'other';
  units: FloorUnit[];
  layoutPlan?: StrapiImage;
  isActive: boolean;
}

export interface UnitTypes {
  unitName: string;
  unitType: 'residential' | 'commercial' | 'parking' | 'utility';
  category: 'apartment' | 'duplex' | 'penthouse' | 'studio' | 'office' | 'shop' | 'showroom' | 'restaurant' | 'warehouse' | 'parking_space' | 'storage' | 'other';
  isAvailable: boolean;
  totalUnits?: number;
  availableUnits?: number;
  residential?: ResidentialSpecifications;
  commercial?: CommercialSpecifications;
  dimensions?: Dimensions;
  price?: number;
  currency?: string;
  layoutPlan?: StrapiImage;
  features?: string[];
  specifications?: string[];
}

export interface FeatureItem {
  name: string;
  description?: string;
  icon?: string;
  category?: string;
  isActive: boolean;
}

export interface AmenityItem {
  name: string;
  description?: string;
  icon?: string;
  category?: string;
  isActive: boolean;
}

export interface YouTubeVideo {
  title: string;
  videoId: string;
  description?: string;
  thumbnail?: string;
  isActive: boolean;
}

export interface DocumentItem {
  title: string;
  description?: string;
  file?: StrapiImage;
  category: 'brochure' | 'floor_plan' | 'site_plan' | 'approval' | 'permit' | 'noc' | 'layout' | 'specification' | 'other';
  isPublic: boolean;
  order?: number;
}

export interface BulkPhotoUpload {
  title: string;
  description?: string;
  photos: StrapiImage[];
  category: 'exterior' | 'interior' | 'amenities' | 'floor_plans' | 'brochure' | 'construction_progress' | 'site_plan' | 'location' | 'view' | 'parking' | 'featured';
  uploadDate: string;
  isProcessed: boolean;
}

export interface PriceRange {
  min: number;
  max: number;
  currency: string;
  unit?: string;
  note?: string;
}

// Core content type interfaces
export interface CityAttributes {
  Name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface LocationAttributes {
  Name: string;
  city: StrapiRelation<CityAttributes>;
  coordinates?: Coordinates;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ProjectStatusAttributes {
  Name: string;
  Description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ProjectTypeAttributes {
  Name: string;
  Description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ProjectAttributes {
  name: string;
  description?: string;
  slug: string;
  constructionStart?: string;
  constructionEnd?: string;
  floors?: number;
  landSize?: number;
  landSizeUnit?: string;
  landFacing?: string;
  roadWidth?: number;
  roadWidthUnit?: string;
  parking_floors?: number;
  parking_spaces?: number;
  
  // Relations
  project_type: StrapiRelation<ProjectTypeAttributes>;
  location: StrapiRelation<LocationAttributes>;
  project_status: StrapiRelation<ProjectStatusAttributes>;
  
  // Components
  photos: PhotoItem[];
  residentialUnits: UnitTypes[];
  commercialFloors: ProjectFloor[];
  features: FeatureItem[];
  amenities: AmenityItem[];
  youtubeVideos: YouTubeVideo[];
  coordinates?: Coordinates;
  projectDocuments: DocumentItem[];
  bulkPhotoUploads: BulkPhotoUpload[];
  priceRange?: PriceRange;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface DocumentAttributes {
  title: string;
  description?: string;
  file: StrapiImage;
  category: 'brochure' | 'floor_plan' | 'site_plan' | 'approval' | 'permit' | 'noc' | 'layout' | 'specification' | 'other';
  isPublic: boolean;
  order?: number;
  project: StrapiRelation<ProjectAttributes>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ConstructionUpdateAttributes {
  title: string;
  description?: string;
  updateDate: string;
  progressPercentage?: number;
  photos?: StrapiImage[];
  workCompleted?: string[];
  upcomingWork?: string[];
  project: StrapiRelation<ProjectAttributes>;
  locale?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface TestimonialAttributes {
  customerName: string;
  customerTitle?: string;
  customerImage?: StrapiImage;
  testimonialText: string;
  rating?: number;
  projectName?: string;
  testimonialType: 'customer' | 'partner' | 'employee' | 'media';
  isFeatured: boolean;
  dateGiven?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface RecentNewsAttributes {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: StrapiImage;
  publishedAt: string;
  author?: string;
  tags?: string[];
  category?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FeatureTemplateAttributes {
  name: string;
  description?: string;
  icon?: string;
  category: 'security' | 'convenience' | 'utilities' | 'accessibility' | 'technology' | 'other';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface AmenityTemplateAttributes {
  name: string;
  description?: string;
  icon?: string;
  category: 'recreation' | 'wellness' | 'community' | 'parking' | 'services' | 'outdoor' | 'other';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Formatted types (with id included)
export interface Project extends ProjectAttributes {
  id: number;
}

export interface City extends CityAttributes {
  id: number;
}

export interface Location extends LocationAttributes {
  id: number;
}

export interface ProjectStatus extends ProjectStatusAttributes {
  id: number;
}

export interface ProjectType extends ProjectTypeAttributes {
  id: number;
}

export interface Document extends DocumentAttributes {
  id: number;
}

export interface ConstructionUpdate extends ConstructionUpdateAttributes {
  id: number;
}

export interface Testimonial extends TestimonialAttributes {
  id: number;
}

export interface RecentNews extends RecentNewsAttributes {
  id: number;
}

export interface FeatureTemplate extends FeatureTemplateAttributes {
  id: number;
}

export interface AmenityTemplate extends AmenityTemplateAttributes {
  id: number;
}

// Response types
export type ProjectResponse = StrapiResponse<StrapiData<ProjectAttributes>>;
export type ProjectListResponse = StrapiResponse<StrapiData<ProjectAttributes>[]>;
export type CityResponse = StrapiResponse<StrapiData<CityAttributes>>;
export type CityListResponse = StrapiResponse<StrapiData<CityAttributes>[]>;
export type LocationResponse = StrapiResponse<StrapiData<LocationAttributes>>;
export type LocationListResponse = StrapiResponse<StrapiData<LocationAttributes>[]>;
export type ProjectStatusResponse = StrapiResponse<StrapiData<ProjectStatusAttributes>>;
export type ProjectStatusListResponse = StrapiResponse<StrapiData<ProjectStatusAttributes>[]>;
export type ProjectTypeResponse = StrapiResponse<StrapiData<ProjectTypeAttributes>>;
export type ProjectTypeListResponse = StrapiResponse<StrapiData<ProjectTypeAttributes>[]>;
export type DocumentResponse = StrapiResponse<StrapiData<DocumentAttributes>>;
export type DocumentListResponse = StrapiResponse<StrapiData<DocumentAttributes>[]>;
export type ConstructionUpdateResponse = StrapiResponse<StrapiData<ConstructionUpdateAttributes>>;
export type ConstructionUpdateListResponse = StrapiResponse<StrapiData<ConstructionUpdateAttributes>[]>;
export type TestimonialResponse = StrapiResponse<StrapiData<TestimonialAttributes>>;
export type TestimonialListResponse = StrapiResponse<StrapiData<TestimonialAttributes>[]>;
export type RecentNewsResponse = StrapiResponse<StrapiData<RecentNewsAttributes>>;
export type RecentNewsListResponse = StrapiResponse<StrapiData<RecentNewsAttributes>[]>;
export type FeatureTemplateResponse = StrapiResponse<StrapiData<FeatureTemplateAttributes>>;
export type FeatureTemplateListResponse = StrapiResponse<StrapiData<FeatureTemplateAttributes>[]>;
export type AmenityTemplateResponse = StrapiResponse<StrapiData<AmenityTemplateAttributes>>;
export type AmenityTemplateListResponse = StrapiResponse<StrapiData<AmenityTemplateAttributes>[]>;

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  project?: string;
  newsletter?: boolean;
}

// Filter types for API queries
export interface ProjectFilters {
  name?: string;
  project_status?: string | number;
  project_type?: string | number;
  location?: string | number;
  city?: string | number;
}

export interface DocumentFilters {
  title?: string;
  category?: string;
  project?: string | number;
  isPublic?: boolean;
}

export interface ConstructionUpdateFilters {
  project?: string | number;
  updateDate?: string;
}

export interface TestimonialFilters {
  testimonialType?: string;
  isFeatured?: boolean;
  rating?: number;
}