/**
 * Utility Type Definitions
 * 
 * These types provide common utility types used throughout the application.
 * They include helpers for type manipulation and common patterns.
 * 
 * @fileoverview Utility type definitions
 */

/**
 * Make specific properties required
 */
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Make specific properties optional
 */
export type OptionalBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Deep partial type
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Deep required type
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object | undefined ? DeepRequired<Required<T[P]>> : T[P];
};

/**
 * Exclude null and undefined
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * Extract array element type
 */
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

/**
 * Extract promise return type
 */
export type PromiseReturnType<T> = T extends Promise<infer U> ? U : T;

/**
 * Extract function return type
 */
export type FunctionReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

/**
 * Create a type with all properties as strings (for form values)
 */
export type StringRecord<T> = {
  [K in keyof T]: string;
};

/**
 * Create a union of all property names that are required
 */
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

/**
 * Create a union of all property names that are optional
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

/**
 * Pick only required properties
 */
export type PickRequired<T> = Pick<T, RequiredKeys<T>>;

/**
 * Pick only optional properties
 */
export type PickOptional<T> = Pick<T, OptionalKeys<T>>;

/**
 * Flatten nested object types
 */
export type Flatten<T> = T extends object ? T[keyof T] : T;

/**
 * Create a type where all properties are readonly recursively
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Create a type where all properties are mutable recursively
 */
export type DeepMutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P];
};

/**
 * Create a union of all values in an object
 */
export type ValueOf<T> = T[keyof T];

/**
 * Create a type with specific keys omitted recursively
 */
export type DeepOmit<T, K extends string> = {
  [P in keyof T as P extends K ? never : P]: T[P] extends object ? DeepOmit<T[P], K> : T[P];
};

/**
 * Create a type with specific keys picked recursively
 */
export type DeepPick<T, K extends string> = {
  [P in keyof T as P extends K ? P : never]: T[P] extends object ? DeepPick<T[P], K> : T[P];
};

/**
 * Common ID types
 */
export type ID = string | number;
export type StringID = string;
export type NumberID = number;
export type UUID = string;

/**
 * Timestamp types
 */
export type Timestamp = string;
export type ISODate = string;
export type UnixTimestamp = number;

/**
 * Common status types
 */
export type Status = 'active' | 'inactive' | 'pending' | 'deleted';
export type PublishStatus = 'draft' | 'published' | 'archived';
export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Common sort types
 */
export type SortOrder = 'asc' | 'desc';
export type SortBy<T> = keyof T | string;

/**
 * Pagination types
 */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  start?: number;
  limit?: number;
}

/**
 * Filter and search types
 */
export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: SortOrder;
}

export interface FilterParams {
  [key: string]: any;
}

/**
 * API response wrapper types
 */
export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  meta?: Record<string, any>;
}

// APIError is now imported from './errors'

/**
 * Form state types
 */
export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
}

export type FormErrors<T> = Partial<Record<keyof T, string>>;
export type FormTouched<T> = Partial<Record<keyof T, boolean>>;

/**
 * Event handler types
 */
export type EventHandler<T = void> = (event?: any) => T;
export type ChangeHandler<T> = (value: T) => void;
export type SubmitHandler<T> = (values: T) => void | Promise<void>;

/**
 * Async state types
 */
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export type AsyncStateStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Cache types
 */
export interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export interface CacheConfig {
  ttl: number;
  maxSize?: number;
  persist?: boolean;
}

/**
 * Validation types
 */
export type ValidationRule<T> = (value: T) => string | null;
export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[];
};

/**
 * Configuration types
 */
export interface AppConfig {
  apiUrl: string;
  apiToken: string;
  environment: 'development' | 'staging' | 'production';
  features: Record<string, boolean>;
  analytics: {
    enabled: boolean;
    trackingId?: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string[];
  };
}

/**
 * Theme types
 */
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    background: string;
    surface: string;
    text: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

/**
 * Route types
 */
export interface Route {
  path: string;
  name: string;
  component?: React.ComponentType;
  exact?: boolean;
  protected?: boolean;
  roles?: string[];
}

/**
 * Menu types
 */
export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  badge?: string | number;
  disabled?: boolean;
}

/**
 * Notification types
 */
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    handler: () => void;
  };
}

/**
 * File types
 */
export interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  url?: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

/**
 * Geolocation types
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
  altitudeAccuracy?: number;
  heading?: number;
  speed?: number;
}

export interface GeoLocation {
  coords: Coordinates;
  timestamp: number;
}

/**
 * Analytics types
 */
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customDimensions?: Record<string, string>;
}

/**
 * Feature flag types
 */
export interface FeatureFlag {
  key: string;
  enabled: boolean;
  description?: string;
  rolloutPercentage?: number;
  targeting?: {
    userAttributes?: Record<string, any>;
    environments?: string[];
  };
}