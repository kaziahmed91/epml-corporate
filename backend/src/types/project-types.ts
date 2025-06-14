// src/types/project-types.ts
export interface ProjectData {
  name: string;
  slug: string;
  address: string;
  description: string;
  floors?: string;
  landSize?: string;
  landFacing?:
    | "East"
    | "West"
    | "South"
    | "North"
    | "Corner Plot"
    | "East-West"
    | "North-South";
  roadWidth?: number;
  parking_floors?: number;
  parking_spaces?: number;
  project_type?: number;
  location?: number;
  project_status?: number;
  features?: FeatureItem[];
  amenities?: AmenityItem[];
  Unit?: UnitType[];
  projectFloors?: ProjectFloor[];
  constructionUpdates?: ConstructionUpdate[];
  testimonials?: TestimonialData[];
  mediaFiles?: MediaFile[];
  youtubeVideos?: YouTubeVideo[];
}

export interface FeatureItem {
  name: string;
  icon: string;
  category:
    | "security"
    | "convenience"
    | "utilities"
    | "accessibility"
    | "technology";
}

export interface AmenityItem {
  name: string;
  icon: string;
  category:
    | "recreation"
    | "wellness"
    | "community"
    | "parking"
    | "services"
    | "outdoor"
    | "security"
    | "utilities";
}

export interface UnitType {
  name: string;
  unitCategory: "residential" | "commercial" | "parking" | "utility";
  type?:
    | "studio"
    | "1bed"
    | "2bed"
    | "3bed"
    | "4bed"
    | "penthouse"
    | "duplex"
    | "shop"
    | "showroom"
    | "atm"
    | "food_court"
    | "bank"
    | "office"
    | "warehouse";
  dimensions?: DimensionsSpec;
  residentialSpecs?: ResidentialSpec;
  commercialSpecs?: CommercialSpec;
  facing?: (
    | "North"
    | "South"
    | "East"
    | "West"
    | "North-East"
    | "North-West"
    | "South-East"
    | "South-West"
  )[];
  floors?: number[];
  features?: string[];
  description?: string;
  hasLayoutPlan?: boolean;
}

export interface DimensionsSpec {
  length?: number;
  width?: number;
  height?: number;
  totalArea?: number;
  carpetArea?: number;
  balconyArea?: number;
}

export interface ResidentialSpec {
  bedrooms?: number;
  bathrooms?: number;
  livingRooms?: number;
  diningRooms?: number;
  kitchens?: number;
  balconies?: number;
  studyRooms?: number;
  servantRooms?: number;
  storeRooms?: number;
  parkingSpaces?: number;
  additionalFeatures?: Record<string, any>;
}

export interface CommercialSpec {
  commercialType?:
    | "ATM"
    | "Food Court"
    | "Small Shop"
    | "Large Shop"
    | "Showroom"
    | "Bank"
    | "Office"
    | "Warehouse"
    | "Restaurant"
    | "Clinic"
    | "Salon"
    | "Pharmacy"
    | "Other";
  frontage?: number;
  basement?: boolean;
  mezzanine?: boolean;
  loadingDock?: boolean;
  powerLoad?: string;
  airConditioning?: "Central" | "Split" | "Window" | "None" | "Provision";
  washrooms?: number;
  storageArea?: number;
  additionalFeatures?: Record<string, any>;
}

export interface ConstructionUpdate {
  month: number;
  year: number;
  stage: string;
  description: string;
  progressPercentage: number;
  workCompleted: string[];
  upcomingWork: string[];
}

export interface TestimonialData {
  customerName: string;
  customerTitle?: string;
  content: string;
  rating: number;
  type: "customer" | "landowner" | "employee" | "partner";
}

export interface MediaFile {
  fileName: string;
  filePath: string;
  category: "project_image" | "floor_plan" | "brochure" | "video";
}

export interface YouTubeVideo {
  title: string;
  youtubeUrl: string;
  description?: string;
  displayOrder: number;
}

export interface DocumentItem {
  displayName: string;
  category:
    | "Floor Plans"
    | "Architectural Drawings"
    | "Approvals"
    | "Legal Documents"
    | "Specifications"
    | "Other";
  description?: string;
  displayOrder: number;
}

export interface ProjectFloor {
  number: number;
  name: string;
  layoutGroup: 
    | "ground"
    | "mixed_commercial"
    | "standard_shops"
    | "commercial_top"
    | "residential_standard"
    | "offices"
    | "basement"
    | "parking"
    | "utility";
  category:
    | "premium_retail"
    | "premium_commercial"
    | "standard_retail"
    | "standard_commercial"
    | "residential"
    | "office_space"
    | "parking"
    | "utility"
    | "mixed_use";
  purpose?:
    | "mens_fashion"
    | "womens_fashion"
    | "mixed_retail_office"
    | "mobile_tech"
    | "electronics"
    | "food_court"
    | "professional_offices"
    | "apartments"
    | "parking"
    | "utility"
    | "mixed_purpose";
  totalArea: number;
  ceilingHeight?: string;
  hasLayoutPlan?: boolean;
  sharedWith?: number[];
  units: FloorUnit[];
  features?: string[];
  description?: string;
}

export interface FloorUnit {
  number: string;
  type:
    | "shop"
    | "office"
    | "showroom"
    | "1bhk"
    | "2bhk"
    | "3bhk"
    | "4bhk"
    | "studio"
    | "penthouse"
    | "duplex"
    | "warehouse"
    | "atm"
    | "food_court"
    | "bank"
    | "clinic"
    | "salon"
    | "pharmacy"
    | "restaurant";
  area: number;
  description?: string;
  isAvailable?: boolean;
  price?: number;
  features?: string[];
}
