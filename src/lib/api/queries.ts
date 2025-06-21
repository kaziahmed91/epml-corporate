import { fetchAPI, POPULATE_QUERIES, buildFiltersQuery, formatStrapiResponse } from '@/lib/strapi';
import type {
  Project,
  ProjectFilters,
  City,
  Location,
  ProjectStatus,
  ProjectType,
  Document,
  DocumentFilters,
  ConstructionUpdate,
  ConstructionUpdateFilters,
  Testimonial,
  TestimonialFilters,
  RecentNews,
  FeatureTemplate,
  AmenityTemplate,
  ContactFormData
} from '@/api/types';

/**
 * Fetches a single project by slug with full population
 * @param slug The project slug to fetch
 */
export async function getProject(slug: string): Promise<Project | null> {
  try {
    const data = await fetchAPI(
      `/projects?filters[slug][$eq]=${slug}&${POPULATE_QUERIES.project}`
    );
    
    if (data?.data && data.data.length > 0) {
      return formatStrapiResponse({ data: data.data[0] });
    }
    return null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

/**
 * Fetches all projects with optional filters
 * @param filters Optional filters to apply
 * @param populate Whether to populate relations (default: basic)
 */
export async function getProjects(
  filters: ProjectFilters = {}, 
  populate: 'basic' | 'full' | '*' = 'basic'
): Promise<Project[]> {
  try {
    const filterQuery = buildFiltersQuery(filters);
    let populateQuery;
    
    if (populate === '*') {
      populateQuery = 'populate=*';
    } else if (populate === 'full') {
      populateQuery = POPULATE_QUERIES.project;
    } else {
      populateQuery = POPULATE_QUERIES.projectBasic;
    }
    
    const queryString = [filterQuery, populateQuery].filter(Boolean).join('&');
    const data = await fetchAPI(`/projects?${queryString}`);
    
    return formatStrapiResponse(data) || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

/**
 * Fetches projects by status
 * @param statusName The status name to filter by (e.g., "Upcoming", "Ongoing", "Completed")
 */
export async function getProjectsByStatus(statusName: string): Promise<Project[]> {
  try {
    const data = await fetchAPI(
      `/projects?filters[project_status][Name][$eq]=${statusName}&${POPULATE_QUERIES.projectBasic}`
    );
    return formatStrapiResponse(data) || [];
  } catch (error) {
    console.error('Error fetching projects by status:', error);
    return [];
  }
}

/**
 * Fetches projects by type
 * @param typeName The project type name to filter by (e.g., "Residential", "Commercial", "Mixed-Use")
 */
export async function getProjectsByType(typeName: string): Promise<Project[]> {
  try {
    const data = await fetchAPI(
      `/projects?filters[project_type][Name][$eq]=${typeName}&${POPULATE_QUERIES.projectBasic}`
    );
    return formatStrapiResponse(data) || [];
  } catch (error) {
    console.error('Error fetching projects by type:', error);
    return [];
  }
}

/**
 * Fetches projects by location
 * @param locationName The location name to filter by
 */
export async function getProjectsByLocation(locationName: string): Promise<Project[]> {
  try {
    const data = await fetchAPI(
      `/projects?filters[location][Name][$eq]=${locationName}&${POPULATE_QUERIES.projectBasic}`
    );
    return formatStrapiResponse(data) || [];
  } catch (error) {
    console.error('Error fetching projects by location:', error);
    return [];
  }
}

/**
 * Fetches projects by city
 * @param cityName The city name to filter by
 */
export async function getProjectsByCity(cityName: string): Promise<Project[]> {
  try {
    const data = await fetchAPI(
      `/projects?filters[location][city][Name][$eq]=${cityName}&${POPULATE_QUERIES.projectBasic}`
    );
    return formatStrapiResponse(data) || [];
  } catch (error) {
    console.error('Error fetching projects by city:', error);
    return [];
  }
}

/**
 * Fetches all cities
 */
export async function getCities(): Promise<City[]> {
  try {
    const data = await fetchAPI('/cities?populate=*');
    return formatStrapiResponse(data) || [];
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
}

/**
 * Fetches all locations with cities
 */
export async function getLocations(): Promise<Location[]> {
  try {
    const data = await fetchAPI(`/locations?${POPULATE_QUERIES.locationWithCity}`);
    return formatStrapiResponse(data) || [];
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
}

/**
 * Fetches locations by city
 * @param cityName The city name to filter by
 */
export async function getLocationsByCity(cityName: string): Promise<Location[]> {
  try {
    const data = await fetchAPI(
      `/locations?filters[city][Name][$eq]=${cityName}&${POPULATE_QUERIES.locationWithCity}`
    );
    return formatStrapiResponse(data) || [];
  } catch (error) {
    console.error('Error fetching locations by city:', error);
    return [];
  }
}

/**
 * Fetches all project statuses
 */
export async function getProjectStatuses(): Promise<ProjectStatus[]> {
  try {
    const data = await fetchAPI('/project-statuses');
    return formatStrapiResponse(data) || [];
  } catch (error) {
    console.error('Error fetching project statuses:', error);
    return [];
  }
}

/**
 * Fetches all project types
 */
export async function getProjectTypes(): Promise<ProjectType[]> {
  try {
    const data = await fetchAPI('/project-types');
    return formatStrapiResponse(data) || [];
  } catch (error) {
    console.error('Error fetching project types:', error);
    return [];
  }
}

/**
 * Fetches documents with optional filters
 * @param filters Optional filters to apply
 */
export async function getDocuments(filters: DocumentFilters = {}): Promise<Document[]> {
  try {
    const filterQuery = buildFiltersQuery(filters);
    const queryString = [filterQuery, POPULATE_QUERIES.document].filter(Boolean).join('&');
    
    const data = await fetchAPI(`/documents?${queryString}`);
    return formatStrapiResponse(data) || [];
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}

/**
 * Fetches documents by project
 * @param projectId The project ID to filter by
 * @param isPublic Whether to filter by public documents only
 */
export async function getDocumentsByProject(
  projectId: number, 
  isPublic?: boolean
): Promise<Document[]> {
  const filters: DocumentFilters = { project: projectId };
  if (isPublic !== undefined) {
    filters.isPublic = isPublic;
  }
  
  return getDocuments(filters);
}

/**
 * Fetches construction updates with optional filters
 * @param filters Optional filters to apply
 */
export async function getConstructionUpdates(
  filters: ConstructionUpdateFilters = {}
): Promise<ConstructionUpdate[]> {
  try {
    const filterQuery = buildFiltersQuery(filters);
    const queryString = [filterQuery, POPULATE_QUERIES.constructionUpdate].filter(Boolean).join('&');
    
    const data = await fetchAPI(`/construction-updates?${queryString}`);
    return formatStrapiResponse(data) || [];
  } catch (error) {
    console.error('Error fetching construction updates:', error);
    return [];
  }
}

/**
 * Fetches construction updates by project
 * @param projectId The project ID to filter by
 */
export async function getConstructionUpdatesByProject(projectId: number): Promise<ConstructionUpdate[]> {
  return getConstructionUpdates({ project: projectId });
}

/**
 * Fetches testimonials with optional filters
 * @param filters Optional filters to apply
 */
export async function getTestimonials(filters: TestimonialFilters = {}): Promise<Testimonial[]> {
  try {
    const filterQuery = buildFiltersQuery(filters);
    const queryString = [filterQuery, POPULATE_QUERIES.all].filter(Boolean).join('&');
    
    const data = await fetchAPI(`/testimonials?${queryString}`);
    return formatStrapiResponse(data) || [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

/**
 * Fetches featured testimonials
 */
export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return getTestimonials({ isFeatured: true });
}

/**
 * Fetches testimonials by type
 * @param testimonialType The type of testimonial to filter by
 */
export async function getTestimonialsByType(
  testimonialType: 'customer' | 'partner' | 'employee' | 'media'
): Promise<Testimonial[]> {
  return getTestimonials({ testimonialType });
}

/**
 * Fetches recent news (single type)
 */
export async function getRecentNews(): Promise<RecentNews | null> {
  try {
    const data = await fetchAPI(`/recent-news?${POPULATE_QUERIES.all}`);
    
    if (data?.data) {
      return formatStrapiResponse({ data: data.data });
    }
    return null;
  } catch (error) {
    console.error('Error fetching recent news:', error);
    return null;
  }
}

/**
 * Fetches feature templates
 * @param category Optional category to filter by
 * @param isActive Whether to filter by active templates only
 */
export async function getFeatureTemplates(
  category?: string, 
  isActive: boolean = true
): Promise<FeatureTemplate[]> {
  try {
    const filters: any = {};
    if (category) filters.category = category;
    if (isActive !== undefined) filters.isActive = isActive;
    
    const filterQuery = buildFiltersQuery(filters);
    const queryString = filterQuery || '';
    
    const data = await fetchAPI(`/feature-templates?${queryString}`);
    return formatStrapiResponse(data) || [];
  } catch (error) {
    console.error('Error fetching feature templates:', error);
    return [];
  }
}

/**
 * Fetches amenity templates
 * @param category Optional category to filter by
 * @param isActive Whether to filter by active templates only
 */
export async function getAmenityTemplates(
  category?: string, 
  isActive: boolean = true
): Promise<AmenityTemplate[]> {
  try {
    const filters: any = {};
    if (category) filters.category = category;
    if (isActive !== undefined) filters.isActive = isActive;
    
    const filterQuery = buildFiltersQuery(filters);
    const queryString = filterQuery || '';
    
    const data = await fetchAPI(`/amenity-templates?${queryString}`);
    return formatStrapiResponse(data) || [];
  } catch (error) {
    console.error('Error fetching amenity templates:', error);
    return [];
  }
}

/**
 * Submits a contact form
 * @param formData The form data to submit
 */
export async function submitContactForm(formData: ContactFormData) {
  try {
    const response = await fetchAPI('/contact-submissions', {
      method: 'POST',
      body: JSON.stringify({ data: formData }),
    });
    
    return response;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}

/**
 * Search projects by name or description
 * @param searchTerm The term to search for
 */
export async function searchProjects(searchTerm: string): Promise<Project[]> {
  try {
    const data = await fetchAPI(
      `/projects?filters[$or][0][name][$containsi]=${searchTerm}&filters[$or][1][description][$containsi]=${searchTerm}&${POPULATE_QUERIES.projectBasic}`
    );
    return formatStrapiResponse(data) || [];
  } catch (error) {
    console.error('Error searching projects:', error);
    return [];
  }
}

/**
 * Fetches projects with advanced filtering
 * @param options Advanced filtering options
 */
export async function getProjectsAdvanced(options: {
  status?: string;
  type?: string;
  location?: string;
  city?: string;
  priceMin?: number;
  priceMax?: number;
  search?: string;
  limit?: number;
  page?: number;
} = {}): Promise<{ projects: Project[]; pagination?: any }> {
  try {
    const params = new URLSearchParams();
    
    // Add filters
    if (options.status) {
      params.append('filters[project_status][Name][$eq]', options.status);
    }
    if (options.type) {
      params.append('filters[project_type][Name][$eq]', options.type);
    }
    if (options.location) {
      params.append('filters[location][Name][$eq]', options.location);
    }
    if (options.city) {
      params.append('filters[location][city][Name][$eq]', options.city);
    }
    if (options.search) {
      params.append('filters[$or][0][name][$containsi]', options.search);
      params.append('filters[$or][1][description][$containsi]', options.search);
    }
    
    // Add pagination
    if (options.limit) {
      params.append('pagination[pageSize]', options.limit.toString());
    }
    if (options.page) {
      params.append('pagination[page]', options.page.toString());
    }
    
    // Add population
    params.append('populate', POPULATE_QUERIES.projectBasic);
    
    const data = await fetchAPI(`/projects?${params.toString()}`);
    
    return {
      projects: formatStrapiResponse(data) || [],
      pagination: data?.meta?.pagination
    };
  } catch (error) {
    console.error('Error fetching projects with advanced filters:', error);
    return { projects: [] };
  }
}