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

// Project types
export interface ProjectAttributes {
  title: string;
  slug: string;
  description: string;
  content: string;
  featuredImage: StrapiImage;
  gallery: {
    data: StrapiData<{
      url: string;
      alternativeText?: string;
    }>[];
  };
  status: StrapiRelation<{
    name: string;
    slug: string;
  }>;
  type: StrapiRelation<{
    name: string;
    slug: string;
  }>;
  location: StrapiRelation<{
    name: string;
    slug: string;
    lat: number;
    lng: number;
  }>;
  city: StrapiRelation<{
    name: string;
    slug: string;
  }>;
  startDate?: string;
  endDate?: string;
  unitTypes?: {
    name: string;
    description: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
  }[];
  amenities?: string[];
  brochureUrl?: string;
  floorPlanUrl?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Project extends ProjectAttributes {
  id: number;
}

export type ProjectResponse = StrapiResponse<StrapiData<ProjectAttributes>>;
export type ProjectListResponse = StrapiResponse<StrapiData<ProjectAttributes>[]>;

// Recent news types
export interface RecentNewsAttributes {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: StrapiImage;
  publishedAt: string;
  author?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RecentNews extends RecentNewsAttributes {
  id: number;
}

export type RecentNewsResponse = StrapiResponse<StrapiData<RecentNewsAttributes>>;
export type RecentNewsListResponse = StrapiResponse<StrapiData<RecentNewsAttributes>[]>;

// Location types
export interface LocationAttributes {
  name: string;
  slug: string;
  description?: string;
  lat: number;
  lng: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Location extends LocationAttributes {
  id: number;
}

export type LocationResponse = StrapiResponse<StrapiData<LocationAttributes>>;
export type LocationListResponse = StrapiResponse<StrapiData<LocationAttributes>[]>;

// ProjectStatus types
export interface ProjectStatusAttributes {
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ProjectStatus extends ProjectStatusAttributes {
  id: number;
}

export type ProjectStatusResponse = StrapiResponse<StrapiData<ProjectStatusAttributes>>;
export type ProjectStatusListResponse = StrapiResponse<StrapiData<ProjectStatusAttributes>[]>;

// ProjectType types
export interface ProjectTypeAttributes {
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ProjectType extends ProjectTypeAttributes {
  id: number;
}

export type ProjectTypeResponse = StrapiResponse<StrapiData<ProjectTypeAttributes>>;
export type ProjectTypeListResponse = StrapiResponse<StrapiData<ProjectTypeAttributes>[]>;

// City types
export interface CityAttributes {
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface City extends CityAttributes {
  id: number;
}

export type CityResponse = StrapiResponse<StrapiData<CityAttributes>>;
export type CityListResponse = StrapiResponse<StrapiData<CityAttributes>[]>;

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