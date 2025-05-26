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

The Strapi backend has the following content types:

- **Project**: Main content type with fields for name, description, photos, etc.
- **Project Status**: For categorizing projects (Upcoming, Ongoing, Completed)
- **Project Type**: Types of projects (Residential, Commercial, etc.)
- **Location**: Geographic locations with area names
- **City**: Parent entity for locations

## Frontend Data Fetching

The frontend uses a custom API client in `src/lib/strapi.ts` to make authenticated requests to the Strapi API. TanStack React Query is used for data fetching, caching, and state management.

## Component Structure

- The UI is built with a combination of custom components and Radix UI primitives
- Components use TailwindCSS for styling with some SCSS modules for more complex styles
- Location-based filtering is implemented using Mapbox GL JS


