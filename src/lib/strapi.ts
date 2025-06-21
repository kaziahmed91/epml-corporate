import qs from "qs";

const strapiToken = process.env.STRAPI_API_TOKEN;

// Define specific populate queries for different content types
export const POPULATE_QUERIES = {
  project: 'populate[project_status]=*&populate[project_type]=*&populate[location][populate][city]=*&populate[photos]=*&populate[residentialUnits][populate][residential]=*&populate[commercialFloors][populate][commercial]=*&populate[features]=*&populate[amenities]=*&populate[youtubeVideos]=*&populate[coordinates]=*&populate[projectDocuments]=*&populate[bulkPhotoUploads]=*&populate[constructionUpdates]=*',
  projectBasic: 'populate[project_status]=*&populate[project_type]=*&populate[location][populate][city]=*&populate[photos]=*',
  document: 'populate[project]=*',
  constructionUpdate: 'populate[project]=*',
  testimonial: 'populate=*',
  locationWithCity: 'populate[city]=*',
  all: 'populate=*'
};

const strapiUrl =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

/**
 * Get full Strapi URL from path
 */
export function getStrapiURL(path = "") {
  return `${strapiUrl}${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 */
export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options: RequestInit = {}
) {
  try {
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    console.log(`Fetching: ${requestUrl}`);

    const mergedOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${strapiToken}`,
      },
      ...options,
    };

    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      console.error(
        `API Error - URL: ${requestUrl}, Status: ${response.status}, StatusText: ${response.statusText}`
      );
      const errorText = await response.text();
      console.error(`Error Response Body:`, errorText);
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching from Strapi:", error);
    throw error;
  }
}

/**
 * Helper to make POST requests to Strapi API endpoints
 */
export async function postAPI(
  path: string,
  data = {},
  options: RequestInit = {}
) {
  try {
    const requestUrl = getStrapiURL(`/api${path}`);

    const mergedOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${strapiToken}`,
      },
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    };

    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error posting to Strapi:", error);
    throw error;
  }
}

/**
 * Helper to make PUT requests to Strapi API endpoints
 */
export async function putAPI(
  path: string,
  data = {},
  options: RequestInit = {}
) {
  try {
    const requestUrl = getStrapiURL(`/api${path}`);

    const mergedOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${strapiToken}`,
      },
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    };

    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error putting to Strapi:", error);
    throw error;
  }
}

/**
 * Helper to make DELETE requests to Strapi API endpoints
 */
export async function deleteAPI(
  path: string,
  options: RequestInit = {}
) {
  try {
    const requestUrl = getStrapiURL(`/api${path}`);

    const mergedOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${strapiToken}`,
      },
      method: "DELETE",
      ...options,
    };

    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error deleting from Strapi:", error);
    throw error;
  }
}

/**
 * Get media URL from Strapi
 */
export function getStrapiMedia(media: any) {
  if (!media || !media.data) return null;

  const { url } = media.data.attributes;
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
  return imageUrl;
}

/**
 * Get multiple media URLs from Strapi
 */
export function getStrapiMediaMultiple(media: any) {
  if (!media || !media.data || !Array.isArray(media.data)) return [];

  return media.data.map((item: any) => {
    const { url, alternativeText, caption } = item.attributes;
    return {
      url: url.startsWith("/") ? getStrapiURL(url) : url,
      alt: alternativeText || '',
      caption: caption || ''
    };
  });
}

/**
 * Helper to extract relation data from Strapi response
 */
export function extractRelationData(relation: any) {
  if (!relation || !relation.data) return null;
  
  return {
    id: relation.data.id,
    ...relation.data.attributes
  };
}

/**
 * Helper to extract multiple relation data from Strapi response
 */
export function extractMultipleRelationData(relation: any) {
  if (!relation || !relation.data || !Array.isArray(relation.data)) return [];
  
  return relation.data.map((item: any) => ({
    id: item.id,
    ...item.attributes
  }));
}

/**
 * Format Strapi response by transforming data structure
 * Updated for Strapi v5 which doesn't use attributes wrapper
 */
export function formatStrapiResponse(response: any) {
  if (!response) return null;

  // Handle arrays (collection types)
  if (Array.isArray(response.data)) {
    return response.data.map((item: any) => {
      // Strapi v5 format - data is directly in the item
      if (item.attributes) {
        // v4 format fallback
        return {
          id: item.id,
          ...item.attributes,
        };
      } else {
        // v5 format - data is already flat
        return item;
      }
    });
  }

  // Handle single objects (single types)
  if (response.data.attributes) {
    // v4 format
    return {
      id: response.data.id,
      ...response.data.attributes,
    };
  } else {
    // v5 format
    return response.data;
  }
}

/**
 * Build populate query for complex nested relations
 */
export function buildPopulateQuery(fields: string[] = ['*']) {
  if (fields.includes('*')) {
    return 'populate=*';
  }
  
  return fields.map(field => `populate[${field}]=*`).join('&');
}

/**
 * Build filters query for Strapi API
 */
export function buildFiltersQuery(filters: Record<string, any>) {
  const filterParams = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (typeof value === 'object' && value.operator) {
        filterParams.append(`filters[${key}][${value.operator}]`, value.value);
      } else {
        filterParams.append(`filters[${key}][$eq]`, value);
      }
    }
  });
  
  return filterParams.toString();
}
