/**
 * Type-Safe API Client
 * 
 * This module provides a comprehensive, type-safe API client for interacting
 * with the Strapi backend. It includes proper error handling, retry logic,
 * and complete TypeScript support.
 * 
 * @fileoverview Type-safe API client implementation
 */

import type {
  StrapiResponse,
  StrapiCollectionResponse,
  StrapiQuery,
  StrapiError,
  StrapiErrorResponse,
  APIError,
  APIConfig,
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
  NewsArticle,
  ProjectFilters,
  DocumentFilters,
  ConstructionUpdateFilters,
  TestimonialFilters,
  JobFilters,
  NewsArticleFilters,
  ProjectAdvancedQuery,
  SearchQuery,
  SearchResponse,
  ContactFormData,
  JobApplicationData,
  NewsletterSubscriptionData,
  FileUploadRequest,
  FileUploadResponse,
  BulkOperationRequest,
  BulkOperationResponse
} from '@/types';

/**
 * API Client Class
 */
export class APIClient {
  private config: APIConfig;
  private baseURL: string;
  private headers: Record<string, string>;

  constructor(config: APIConfig) {
    this.config = config;
    this.baseURL = config.baseURL;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiToken}`,
    };
  }

  /**
   * Generic HTTP request method with error handling and retries
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<T> {
    const url = `${this.baseURL}/api${endpoint}`;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
      
      const response = await fetch(url, {
        headers: this.headers,
        signal: controller.signal,
        ...options,
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw this.createAPIError(response, errorData, url);
      }

      return await response.json();
    } catch (error) {
      if (retryCount < this.config.retries && this.shouldRetry(error)) {
        await this.delay(Math.pow(2, retryCount) * 1000); // Exponential backoff
        return this.request<T>(endpoint, options, retryCount + 1);
      }
      throw error;
    }
  }

  /**
   * Create API error with proper typing
   */
  private createAPIError(response: Response, errorData: any, url: string): APIError {
    return {
      name: 'APIError',
      message: errorData?.error?.message || response.statusText || 'API request failed',
      status: response.status,
      statusText: response.statusText,
      url,
      method: 'GET', // Will be overridden in specific methods
      details: errorData?.error?.details,
      retryable: this.isRetryableStatus(response.status),
    };
  }

  /**
   * Determine if error should trigger a retry
   */
  private shouldRetry(error: any): boolean {
    if (error.status) {
      return this.isRetryableStatus(error.status);
    }
    return error.name === 'TimeoutError' || error.name === 'NetworkError';
  }

  /**
   * Check if HTTP status is retryable
   */
  private isRetryableStatus(status: number): boolean {
    return status >= 500 || status === 408 || status === 429;
  }

  /**
   * Delay utility for retries
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Build query string from Strapi query parameters
   */
  private buildQueryString(query: StrapiQuery): string {
    const params = new URLSearchParams();
    
    // Add filters
    if (query.filters) {
      Object.entries(query.filters).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([operator, operatorValue]) => {
            params.append(`filters[${key}][${operator}]`, String(operatorValue));
          });
        } else {
          params.append(`filters[${key}][$eq]`, String(value));
        }
      });
    }

    // Add populate
    if (query.populate) {
      if (typeof query.populate === 'string') {
        params.append('populate', query.populate);
      } else if (Array.isArray(query.populate)) {
        query.populate.forEach(field => {
          params.append('populate[]', field);
        });
      } else {
        Object.entries(query.populate).forEach(([key, value]) => {
          params.append(`populate[${key}]`, String(value));
        });
      }
    }

    // Add sorting
    if (query.sort) {
      if (Array.isArray(query.sort)) {
        query.sort.forEach(field => {
          params.append('sort[]', field);
        });
      } else {
        params.append('sort', query.sort);
      }
    }

    // Add pagination
    if (query.pagination) {
      Object.entries(query.pagination).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(`pagination[${key}]`, String(value));
        }
      });
    }

    // Add other parameters
    if (query.publicationState) {
      params.append('publicationState', query.publicationState);
    }
    if (query.locale) {
      if (Array.isArray(query.locale)) {
        query.locale.forEach(loc => {
          params.append('locale[]', loc);
        });
      } else {
        params.append('locale', query.locale);
      }
    }

    return params.toString();
  }

  // ============================================================================
  // PROJECT METHODS
  // ============================================================================

  /**
   * Get all projects with optional filtering
   */
  async getProjects(query: StrapiQuery = {}): Promise<Project[]> {
    const queryString = this.buildQueryString(query);
    const response = await this.request<StrapiCollectionResponse<Project>>(
      `/projects?${queryString}`
    );
    return response.data;
  }

  /**
   * Get a single project by ID
   */
  async getProject(id: number, query: StrapiQuery = {}): Promise<Project> {
    const queryString = this.buildQueryString(query);
    const response = await this.request<StrapiResponse<Project>>(
      `/projects/${id}?${queryString}`
    );
    return response.data;
  }

  /**
   * Get a project by slug
   */
  async getProjectBySlug(slug: string, query: StrapiQuery = {}): Promise<Project | null> {
    const fullQuery = {
      ...query,
      filters: {
        ...query.filters,
        slug: { $eq: slug }
      }
    };
    const projects = await this.getProjects(fullQuery);
    return projects.length > 0 ? projects[0] : null;
  }

  /**
   * Search projects with advanced options
   */
  async searchProjects(searchQuery: ProjectAdvancedQuery): Promise<{
    projects: Project[];
    pagination?: any;
  }> {
    const query: StrapiQuery = {
      filters: {},
      pagination: {
        page: searchQuery.page || 1,
        pageSize: searchQuery.limit || 10
      },
      sort: searchQuery.sortBy ? 
        `${searchQuery.sortBy}:${searchQuery.sortOrder || 'asc'}` : 
        'createdAt:desc'
    };

    // Add search filters
    if (searchQuery.search) {
      query.filters!.$or = [
        { name: { $containsi: searchQuery.search } },
        { description: { $containsi: searchQuery.search } }
      ];
    }

    if (searchQuery.status) {
      query.filters!.projectStatus = { name: { $eq: searchQuery.status } };
    }

    if (searchQuery.type) {
      query.filters!.projectType = { name: { $eq: searchQuery.type } };
    }

    if (searchQuery.location) {
      query.filters!.location = { name: { $eq: searchQuery.location } };
    }

    if (searchQuery.city) {
      query.filters!.location = { 
        ...query.filters!.location,
        city: { name: { $eq: searchQuery.city } }
      };
    }

    if (searchQuery.priceMin !== undefined) {
      query.filters!.priceRange = { $gte: searchQuery.priceMin };
    }

    if (searchQuery.priceMax !== undefined) {
      query.filters!.priceRange = { 
        ...query.filters!.priceRange,
        $lte: searchQuery.priceMax 
      };
    }

    if (searchQuery.isFeatured !== undefined) {
      query.filters!.isFeatured = { $eq: searchQuery.isFeatured };
    }

    const queryString = this.buildQueryString(query);
    const response = await this.request<StrapiCollectionResponse<Project>>(
      `/projects?${queryString}`
    );

    return {
      projects: response.data,
      pagination: response.meta?.pagination
    };
  }

  // ============================================================================
  // LOCATION METHODS
  // ============================================================================

  /**
   * Get all cities
   */
  async getCities(query: StrapiQuery = {}): Promise<City[]> {
    const queryString = this.buildQueryString(query);
    const response = await this.request<StrapiCollectionResponse<City>>(
      `/cities?${queryString}`
    );
    return response.data;
  }

  /**
   * Get all locations
   */
  async getLocations(query: StrapiQuery = {}): Promise<Location[]> {
    const queryString = this.buildQueryString(query);
    const response = await this.request<StrapiCollectionResponse<Location>>(
      `/locations?${queryString}`
    );
    return response.data;
  }

  /**
   * Get locations by city
   */
  async getLocationsByCity(cityId: number): Promise<Location[]> {
    return this.getLocations({
      filters: { city: { id: { $eq: cityId } } }
    });
  }

  // ============================================================================
  // CONTENT METHODS
  // ============================================================================

  /**
   * Get project statuses
   */
  async getProjectStatuses(): Promise<ProjectStatus[]> {
    const response = await this.request<StrapiCollectionResponse<ProjectStatus>>('/project-statuses');
    return response.data;
  }

  /**
   * Get project types
   */
  async getProjectTypes(): Promise<ProjectType[]> {
    const response = await this.request<StrapiCollectionResponse<ProjectType>>('/project-types');
    return response.data;
  }

  /**
   * Get documents with filtering
   */
  async getDocuments(query: StrapiQuery = {}): Promise<Document[]> {
    const queryString = this.buildQueryString(query);
    const response = await this.request<StrapiCollectionResponse<Document>>(
      `/documents?${queryString}`
    );
    return response.data;
  }

  /**
   * Get construction updates
   */
  async getConstructionUpdates(query: StrapiQuery = {}): Promise<ConstructionUpdate[]> {
    const queryString = this.buildQueryString(query);
    const response = await this.request<StrapiCollectionResponse<ConstructionUpdate>>(
      `/construction-updates?${queryString}`
    );
    return response.data;
  }

  /**
   * Get testimonials
   */
  async getTestimonials(query: StrapiQuery = {}): Promise<Testimonial[]> {
    const queryString = this.buildQueryString(query);
    const response = await this.request<StrapiCollectionResponse<Testimonial>>(
      `/testimonials?${queryString}`
    );
    return response.data;
  }

  /**
   * Get feature templates
   */
  async getFeatureTemplates(): Promise<FeatureTemplate[]> {
    const response = await this.request<StrapiCollectionResponse<FeatureTemplate>>('/feature-templates');
    return response.data;
  }

  /**
   * Get amenity templates
   */
  async getAmenityTemplates(): Promise<AmenityTemplate[]> {
    const response = await this.request<StrapiCollectionResponse<AmenityTemplate>>('/amenity-templates');
    return response.data;
  }

  /**
   * Get recent news
   */
  async getRecentNews(): Promise<RecentNews | null> {
    try {
      const response = await this.request<StrapiResponse<RecentNews>>('/recent-news');
      return response.data;
    } catch (error) {
      if ((error as APIError).status === 404) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Get jobs
   */
  async getJobs(query: StrapiQuery = {}): Promise<Job[]> {
    const queryString = this.buildQueryString(query);
    const response = await this.request<StrapiCollectionResponse<Job>>(
      `/jobs?${queryString}`
    );
    return response.data;
  }

  /**
   * Get news articles
   */
  async getNewsArticles(query: StrapiQuery = {}): Promise<NewsArticle[]> {
    const queryString = this.buildQueryString(query);
    const response = await this.request<StrapiCollectionResponse<NewsArticle>>(
      `/news-articles?${queryString}`
    );
    return response.data;
  }

  // ============================================================================
  // FORM SUBMISSION METHODS
  // ============================================================================

  /**
   * Submit contact form
   */
  async submitContactForm(data: ContactFormData): Promise<ContactSubmission> {
    const response = await this.request<StrapiResponse<ContactSubmission>>(
      '/contact-submissions',
      {
        method: 'POST',
        body: JSON.stringify({ data }),
      }
    );
    return response.data;
  }

  /**
   * Submit job application
   */
  async submitJobApplication(data: JobApplicationData): Promise<any> {
    const formData = new FormData();
    
    // Add text fields
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'resume' && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    // Add resume file
    if (data.resume) {
      formData.append('resume', data.resume);
    }

    const response = await this.request<any>(
      '/job-applications',
      {
        method: 'POST',
        headers: {
          'Authorization': this.headers.Authorization,
          // Don't set Content-Type for FormData
        },
        body: formData,
      }
    );
    return response;
  }

  /**
   * Subscribe to newsletter
   */
  async subscribeNewsletter(data: NewsletterSubscriptionData): Promise<any> {
    const response = await this.request<any>(
      '/newsletter-subscriptions',
      {
        method: 'POST',
        body: JSON.stringify({ data }),
      }
    );
    return response;
  }

  // ============================================================================
  // SEARCH METHODS
  // ============================================================================

  /**
   * Global search across content types
   */
  async search(query: SearchQuery): Promise<SearchResponse> {
    const params = new URLSearchParams();
    params.append('query', query.query);
    
    if (query.contentTypes?.length) {
      query.contentTypes.forEach(type => {
        params.append('contentTypes[]', type);
      });
    }
    
    if (query.limit) {
      params.append('limit', String(query.limit));
    }
    
    if (query.page) {
      params.append('page', String(query.page));
    }

    const response = await this.request<SearchResponse>(
      `/search?${params.toString()}`
    );
    return response;
  }

  // ============================================================================
  // FILE UPLOAD METHODS
  // ============================================================================

  /**
   * Upload files
   */
  async uploadFiles(request: FileUploadRequest): Promise<FileUploadResponse[]> {
    const formData = new FormData();
    
    Array.from(request.files).forEach((file, index) => {
      formData.append('files', file);
    });

    if (request.path) {
      formData.append('path', request.path);
    }
    
    if (request.refId) {
      formData.append('refId', String(request.refId));
    }
    
    if (request.ref) {
      formData.append('ref', request.ref);
    }
    
    if (request.field) {
      formData.append('field', request.field);
    }

    const response = await this.request<FileUploadResponse[]>(
      '/upload',
      {
        method: 'POST',
        headers: {
          'Authorization': this.headers.Authorization,
        },
        body: formData,
      }
    );
    return response;
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Health check
   */
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request<{ status: string; timestamp: string }>('/health');
  }

  /**
   * Get API version
   */
  async getVersion(): Promise<{ version: string; strapi: string }> {
    return this.request<{ version: string; strapi: string }>('/version');
  }
}

/**
 * Create API client instance
 */
export function createAPIClient(config: APIConfig): APIClient {
  return new APIClient(config);
}

/**
 * Default API client instance
 */
export const apiClient = createAPIClient({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337',
  apiToken: process.env.STRAPI_API_TOKEN || '',
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
  cache: {
    enabled: true,
    ttl: 300000, // 5 minutes
    maxSize: 100,
  },
  rateLimit: {
    enabled: false,
    maxRequests: 100,
    windowMs: 60000, // 1 minute
  },
});