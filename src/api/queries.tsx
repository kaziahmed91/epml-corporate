import { fetchAPI, postAPI, formatStrapiResponse } from '@/lib/strapi';
import { 
  Project,
  ProjectListResponse,
  ProjectResponse,
  RecentNews,
  RecentNewsListResponse,
  RecentNewsResponse,
  LocationListResponse,
  ProjectStatusListResponse,
  ProjectTypeListResponse,
  ContactFormData
} from './types';

/**
 * Fetch all projects with optional filters
 */
export async function getProjects(filters = {}, populate = '*') {
  try {
    const data = await fetchAPI('/projects', {
      filters,
      populate,
      sort: 'updatedAt:desc',
    });
    
    return formatStrapiResponse(data) as Project[];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

/**
 * Fetch a specific project by slug
 */
export async function getProject(slug: string) {
  try {
    const data = await fetchAPI('/projects', {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: '*',
    });
    
    if (data?.data && data.data.length > 0) {
      return formatStrapiResponse({ data: data.data[0] }) as Project;
    }
    return null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

/**
 * Fetch projects filtered by status
 */
export async function getProjectsByStatus(status: string) {
  try {
    return getProjects({
      status: {
        $eq: status,
      },
    });
  } catch (error) {
    console.error(`Error fetching ${status} projects:`, error);
    return [];
  }
}

/**
 * Fetch all project statuses
 */
export async function getProjectStatuses() {
  try {
    const data = await fetchAPI('/project-statuses', {
      populate: '*',
    });
    
    return formatStrapiResponse(data);
  } catch (error) {
    console.error('Error fetching project statuses:', error);
    return [];
  }
}

/**
 * Fetch all project types
 */
export async function getProjectTypes() {
  try {
    const data = await fetchAPI('/project-types', {
      populate: '*',
    });
    
    return formatStrapiResponse(data);
  } catch (error) {
    console.error('Error fetching project types:', error);
    return [];
  }
}

/**
 * Fetch all locations
 */
export async function getLocations() {
  try {
    const data = await fetchAPI('/locations', {
      populate: '*',
    });
    
    return formatStrapiResponse(data);
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
}

/**
 * Fetch recent news (single type)
 */
export async function getRecentNews(limit = 10) {
  try {
    // Since recent-news endpoint doesn't exist, return null for now
    // This needs to be configured in Strapi admin panel first
    console.log('Recent news endpoint not configured - returning null');
    return null;
  } catch (error) {
    console.error('Error fetching recent news:', error);
    return null;
  }
}

/**
 * Fetch recent news data (single type - no individual articles)
 */
export async function getNewsArticle(slug: string) {
  try {
    // Since recent-news is a single type, return the main news data
    return await getRecentNews();
  } catch (error) {
    console.error('Error fetching news article:', error);
    return null;
  }
}

/**
 * Submit contact form data to Strapi
 */
export async function submitContactForm(formData: ContactFormData) {
  try {
    const response = await postAPI('/contact-submissions', {
      data: formData
    });
    
    return response;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}

/**
 * Fetch cities data
 */
export async function getCities() {
  try {
    const data = await fetchAPI('/cities', {
      populate: '*',
    });
    
    return formatStrapiResponse(data);
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
}