import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ProjectImageGrid } from '@/components/ui/ImageGrid';
import { getProject } from '@/lib/api/queries';
import type { 
  Project, 
  ProjectDetailPageProps,
  PhotoItem,
  BulkPhotoUpload,
  ProjectFeature,
  ProjectAmenity 
} from '@/types';
import { getStrapiMedia } from '@/lib/strapi';
import { projectsDetail } from '@/lib/data/projectsData'; // Fallback data
import { 
  MapPin, 
  Building, 
  Car, 
  Square, 
  Home, 
  Calendar,
  Users,
  Phone,
  Mail,
  Download,
  ChevronLeft,
  Star,
  Shield,
  Camera,
  Wifi,
  Zap,
  Battery,
  Award,
  Droplets,
  ArrowUp,
  ShieldCheck,
  Plug,
  Gauge,
  Wind,
  Tv,
  Briefcase,
  Settings,
  Sparkles,
  Lock,
  Sun,
  Monitor,
  Lightbulb,
  Activity,
  Coffee,
  ShoppingCart,
  Flower2,
  TreePine,
  Gamepad2,
  Wrench,
  HardHat,
  CheckCircle
} from 'lucide-react';

// Type is now imported from @/types

// Set revalidation period
export const revalidate = 3600; // Revalidate every hour

