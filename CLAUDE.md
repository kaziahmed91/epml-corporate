# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack application consisting of a Next.js frontend and a Strapi headless CMS backend. The project appears to be for a real estate or property development company, displaying projects with different statuses (upcoming, ongoing, completed) and filtering by locations.

## Project Requirements Document (PRD)

The project requirements and specifications are documented in `docs/PRD.md`. This document contains:
- Detailed feature specifications
- User stories and requirements
- Technical requirements
- Design guidelines
- Project milestones and timelines

Please refer to this document for a complete understanding of the project scope and requirements.


## Coding Rules

This project has rules for coding that are prescribed in `docs/rules.md`. 
The document contains standards and best practices for coding that should be adhere to at all times. 

## Architecture

- **Frontend**: Next.js 15 with App Router, TypeScript, and TailwindCSS
- **Backend**: Strapi 5 headless CMS with TypeScript and PostgreSQL
- **Integration**: REST API with authentication via Bearer token

## Development Commands

### Frontend (Root Directory)

```bash
# Start Next.js development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run linter
yarn lint
```

### Backend (/backend Directory)

```bash
# Start Strapi development server with auto-reload
cd backend && yarn develop

# Build Strapi admin panel
cd backend && yarn build

# Start Strapi in production mode
cd backend && yarn start
```

### Docker (Backend)

The backend can be run in Docker:

```bash
# Start Strapi and PostgreSQL with Docker Compose
cd backend && docker-compose up -d

# Rebuild containers
cd backend && docker-compose build

# Shut down containers
cd backend && docker-compose down
```

## Environment Setup

### Frontend (.env.local)

Required environment variables:
- `NEXT_PUBLIC_STRAPI_API_URL`: URL to Strapi backend (e.g., "http://localhost:1337")
- `STRAPI_API_TOKEN`: API token for authenticated requests

### Backend (.env)

Required environment variables:
- `HOST`: Host (default: 0.0.0.0)
- `PORT`: Port (default: 1337)
- `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`: Security keys
- Database configuration:
  - `DATABASE_CLIENT`: Database client (postgres, mysql, sqlite)
  - `DATABASE_HOST`, `DATABASE_PORT`
  - `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`

## Content Structure

The Strapi backend has been significantly enhanced with the following content types:

### Core Content Types

- **Project**: Enhanced main content type with comprehensive project information including:
  - Basic info: name, description, slug, construction dates
  - Physical details: floors, land size, land facing, road width, parking
  - Relations: project_type, location, project_status
  - Rich components: photos, unit types, floors, features, amenities, documents
  - Advanced features: YouTube videos, coordinates, construction updates

- **Project Status**: Categorization system ("Upcoming", "Ongoing", "Completed")
- **Project Type**: Types of projects ("Residential", "Commercial", "Mixed-Use")
- **Location**: Geographic locations with coordinates and city relations
- **City**: Parent entity for locations with hierarchical structure

### Advanced Content Types

- **Document**: Comprehensive document management system with:
  - Categories: brochure, floor_plan, site_plan, approval, permit, noc, layout, specification
  - File upload support with R2 cloud storage integration
  - Public/private visibility controls and project associations

- **Construction Update**: Progress tracking system with:
  - Monthly updates with progress percentages
  - Photo galleries and work completion tracking
  - Multilingual support (i18n)

- **Testimonial**: Customer feedback system with:
  - Rating system and customer categorization
  - Featured testimonials and project associations
  - Support for customer, partner, employee, and media testimonials

- **Recent News**: Company news and media content (single type)

### Template Systems

- **Feature Template**: Reusable project features with categories:
  - security, convenience, utilities, accessibility, technology
- **Amenity Template**: Reusable project amenities with categories:
  - recreation, wellness, community, parking, services, outdoor

## Frontend Data Fetching

The frontend uses an enhanced API client architecture:

### API Client (`src/lib/strapi.ts`)
- Enhanced with specialized populate queries for different content types
- Helper functions for media handling, relation extraction, and response formatting
- Support for advanced filtering and complex nested relations
- CRUD operations (GET, POST, PUT, DELETE) with proper error handling

### API Queries (`src/lib/api/queries.ts`)
- Comprehensive query functions for all content types
- Optimized populate strategies (basic vs full population)
- Advanced filtering capabilities with support for:
  - Status, type, location, and city-based filtering
  - Search functionality across multiple fields
  - Pagination and sorting options

### TypeScript Types (`src/api/types.ts`)
- Complete type definitions matching the backend schema
- Component interfaces for complex nested structures
- Response types for all API endpoints
- Filter interfaces for query optimization

## API Endpoints

### Standard Endpoints
- `/api/projects` - Projects with complex relations and components
- `/api/cities` - City data with location relations
- `/api/locations` - Location data with city and coordinate information
- `/api/project-statuses` - Project status enumeration
- `/api/project-types` - Project type enumeration
- `/api/documents` - Document management with file handling
- `/api/construction-updates` - Construction progress tracking
- `/api/testimonials` - Customer testimonials and reviews
- `/api/recent-news` - Company news (single type)
- `/api/feature-templates` - Reusable feature templates
- `/api/amenity-templates` - Reusable amenity templates

### Custom Endpoints
- `PUT /api/projects/{id}/photo-caption` - Update photo metadata
- `POST /api/projects/{id}/process-bulk-photos` - Process bulk photo uploads
- `POST /api/projects/{id}/refresh-documents` - Refresh document cache

## Component Structure

- The UI is built with a combination of custom components and Radix UI primitives
- Components use TailwindCSS for styling with some SCSS modules for more complex styles
- Location-based filtering is implemented using Mapbox GL JS


