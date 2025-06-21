"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getStrapiMedia } from "@/lib/strapi";
import LocationMap from "@/components/LocationMap/LocationMap";
import { Search, MapPin, Building, Car, Square, Home } from "lucide-react";

// Helper function to get first main photo
const getMainPhoto = (photos: any[]) => {
  if (!photos || photos.length === 0) return null;
  const mainPhoto = photos.find(p => p.isMain) || photos[0];
  return mainPhoto?.photo;
};

// Helper function to format unit types
const formatUnitTypes = (residentialUnits: any[], commercialFloors: any[]) => {
  const types = [];
  if (residentialUnits && residentialUnits.length > 0) {
    types.push(`${residentialUnits.length} Residential`);
  }
  if (commercialFloors && commercialFloors.length > 0) {
    types.push(`${commercialFloors.length} Commercial`);
  }
  return types.join(', ') || 'Mixed Use';
};

interface ProjectsPageClientProps {
  allProjects: any[];
  projectTypes: any[];
  projectStatuses: any[];
  locations: any[];
}

export function ProjectsPageClient({ 
  allProjects, 
  projectTypes, 
  projectStatuses, 
  locations 
}: ProjectsPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('name');


  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = allProjects.filter((project: any) => {
      const matchesSearch = !searchTerm || 
        project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = !selectedStatus || 
        (project.project_status?.Statuses || project.status) === selectedStatus;
      
      const matchesType = !selectedType || 
        (project.project_type?.Type || project.type) === selectedType;
      
      const matchesLocation = !selectedLocation || 
        (project.location?.Name || project.location) === selectedLocation;
      
      return matchesSearch && matchesStatus && matchesType && matchesLocation;
    });

    // Sort projects
    filtered.sort((a: any, b: any) => {
      switch (sortBy) {
        case 'name':
          return (a.name || a.title || '').localeCompare(b.name || b.title || '');
        case 'status':
          return (a.project_status?.Statuses || a.status || '').localeCompare(b.project_status?.Statuses || b.status || '');
        case 'location':
          return (a.location?.Name || a.location || '').localeCompare(b.location?.Name || b.location || '');
        default:
          return 0;
      }
    });

    return filtered;
  }, [allProjects, searchTerm, selectedStatus, selectedType, selectedLocation, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('');
    setSelectedType('');
    setSelectedLocation('');
  };

  return (
    <main className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full">
        <div className="absolute inset-0">
          <Image
            src="/landscape.jpg"
            alt="EPML Properties Projects"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
          <p className="text-xl max-w-3xl">
            Explore our portfolio of premium developments across multiple locations
          </p>
          <div className="mt-6 text-lg">
            <span className="font-semibold">{filteredProjects.length}</span> projects found
          </div>
        </div>
      </section>

      {/* Enhanced Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
            <h2 className="text-2xl font-bold mb-4 lg:mb-0">Filter & Search Projects</h2>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/projects/ongoing">Ongoing</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/projects/upcoming">Upcoming</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/projects/completed">Completed</Link>
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border"
              >
                <option value="">All Locations</option>
                {locations.map((location: any) => (
                  <option key={location.id} value={location.Name || location.name}>
                    {location.Name || location.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Type
              </label>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border"
              >
                <option value="">All Types</option>
                {projectTypes.map((type: any) => (
                  <option key={type.id} value={type.Type || type.Name}>
                    {type.Type || type.Name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border"
              >
                <option value="">All Statuses</option>
                {projectStatuses.map((status: any) => (
                  <option key={status.id} value={status.Statuses || status.Name}>
                    {status.Statuses || status.Name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border"
              >
                <option value="name">Name</option>
                <option value="status">Status</option>
                <option value="location">Location</option>
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {(searchTerm || selectedStatus || selectedType || selectedLocation) && (
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearFilters}
                className="text-gray-600"
              >
                Clear All Filters
              </Button>
              <span className="text-sm text-gray-600">
                {filteredProjects.length} of {allProjects.length} projects
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Projects Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">All Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: any) => {
            const mainPhoto = getMainPhoto(project.photos);
            const projectStatus = project.project_status?.Statuses || project.status || "Unknown";
            const projectType = project.project_type?.Type || project.type || "Unknown Type";
            const projectLocation = project.location?.Name || project.location || "Location TBD";
            const unitTypes = formatUnitTypes(project.residentialUnits, project.commercialFloors);
            
            return (
              <div
                key={project.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                {/* Image Section */}
                <div className="relative h-64 w-full group">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={
                        mainPhoto
                          ? getStrapiMedia({ data: mainPhoto }) || "/landscape.jpg"
                          : "/landscape.jpg"
                      }
                      alt={project.name || project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </AspectRatio>
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant={
                        projectStatus === "Completed"
                          ? "default"
                          : projectStatus === "Ongoing"
                          ? "secondary"
                          : "outline"
                      }
                      className={`font-semibold ${
                        projectStatus === "Completed"
                          ? "bg-green-500 text-white"
                          : projectStatus === "Ongoing"
                          ? "bg-blue-500 text-white"
                          : "bg-amber-500 text-white"
                      }`}
                    >
                      {projectStatus}
                    </Badge>
                  </div>
                  {/* Photo Count */}
                  {project.photos && project.photos.length > 1 && (
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      +{project.photos.length - 1} more photos
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {project.name || project.title}
                  </h3>
                  
                  {/* Location and Type */}
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{projectLocation}</span>
                    <span className="mx-2">•</span>
                    <span>{projectType}</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Property Specifications */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    {project.floors && (
                      <div className="flex items-center text-gray-600">
                        <Building className="h-4 w-4 mr-1 text-blue-500" />
                        <span>{project.floors}</span>
                      </div>
                    )}
                    {project.landSize && (
                      <div className="flex items-center text-gray-600">
                        <Square className="h-4 w-4 mr-1 text-green-500" />
                        <span className="truncate">{project.landSize}</span>
                      </div>
                    )}
                    {project.parking_spaces && (
                      <div className="flex items-center text-gray-600">
                        <Car className="h-4 w-4 mr-1 text-purple-500" />
                        <span>{project.parking_spaces} Parking</span>
                      </div>
                    )}
                    {(project.residentialUnits?.length > 0 || project.commercialFloors?.length > 0) && (
                      <div className="flex items-center text-gray-600">
                        <Home className="h-4 w-4 mr-1 text-orange-500" />
                        <span className="truncate">{unitTypes}</span>
                      </div>
                    )}
                  </div>

                  {/* Key Features */}
                  {project.features && project.features.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Key Features</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.features.slice(0, 3).map((feature: any, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature.name || feature}
                          </Badge>
                        ))}
                        {project.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Amenities */}
                  {project.amenities && project.amenities.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Amenities</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.amenities.slice(0, 2).map((amenity: any, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {amenity.name || amenity}
                          </Badge>
                        ))}
                        {project.amenities.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.amenities.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button asChild className="flex-1">
                      <Link href={`/projects/${project.slug || project.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/contact?project=${project.slug || project.id}`}>
                        Inquire
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Building className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No projects found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
            <Button variant="outline" onClick={clearFilters} className="mt-4">
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Project Locations</h2>
          <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
            <LocationMap />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Find Your Perfect Property
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Can&apos;t find what you&apos;re looking for? Our team is here to help you
            find the perfect property for your needs.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-900 hover:bg-gray-100"
          >
            <Link href="/contact">Contact Our Team</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}