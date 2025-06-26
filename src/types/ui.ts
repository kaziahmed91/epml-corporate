/**
 * UI Component Type Definitions
 * 
 * These types define props and interfaces for all React components,
 * ensuring type safety across the entire UI layer.
 * 
 * @fileoverview UI component type definitions
 */

import React from 'react';
import { 
  Project, 
  City, 
  Location, 
  ProjectStatus, 
  ProjectType,
  Document,
  ConstructionUpdate,
  Testimonial,
  NewsArticle,
  Job
} from './content';
import { ProjectFilters, SearchQuery } from './api';

/**
 * Common Component Props
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  'data-testid'?: string;
}

/**
 * Layout Component Props
 */
export interface LayoutProps extends BaseComponentProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export interface AppShellProps extends BaseComponentProps {
  showNavbar?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
}

export interface NavbarProps extends BaseComponentProps {
  isFixed?: boolean;
  variant?: 'default' | 'transparent' | 'dark';
  showSearch?: boolean;
  showLanguageSelector?: boolean;
}

export interface FooterProps extends BaseComponentProps {
  variant?: 'default' | 'minimal';
  showSocialLinks?: boolean;
  showNewsletter?: boolean;
}

/**
 * Page Component Props
 */
export interface PageProps {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export interface ProjectPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    status?: string;
    type?: string;
    location?: string;
    city?: string;
    search?: string;
    page?: string;
  }>;
}

export interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export interface NewsPageProps {
  params: Promise<Record<string, string>>;
  searchParams: Promise<{
    category?: string;
    tag?: string;
    search?: string;
    page?: string;
  }>;
}

export interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export interface JobPageProps {
  params: Promise<Record<string, string>>;
  searchParams: Promise<{
    department?: string;
    location?: string;
    type?: string;
    level?: string;
    search?: string;
    page?: string;
  }>;
}

export interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Project Components
 */
export interface ProjectCardProps extends BaseComponentProps {
  project: Project;
  variant?: 'default' | 'featured' | 'compact' | 'detailed';
  showStatus?: boolean;
  showType?: boolean;
  showLocation?: boolean;
  showDescription?: boolean;
  showFeatures?: boolean;
  showCTA?: boolean;
  onViewDetails?: (project: Project) => void;
  onContact?: (project: Project) => void;
}

export interface ProjectGridProps extends BaseComponentProps {
  projects: Project[];
  variant?: 'grid' | 'list' | 'masonry';
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  showFilters?: boolean;
  showSearch?: boolean;
  showPagination?: boolean;
  isLoading?: boolean;
  error?: string | null;
}

export interface ProjectFiltersProps extends BaseComponentProps {
  filters: ProjectFilters;
  cities: City[];
  locations: Location[];
  statuses: ProjectStatus[];
  types: ProjectType[];
  onFiltersChange: (filters: ProjectFilters) => void;
  onReset: () => void;
  isLoading?: boolean;
}

export interface ProjectSearchProps extends BaseComponentProps {
  query: string;
  placeholder?: string;
  onSearch: (query: string) => void;
  onClear: () => void;
  isLoading?: boolean;
  suggestions?: string[];
}

export interface ProjectGalleryProps extends BaseComponentProps {
  project: Project;
  variant?: 'grid' | 'carousel' | 'masonry';
  showCategories?: boolean;
  showCaptions?: boolean;
  allowDownload?: boolean;
  onImageClick?: (imageUrl: string, index: number) => void;
}

export interface ProjectSpecsProps extends BaseComponentProps {
  project: Project;
  variant?: 'full' | 'summary' | 'compact';
  showUnits?: boolean;
  showAmenities?: boolean;
  showFeatures?: boolean;
  showDocuments?: boolean;
}

/**
 * Form Component Props
 */
export interface ContactFormProps extends BaseComponentProps {
  projectId?: number;
  inquiry?: 'general' | 'pricing' | 'viewing' | 'photos' | 'documents';
  onSubmit?: (data: any) => void;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  isLoading?: boolean;
}

export interface SearchFormProps extends BaseComponentProps {
  query: SearchQuery;
  onSearch: (query: SearchQuery) => void;
  showAdvanced?: boolean;
  placeholder?: string;
}

export interface NewsletterFormProps extends BaseComponentProps {
  variant?: 'inline' | 'popup' | 'footer';
  onSubscribe?: (email: string) => void;
  isLoading?: boolean;
}

export interface JobApplicationFormProps extends BaseComponentProps {
  job: Job;
  onSubmit?: (data: any) => void;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  isLoading?: boolean;
}

/**
 * Content Display Components
 */
