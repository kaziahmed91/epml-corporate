import qs from "qs";

const strapiToken = process.env.STRAPI_API_TOKEN;

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
 * Get media URL from Strapi
 */
export function getStrapiMedia(media: any) {
  if (!media) return null;

  const { url } = media.data.attributes;
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
  return imageUrl;
}

/**
 * Format Strapi response by transforming data structure
 */
export function formatStrapiResponse(response: any) {
  if (!response) return null;

  // Handle arrays (collection types)
  if (Array.isArray(response.data)) {
    return response.data.map((item: any) => ({
      id: item.id,
      ...item.attributes,
    }));
  }

  // Handle single objects (single types)
  return {
    id: response.data.id,
    ...response.data.attributes,
  };
}