// Generate static params for all projects at build time
export async function generateStaticParams() {
  // In a real implementation, we would fetch all project slugs from the API
  // For now, just return the slugs of our dummy data
  return Object.keys(projectsDetail).map((slug) => ({
    slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const projectData = await getProject(slug);
  const project = projectData || projectsDetail[slug as keyof typeof projectsDetail];
  
  if (!project) {
    return {
      title: 'Project Not Found | EPML Properties',
      description: 'The requested project could not be found.',
    };
  }
  
  const projectName = (project as Project).name || (project as any).title || 'Project';
  
  return {
    title: `${projectName} | EPML Properties`,
    description: project.description || `Discover ${projectName} - a premium development by EPML Properties`,
    openGraph: {
      title: `${projectName} | EPML Properties`,
      description: project.description,
      images: (project as Project).photos && (project as Project).photos?.length > 0 
        ? [getStrapiMedia((project as Project).photos?.find(p => p.isMain)?.photo || (project as Project).photos?.[0]?.photo) || '/landscape.jpg']
        : ['/landscape.jpg'],
    },
  };
}

// Helper functions with proper typing
const getMainPhoto = (photos: PhotoItem[]): any => {
  if (!photos || photos.length === 0) return null;
  const mainPhoto = photos.find(p => p.isMain) || photos[0];
  return mainPhoto?.photo;
};

const formatUnitTypes = (residentialUnits: any[], commercialFloors: any[]): string => {
  const types: string[] = [];
  if (residentialUnits && residentialUnits.length > 0) {
    types.push(`${residentialUnits.length} Residential`);
  }
  if (commercialFloors && commercialFloors.length > 0) {
    types.push(`${commercialFloors.length} Commercial`);
  }
  return types.join(', ') || 'Mixed Use';
};

// Icon mapping for features and amenities
const getFeatureIcon = (iconKey: string): React.ReactNode => {
  const iconMap: { [key: string]: React.ReactNode } = {
    // Security icons
    'security-camera': <Camera className="h-5 w-5" />,
    'shield': <Shield className="h-5 w-5" />,
    'shield-check': <ShieldCheck className="h-5 w-5" />,
    'camera': <Camera className="h-5 w-5" />,
    'lock': <Lock className="h-5 w-5" />,
    'fire-extinguisher': <Star className="h-5 w-5" />,
    
    // Utilities icons
    'elevator': <ArrowUp className="h-5 w-5" />,
    'arrow-up': <ArrowUp className="h-5 w-5" />,
    'battery': <Battery className="h-5 w-5" />,
    'generator': <Zap className="h-5 w-5" />,
    'zap': <Zap className="h-5 w-5" />,
    'plug': <Plug className="h-5 w-5" />,
    'meter': <Gauge className="h-5 w-5" />,
    'droplets': <Droplets className="h-5 w-5" />,
    'water-drop': <Droplets className="h-5 w-5" />,
    'phone': <Phone className="h-5 w-5" />,
    'wifi': <Wifi className="h-5 w-5" />,
    'lightbulb': <Lightbulb className="h-5 w-5" />,
    
    // Convenience icons
    'air-conditioner': <Wind className="h-5 w-5" />,
    'map-pin': <MapPin className="h-5 w-5" />,
    'building': <Building className="h-5 w-5" />,
    'car': <Car className="h-5 w-5" />,
    'award': <Award className="h-5 w-5" />,
    'tree-pine': <TreePine className="h-5 w-5" />,
    'sparkles': <Sparkles className="h-5 w-5" />,
    'sun': <Sun className="h-5 w-5" />,
    'wind': <Wind className="h-5 w-5" />,
    
    // Parking icons
    'parking-garage': <Car className="h-5 w-5" />,
    'parking-meter': <Car className="h-5 w-5" />,
    
    // Services icons
    'seat': <Square className="h-5 w-5" />,
    'restroom': <Home className="h-5 w-5" />,
    'briefcase': <Briefcase className="h-5 w-5" />,
    'settings': <Settings className="h-5 w-5" />,
    'activity': <Activity className="h-5 w-5" />,
    
    // Recreation icons
    'grill': <HardHat className="h-5 w-5" />,
    'gamepad-2': <Gamepad2 className="h-5 w-5" />,
    'tv': <Tv className="h-5 w-5" />,
    'dumbbell': <Activity className="h-5 w-5" />,
    'waves': <Wind className="h-5 w-5" />,
    
    // Outdoor icons
    'tree': <TreePine className="h-5 w-5" />,
    'flower': <Flower2 className="h-5 w-5" />,
    'baby': <Star className="h-5 w-5" />,
    'trees': <TreePine className="h-5 w-5" />,
    
    // Community icons
    'users': <Users className="h-5 w-5" />,
    'coffee': <Coffee className="h-5 w-5" />,
    'shopping-cart': <ShoppingCart className="h-5 w-5" />,
    
    // Accessibility icons
    'stairs': <ArrowUp className="h-5 w-5" />,
    
    // Other icons
    'shirt': <Square className="h-5 w-5" />,
    'computer': <Monitor className="h-5 w-5" />,
    'flame': <Star className="h-5 w-5" />,
  };
  
  return iconMap[iconKey] || <CheckCircle className="h-5 w-5" />;
};

// Get category color for features and amenities
const getCategoryColor = (category: string): string => {
  const colorMap: { [key: string]: string } = {
    'security': 'text-red-500 bg-red-50',
    'utilities': 'text-blue-500 bg-blue-50', 
    'convenience': 'text-green-500 bg-green-50',
    'technology': 'text-purple-500 bg-purple-50',
    'accessibility': 'text-orange-500 bg-orange-50',
    'parking': 'text-indigo-500 bg-indigo-50',
    'services': 'text-teal-500 bg-teal-50',
    'recreation': 'text-pink-500 bg-pink-50',
    'wellness': 'text-emerald-500 bg-emerald-50',
    'community': 'text-amber-500 bg-amber-50',
    'outdoor': 'text-lime-500 bg-lime-50',
  };
  
  return colorMap[category] || 'text-gray-500 bg-gray-50';
};

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps): Promise<JSX.Element> {
  // Await params first
  const { slug } = await params;
  
  // Fetch project data from Strapi API using the slug
  const projectData = await getProject(slug);
  
  
  // Fall back to static data if API call fails or returns no data
  const project = projectData || projectsDetail[slug as keyof typeof projectsDetail];

  // If project doesn't exist, handle gracefully
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
        <p className="text-gray-600 mb-8">The project you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Button asChild>
          <Link href="/projects">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
      </div>
    );
  }

  // Type-safe property accessors
  const isAPIProject = (p: any): p is Project => p && typeof p.id === 'number';
  
  // Extract data with proper type checking
  const projectName = isAPIProject(project) ? project.name : (project as any).title || 'Project';
  const projectStatus = isAPIProject(project) 
    ? project.projectStatus?.data?.name || "Unknown"
    : (project as any).status || "Unknown";
  const projectType = isAPIProject(project)
    ? project.projectType?.data?.name || "Unknown Type"
    : (project as any).type || "Unknown Type";
  const projectLocation = isAPIProject(project)
    ? project.location?.data?.name || "Location TBD"
    : (project as any).location || "Location TBD";
  const projectCity = isAPIProject(project)
    ? project.location?.data?.city?.data?.name || ""
    : (project as any).city || "";
  const mainPhoto = isAPIProject(project) ? getMainPhoto(project.photos || []) : null;
  const unitTypes = isAPIProject(project) 
    ? formatUnitTypes(project.residentialUnits || [], project.commercialFloors || [])
    : 'Mixed Use';

  return (
    <main className="min-h-screen pb-16">
      {/* Enhanced Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src={
              mainPhoto
                ? getStrapiMedia(mainPhoto) || '/landscape.jpg'
                : (project as any).mainImage || '/landscape.jpg'
            }
            alt={projectName} 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>
        
        {/* Navigation */}
        <div className="absolute top-4 left-4 z-20">
          <Button asChild variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
            <Link href="/projects">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Projects
            </Link>
          </Button>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white pb-16">
          <div className="mb-6">
            <Badge
              className={`text-sm font-medium mb-4 ${
                projectStatus === 'Completed' ? 'bg-green-500 hover:bg-green-600' :
                projectStatus === 'Ongoing' ? 'bg-blue-500 hover:bg-blue-600' :
                'bg-amber-500 hover:bg-amber-600'
              }`}
            >
              {projectStatus}
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {projectName}
          </h1>
          
          <p className="text-xl md:text-2xl max-w-4xl mb-6 leading-relaxed">
            {project.description}
          </p>
          
          {/* Location and Key Info */}
          <div className="flex flex-wrap items-center gap-6 text-lg">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{projectLocation}{projectCity && `, ${projectCity}`}</span>
            </div>
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              <span>{projectType}</span>
            </div>
            {project.floors && (
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-2" />
                <span>{project.floors} Floors</span>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Phone className="h-4 w-4 mr-2" />
              Contact Sales
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
              <Link href="#gallery">
                View Gallery
              </Link>
            </Button>
            {project.documents && project.documents.length > 0 && (
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                <Download className="h-4 w-4 mr-2" />
                Download Brochure
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Quick Info */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-2">
                <Building className="h-5 w-5 text-blue-500 mr-2" />
                <div className="text-sm font-medium text-gray-500">Project Type</div>
              </div>
              <div className="text-lg font-bold">{projectType}</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-2">
                <Calendar className="h-5 w-5 text-green-500 mr-2" />
                <div className="text-sm font-medium text-gray-500">Construction Timeline</div>
              </div>
              <div className="text-lg font-bold">
                {project.construction_start_date ? new Date(project.construction_start_date).getFullYear() : 
                (project.startDate ? new Date(project.startDate).getFullYear() : 'TBD')}
                {(project.construction_end_date || project.endDate || project.completionDate) && 
                  ` - ${new Date(project.construction_end_date || project.endDate || project.completionDate).getFullYear()}`
                }
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-2">
                <Square className="h-5 w-5 text-purple-500 mr-2" />
                <div className="text-sm font-medium text-gray-500">Land Area</div>
              </div>
              <div className="text-lg font-bold">
                {project.land_size || project.landSize || 'Contact for details'}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-orange-500 mr-2" />
                <div className="text-sm font-medium text-gray-500">Total Units</div>
              </div>
              <div className="text-lg font-bold">
                {(() => {
                  const residential = project.residentialUnits?.length || 0;
                  const commercial = project.commercialFloors?.length || 0;
                  const total = residential + commercial;
                  return total > 0 ? total : (project.totalUnits || 'TBD');
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Project Specifications */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Project Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* About Section */}
            <div>
              <h2 className="text-3xl font-bold mb-6">About This Development</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                {project.content ? (
                  <div dangerouslySetInnerHTML={{ __html: project.content }} />
                ) : project.longDescription ? (
                  <div dangerouslySetInnerHTML={{ __html: project.longDescription }} />
                ) : (
                  <p>{project.description}</p>
                )}
              </div>
            </div>

            {/* Project Specifications */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Project Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Specifications */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Building Details</h4>
                  {project.floors && (
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Total Floors:</span>
                      <span className="font-medium">{project.floors}</span>
                    </div>
                  )}
                  {project.land_size && (
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Land Size:</span>
                      <span className="font-medium">{project.land_size}</span>
                    </div>
                  )}
                  {project.land_facing && (
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Land Facing:</span>
                      <span className="font-medium">{project.land_facing}</span>
                    </div>
                  )}
                  {project.road_width && (
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Road Width:</span>
                      <span className="font-medium">{project.road_width}</span>
                    </div>
                  )}
                  {project.parking_spaces && (
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Parking Spaces:</span>
                      <span className="font-medium">{project.parking_spaces}</span>
                    </div>
                  )}
                </div>

                {/* Construction Details */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Construction Timeline</h4>
                  {project.construction_start_date && (
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Start Date:</span>
                      <span className="font-medium">{new Date(project.construction_start_date).toLocaleDateString()}</span>
                    </div>
                  )}
                  {project.construction_end_date && (
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Expected Completion:</span>
                      <span className="font-medium">{new Date(project.construction_end_date).toLocaleDateString()}</span>
                    </div>
                  )}
                  {project.handover_date && (
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Handover Date:</span>
                      <span className="font-medium">{new Date(project.handover_date).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Status:</span>
                    <Badge className={`${
                      projectStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                      projectStatus === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {projectStatus}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Gallery */}
            <div id="gallery">
              <h3 className="text-2xl font-bold mb-6">Project Gallery</h3>
              {project.photos && project.photos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.photos.map((photoItem: any, index: number) => {
                    const photo = photoItem.photo;
                    const caption = photoItem.caption;
                    const category = photoItem.category;
                    
                    return (
                      <div key={index} className="group relative">
                        <AspectRatio ratio={4/3}>
                          <div className="relative h-full rounded-lg overflow-hidden bg-gray-100">
                            <Image 
                              src={getStrapiMedia(photo) || '/landscape.jpg'} 
                              alt={caption || `${projectName} - Image ${index + 1}`} 
                              fill 
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                            
                            {/* Category Badge */}
                            {category && (
                              <div className="absolute top-2 left-2">
                                <Badge variant="secondary" className="text-xs bg-white/90 text-gray-800">
                                  {category}
                                </Badge>
                              </div>
                            )}
                            
                            {/* Main Photo Indicator */}
                            {photoItem.isMain && (
                              <div className="absolute top-2 right-2">
                                <Badge className="text-xs bg-blue-500">
                                  <Star className="h-3 w-3 mr-1" />
                                  Main
                                </Badge>
                              </div>
                            )}
                          </div>
                        </AspectRatio>
                        
                        {/* Caption */}
                        {caption && (
                          <p className="mt-2 text-sm text-gray-600 text-center">{caption}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : project.gallery?.data ? (
                // Fallback to old gallery structure
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.gallery.data.map((image: any, index: number) => (
                    <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                      <Image 
                        src={getStrapiMedia(image) || '/landscape.jpg'} 
                        alt={`${projectName} - Image ${index + 1}`} 
                        fill 
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              ) : project.galleryImages ? (
                // Legacy fallback structure
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.galleryImages.map((image: any, index: number) => (
                    <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                      <Image 
                        src={image} 
                        alt={`${projectName} - Image ${index + 1}`} 
                        fill 
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Gallery images will be available soon.</p>
                </div>
              )}
            </div>

            {/* Unit Types and Floor Plans */}
            {(project.residentialUnits?.length > 0 || project.commercialFloors?.length > 0 || project.unitTypes?.length > 0) && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Unit Types & Floor Plans</h3>
                
                {/* Residential Units */}
                {project.residentialUnits && project.residentialUnits.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4 text-blue-600">Residential Units</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.residentialUnits.map((unit: any, index: number) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-4">
                            <h5 className="font-semibold text-lg">{unit.unitType || `Unit ${index + 1}`}</h5>
                            {unit.isAvailable && (
                              <Badge className="bg-green-100 text-green-800">Available</Badge>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            {unit.area && (
                              <div>
                                <span className="text-gray-500">Area:</span>
                                <span className="font-medium ml-2">{unit.area}</span>
                              </div>
                            )}
                            {unit.bedrooms && (
                              <div>
                                <span className="text-gray-500">Bedrooms:</span>
                                <span className="font-medium ml-2">{unit.bedrooms}</span>
                              </div>
                            )}
                            {unit.bathrooms && (
                              <div>
                                <span className="text-gray-500">Bathrooms:</span>
                                <span className="font-medium ml-2">{unit.bathrooms}</span>
                              </div>
                            )}
                            {unit.balconies && (
                              <div>
                                <span className="text-gray-500">Balconies:</span>
                                <span className="font-medium ml-2">{unit.balconies}</span>
                              </div>
                            )}
                          </div>
                          
                          {unit.features && unit.features.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm text-gray-500 mb-2">Features:</p>
                              <div className="flex flex-wrap gap-1">
                                {unit.features.slice(0, 3).map((feature: any, fIndex: number) => (
                                  <Badge key={fIndex} variant="outline" className="text-xs">
                                    {feature.name || (typeof feature === 'string' ? feature : 'Feature')}
                                  </Badge>
                                ))}
                                {unit.features.length > 3 && (
                                  <Badge variant="outline" className="text-xs">+{unit.features.length - 3} more</Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Commercial Floors */}
                {project.commercialFloors && project.commercialFloors.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4 text-purple-600">Commercial Floors</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.commercialFloors.map((floor: any, index: number) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-4">
                            <h5 className="font-semibold text-lg">{floor.floorName || `Floor ${index + 1}`}</h5>
                            {floor.isAvailable && (
                              <Badge className="bg-green-100 text-green-800">Available</Badge>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            {floor.floorNumber && (
                              <div>
                                <span className="text-gray-500">Floor Number:</span>
                                <span className="font-medium ml-2">{floor.floorNumber}</span>
                              </div>
                            )}
                            {floor.area && (
                              <div>
                                <span className="text-gray-500">Area:</span>
                                <span className="font-medium ml-2">{floor.area}</span>
                              </div>
                            )}
                            {floor.usage && (
                              <div>
                                <span className="text-gray-500">Usage:</span>
                                <span className="font-medium ml-2">{floor.usage}</span>
                              </div>
                            )}
                            {floor.facilities && (
                              <div>
                                <span className="text-gray-500">Facilities:</span>
                                <span className="font-medium ml-2">{floor.facilities}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Legacy Unit Types Support */}
                {project.unitTypes && project.unitTypes.length > 0 && !project.residentialUnits && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.unitTypes.map((unit: any, index: number) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                          <h5 className="font-semibold text-lg mb-4">{unit.name || unit.type}</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Size:</span>
                              <span className="font-medium">{unit.area ? `${unit.area}m²` : unit.size}</span>
                            </div>
                            {unit.bedrooms && (
                              <div className="flex justify-between">
                                <span className="text-gray-500">Bedrooms:</span>
                                <span className="font-medium">{unit.bedrooms}</span>
                              </div>
                            )}
                            {unit.bathrooms && (
                              <div className="flex justify-between">
                                <span className="text-gray-500">Bathrooms:</span>
                                <span className="font-medium">{unit.bathrooms}</span>
                              </div>
                            )}
                            {unit.available && (
                              <div className="flex justify-between">
                                <span className="text-gray-500">Available:</span>
                                <span className="font-medium text-blue-600">{unit.available}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Enhanced Features & Amenities with Iconography */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Features & Amenities</h3>
              
              {/* Project Features */}
              {project.features && project.features.length > 0 && (
                <div className="mb-12">
                  <h4 className="text-xl font-semibold mb-6 text-green-600 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.features.map((feature: any, index: number) => {
                      const categoryColors = getCategoryColor(feature.category || 'convenience');
                      
                      return (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${categoryColors} flex-shrink-0`}>
                              {getFeatureIcon(feature.icon || 'sparkles')}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-semibold text-gray-900 mb-1 text-sm leading-tight">
                                {feature.name || (typeof feature === 'string' ? feature : 'Feature')}
                              </h5>
                              {feature.description && (
                                <p className="text-xs text-gray-600 leading-relaxed">{feature.description}</p>
                              )}
                              {feature.category && (
                                <div className="mt-2">
                                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                    feature.category === 'security' ? 'bg-red-100 text-red-700' :
                                    feature.category === 'utilities' ? 'bg-blue-100 text-blue-700' :
                                    feature.category === 'convenience' ? 'bg-green-100 text-green-700' :
                                    feature.category === 'technology' ? 'bg-purple-100 text-purple-700' :
                                    'bg-gray-100 text-gray-700'
                                  }`}>
                                    {feature.category}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Project Amenities */}
              {project.amenities && project.amenities.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-6 text-blue-600 flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    Premium Amenities
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.amenities.map((amenity: any, index: number) => {
                      const categoryColors = getCategoryColor(amenity.category || 'services');
                      
                      return (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${categoryColors} flex-shrink-0`}>
                              {getFeatureIcon(amenity.icon || 'star')}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-semibold text-gray-900 mb-1 text-sm leading-tight">
                                {amenity.name || (typeof amenity === 'string' ? amenity : 'Amenity')}
                              </h5>
                              {amenity.description && (
                                <p className="text-xs text-gray-600 leading-relaxed">{amenity.description}</p>
                              )}
                              {amenity.category && (
                                <div className="mt-2">
                                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                    amenity.category === 'parking' ? 'bg-indigo-100 text-indigo-700' :
                                    amenity.category === 'services' ? 'bg-teal-100 text-teal-700' :
                                    amenity.category === 'recreation' ? 'bg-pink-100 text-pink-700' :
                                    amenity.category === 'outdoor' ? 'bg-lime-100 text-lime-700' :
                                    amenity.category === 'community' ? 'bg-amber-100 text-amber-700' :
                                    amenity.category === 'security' ? 'bg-red-100 text-red-700' :
                                    'bg-gray-100 text-gray-700'
                                  }`}>
                                    {amenity.category}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Fallback for no features/amenities */}
              {(!project.features || project.features.length === 0) && (!project.amenities || project.amenities.length === 0) && (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <div className="mb-4">
                    <Building className="h-16 w-16 mx-auto text-gray-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">Features & Amenities</h4>
                  <p className="text-gray-500">Detailed information will be available soon.</p>
                </div>
              )}
            </div>

            {/* Construction Progress - Only show if not completed */}
            {(project.status?.name || project.status) !== 'Completed' && (
              <>
                <h3 className="text-2xl font-bold mt-12 mb-6">Construction Progress</h3>
                <div className="bg-gray-200 h-4 rounded-full overflow-hidden mb-2">
                  <div 
                    className="bg-blue-600 h-full rounded-full" 
                    style={{ width: `${project.constructionProgress || 50}%` }}
                  ></div>
                </div>
                <p className="text-gray-600 mb-12">{project.constructionProgress || 50}% Complete</p>
              </>
            )}
          </div>

          {/* Right Column - Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Project Information Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Project Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 text-sm">Developer:</span>
                    <span className="font-medium text-right">{project.developer || 'EPML Properties'}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 text-sm">Architect:</span>
                    <span className="font-medium text-right">{project.architect || 'EPML Design Studio'}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 text-sm">Status:</span>
                    <Badge className={`${
                      projectStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                      projectStatus === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {projectStatus}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 text-sm">Location:</span>
                    <span className="font-medium text-right">
                      {projectLocation}{projectCity && `, ${projectCity}`}
                    </span>
                  </div>
                  {project.coordinates && (
                    <div className="flex justify-between items-start">
                      <span className="text-gray-600 text-sm">Coordinates:</span>
                      <span className="font-medium text-right text-xs">
                        {project.coordinates.lat}, {project.coordinates.lng}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Document Downloads */}
              {project.documents && project.documents.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Downloads</h3>
                  <div className="space-y-3">
                    {project.documents.filter((doc: any) => doc.isPublic).map((document: any, index: number) => (
                      <Button
                        key={index}
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <a href={getStrapiMedia(document.file) || '#'} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          {document.title || `${document.category} Document`}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Unit Summary */}
              {(project.residentialUnits?.length > 0 || project.commercialFloors?.length > 0 || project.unitTypes?.length > 0) && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Unit Summary</h3>
                  <div className="space-y-3">
                    {project.residentialUnits && project.residentialUnits.length > 0 && (
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center">
                          <Home className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-sm font-medium">Residential Units</span>
                        </div>
                        <Badge variant="secondary">{project.residentialUnits.length}</Badge>
                      </div>
                    )}
                    {project.commercialFloors && project.commercialFloors.length > 0 && (
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 text-purple-500 mr-2" />
                          <span className="text-sm font-medium">Commercial Floors</span>
                        </div>
                        <Badge variant="secondary">{project.commercialFloors.length}</Badge>
                      </div>
                    )}
                    {project.unitTypes && project.unitTypes.length > 0 && !project.residentialUnits && (
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <Square className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm font-medium">Unit Types</span>
                        </div>
                        <Badge variant="secondary">{project.unitTypes.length}</Badge>
                      </div>
                    )}
                  </div>
                  <Button asChild className="w-full mt-4" size="sm">
                    <Link href={`/contact?project=${slug}`}>
                      Inquire About Units
                    </Link>
                  </Button>
                </div>
              )}

              {/* Contact Information */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Contact Information</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-500 mr-3" />
                    <span className="text-sm">{project.contactEmail || 'sales@epmlproperties.com'}</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-5 w-5 text-gray-500 mr-3" />
                    <span className="text-sm">{project.contactPhone || '+880 1234-567890'}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button asChild className="w-full">
                    <Link href={`/contact?project=${slug}`}>
                      Schedule a Viewing
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/contact?project=${slug}&inquiry=pricing`}>
                      Get Pricing Information
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="gallery" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Project Gallery</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore {projectName} through our interactive photo gallery showcasing the architecture, interiors, and development progress.
            </p>
          </div>

          {/* Interactive Image Grid */}
          {isAPIProject(project) ? (
            <ProjectImageGrid 
              photos={project.photos || []}
              bulkPhotoUploads={project.bulkPhotoUploads || []}
              projectName={projectName}
            />
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
              <div className="max-w-md mx-auto">
                <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Photo Gallery Coming Soon
                </h3>
                <p className="text-gray-500 mb-6">
                  We're currently preparing beautiful photos of {projectName}. 
                  Check back soon to see our interactive gallery.
                </p>
                <Button asChild variant="outline">
                  <Link href="/projects">
                    View Other Projects
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {/* Gallery Actions */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Interested in {projectName}?
            </h3>
            <p className="text-gray-600 mb-4">Want to see more or schedule a site visit?</p>
            <Button asChild size="lg">
              <Link href={`/contact?project=${slug}&inquiry=viewing`}>
                Schedule Site Visit
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className='py-16 bg-blue-900 text-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl font-bold mb-4'>Interested in this project?</h2>
          <p className='text-xl mb-8 max-w-3xl mx-auto'>
            Contact our sales team for more information or to schedule a personal consultation.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <Button asChild size='lg' className='bg-white text-blue-900 hover:bg-gray-100'>
              <Link href='/contact'>Contact Sales Team</Link>
            </Button>
            <Button asChild variant='outline' size='lg' className='border-white hover:bg-white/10'>
              <Link href='/projects'>View Other Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

// In a real application, this would use getStaticPaths to pre-render all project pages
/*
export async function generateStaticParams() {
  // Fetch all project slugs
  const projects = await fetch('https://api.example.com/projects').then(res => res.json())
  
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  // Fetch project data
  const project = await fetch(`https://api.example.com/projects/${params.slug}`).then(res => res.json())
  
  return {
    title: `${project.title} | EPML Properties`,
    description: project.description,
  }
}
*/