export interface TestimonialCardProps extends BaseComponentProps {
  testimonial: Testimonial;
  variant?: 'card' | 'quote' | 'minimal';
  showProject?: boolean;
  showRating?: boolean;
  showPhoto?: boolean;
}

export interface TestimonialSliderProps extends BaseComponentProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

export interface NewsCardProps extends BaseComponentProps {
  article: NewsArticle;
  variant?: 'card' | 'horizontal' | 'minimal';
  showExcerpt?: boolean;
  showDate?: boolean;
  showAuthor?: boolean;
  showTags?: boolean;
}

export interface DocumentListProps extends BaseComponentProps {
  documents: Document[];
  variant?: 'list' | 'grid' | 'table';
  showCategories?: boolean;
  showSizes?: boolean;
  allowDownload?: boolean;
  onDownload?: (document: Document) => void;
}

export interface ConstructionTimelineProps extends BaseComponentProps {
  updates: ConstructionUpdate[];
  variant?: 'timeline' | 'cards' | 'progress';
  showPhotos?: boolean;
  showProgress?: boolean;
  isInteractive?: boolean;
}

/**
 * Interactive Components
 */
export interface MapProps extends BaseComponentProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    id: string;
    position: [number, number];
    title: string;
    description?: string;
    project?: Project;
  }>;
  onMarkerClick?: (marker: any) => void;
  showControls?: boolean;
  showFullscreen?: boolean;
  height?: string | number;
}

export interface FilterPanelProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Record<string, any>;
  onFiltersChange: (filters: Record<string, any>) => void;
  title?: string;
}

export interface SortControlProps extends BaseComponentProps {
  options: Array<{
    value: string;
    label: string;
  }>;
  value: string;
  onChange: (value: string) => void;
  direction?: 'asc' | 'desc';
  onDirectionChange?: (direction: 'asc' | 'desc') => void;
}

export interface PaginationProps extends BaseComponentProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  showPageSize?: boolean;
  showInfo?: boolean;
}

/**
 * Loading and Error States
 */
export interface LoadingProps extends BaseComponentProps {
  variant?: 'spinner' | 'skeleton' | 'dots' | 'pulse';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export interface ErrorBoundaryProps extends BaseComponentProps {
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export interface ErrorMessageProps extends BaseComponentProps {
  error: string | Error;
  variant?: 'inline' | 'banner' | 'modal';
  showRetry?: boolean;
  onRetry?: () => void;
}

/**
 * Media Components
 */
export interface ImageProps extends BaseComponentProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

export interface VideoPlayerProps extends BaseComponentProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
  width?: number;
  height?: number;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

export interface ImageGalleryProps extends BaseComponentProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
    thumbnail?: string;
  }>;
  variant?: 'grid' | 'carousel' | 'lightbox';
  columns?: number;
  showThumbnails?: boolean;
  showCaptions?: boolean;
  allowZoom?: boolean;
  onImageSelect?: (index: number) => void;
}

/**
 * Modal and Overlay Components
 */
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  maskClosable?: boolean;
  footer?: React.ReactNode;
}

export interface DrawerProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  width?: string | number;
  height?: string | number;
  closable?: boolean;
  maskClosable?: boolean;
}

export interface TooltipProps extends BaseComponentProps {
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  delay?: number;
  arrow?: boolean;
}

/**
 * Navigation Components
 */
export interface BreadcrumbProps extends BaseComponentProps {
  items: Array<{
    label: string;
    href?: string;
    icon?: React.ReactNode;
    isActive?: boolean;
  }>;
  separator?: React.ReactNode;
}

export interface TabsProps extends BaseComponentProps {
  items: Array<{
    key: string;
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
  }>;
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  variant?: 'line' | 'card' | 'button';
}

/**
 * Data Display Components
 */
export interface StatsCardProps extends BaseComponentProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'outlined' | 'filled';
}

export interface ProgressBarProps extends BaseComponentProps {
  value: number;
  max?: number;
  showValue?: boolean;
  label?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

export interface BadgeProps extends BaseComponentProps {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  count?: number;
}

/**
 * Animation and Transition Props
 */
export interface AnimationProps {
  animation?: 'fadeIn' | 'slideIn' | 'zoomIn' | 'bounceIn';
  duration?: number;
  delay?: number;
  easing?: string;
}

export interface TransitionProps {
  in: boolean;
  timeout?: number;
  onEnter?: () => void;
  onExit?: () => void;
}

/**
 * ImageGrid component types
 */
export interface ImageGridCard {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
  caption?: string;
  isMain?: boolean;
  aspectRatio?: number;
  orientation?: 'landscape' | 'portrait' | 'square';
}

export interface ImageGridProps {
  cards: ImageGridCard[];
  className?: string;
}

export interface LayoutGridProps {
  cards: ImageGridCard[];
}