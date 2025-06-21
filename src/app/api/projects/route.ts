import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const strapiUrl = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const strapiToken = process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    console.log('Fetching projects from:', `${strapiUrl}/api/projects`);
    console.log('Using token:', strapiToken ? 'Token present' : 'No token');

    const response = await fetch(`${strapiUrl}/api/projects?fields[0]=name&fields[1]=slug&sort[0]=name:asc`, {
      headers: {
        'Authorization': `Bearer ${strapiToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch projects', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}