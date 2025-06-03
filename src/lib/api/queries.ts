import { fetchAPI } from '@/lib/strapi';

/**
 * Fetches a single project by slug
 * @param slug The project slug to fetch
 */
export async function getProject(slug: string) {
  try {
    const data = await fetchAPI(
      `/projects?filters[slug][$eq]=${slug}&populate=*`
    );
    
    if (data?.data && data.data.length > 0) {
      return data.data[0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

/**
 * Fetches all projects
 * @param filters Optional filters to apply
 */
export async function getProjects(filters = {}) {
  try {
    const queryParams = new URLSearchParams();
    
    // Add filters if provided
    if (Object.keys(filters).length > 0) {
      Object.entries(filters).forEach(([key, value]) => {
        queryParams.append(`filters[${key}][$eq]`, value as string);
      });
    }
    
    // Always populate related data
    queryParams.append('populate', '*');
    
    const data = await fetchAPI(`/projects?${queryParams.toString()}`);
    return data?.data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

/**
 * Fetches projects by status
 * @param status The status to filter by (Upcoming, Ongoing, Completed)
 */
export async function getProjectsByStatus(status: string) {
  return getProjects({ status });
}

/**
 * Fetches projects by type
 * @param type The project type to filter by
 */
export async function getProjectsByType(type: string) {
  return getProjects({ type });
}

/**
 * Fetches all news articles
 * @param filters Optional filters to apply
 */
export async function getNews(filters = {}) {
  try {
    const queryParams = new URLSearchParams();
    
    // Add filters if provided
    if (Object.keys(filters).length > 0) {
      Object.entries(filters).forEach(([key, value]) => {
        queryParams.append(`filters[${key}][$eq]`, value as string);
      });
    }
    
    // Always populate related data
    queryParams.append('populate', '*');
    
    const data = await fetchAPI(`/recent-news?${queryParams.toString()}`);
    return data?.data || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

/**
 * Fetches a single news article by slug
 * @param slug The article slug to fetch
 */
export async function getNewsArticle(slug: string) {
  try {
    const data = await fetchAPI(
      `/recent-news?filters[slug][$eq]=${slug}&populate=*`
    );
    
    if (data?.data && data.data.length > 0) {
      return data.data[0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching news article:', error);
    return null;
  }
}

/**
 * Fetches all job listings
 * @param filters Optional filters to apply
 */
export async function getJobs(filters = {}) {
  try {
    const queryParams = new URLSearchParams();
    
    // Add filters if provided
    if (Object.keys(filters).length > 0) {
      Object.entries(filters).forEach(([key, value]) => {
        queryParams.append(`filters[${key}][$eq]`, value as string);
      });
    }
    
    // Always populate related data
    queryParams.append('populate', '*');
    
    const data = await fetchAPI(`/careers?${queryParams.toString()}`);
    return data?.data || [];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

/**
 * Fetches a single job by ID
 * @param id The job ID to fetch
 */
export async function getJob(id: string) {
  try {
    const data = await fetchAPI(`/careers/${id}?populate=*`);
    return data?.data || null;
  } catch (error) {
    console.error('Error fetching job:', error);
    return null;
  }
}

/**
 * Submits a contact form
 * @param formData The form data to submit
 */
export async function submitContactForm(formData: any) {
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