# EPML Properties Website

A full-stack real estate development website built with Next.js and Strapi CMS.

## Project Overview

This project consists of a Next.js frontend and a Strapi headless CMS backend. The website showcases real estate developments with features for projects, news, careers, and more.

## Tech Stack

### Frontend
- Next.js 15 with App Router
- TypeScript
- TailwindCSS
- Radix UI Components
- TanStack React Query
- Mapbox GL for interactive maps

### Backend
- Strapi 5 headless CMS
- PostgreSQL database
- TypeScript

## Project Structure

- `/src/app/*` - Next.js pages and layouts
- `/src/components/*` - React components
- `/src/lib/*` - Utility functions, API clients, etc.
- `/backend/*` - Strapi CMS backend

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- Yarn (recommended) or npm
- PostgreSQL database (for production)

### Environment Setup

1. Create `.env.local` in the root directory with:

```
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token
```

2. Create `.env` in the `/backend` directory with:

```
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

For production, you should configure PostgreSQL instead of SQLite.

### Frontend Development

1. Install dependencies:
```bash
yarn install
```

2. Start the development server:
```bash
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Backend Development

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
yarn install
```

3. Start the Strapi server:
```bash
yarn develop
```

4. Access the Strapi admin panel at [http://localhost:1337/admin](http://localhost:1337/admin)

### Running with Docker (Backend)

The backend can be run using Docker:

```bash
cd backend
docker-compose up -d
```

## Content Structure

The Strapi backend should be configured with the following content types:

- **Project**: Main content type for real estate developments
- **Project Status**: For categorizing projects (Upcoming, Ongoing, Completed)
- **Project Type**: Types of projects (Residential, Commercial, etc.)
- **Recent News**: News articles and updates
- **Careers**: Job listings and opportunities

Detailed schemas can be found in `/docs/strapi-schemas.md`.

## Frontend Routes

- `/` - Homepage
- `/about` - About Us
- `/projects` - Projects listing page
- `/projects/[slug]` - Individual project detail pages
- `/construction-status` - Construction progress tracker
- `/news` - News & updates listing
- `/news/[slug]` - Individual news article pages
- `/landowners` - Landowner partnerships page
- `/careers` - Careers page
- `/careers/[job-id]` - Individual job posting pages
- `/contact` - Contact page
- `/buyers-guide` - Comprehensive buying guide

## Features

- Responsive design for all device sizes
- Server-side rendering for SEO optimization
- Interactive project filtering
- Dynamic content loading from Strapi CMS
- Image optimization with Next.js Image component
- Form handling with validation

## Deployment

### Frontend

The frontend can be deployed to Vercel:

```bash
vercel
```

### Backend

The Strapi backend can be deployed to various platforms. For production, consider using:

- Strapi Cloud
- Digital Ocean
- Heroku
- AWS/GCP/Azure

Follow the Strapi [deployment documentation](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment.html) for detailed instructions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.