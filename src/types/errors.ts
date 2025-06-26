/**
 * Error Type Definitions
 * 
 * These types define comprehensive error handling interfaces for the application.
 * 
 * @fileoverview Error type definitions
 */

/**
 * Base Error Types
 */
export interface BaseError {
  name: string;
  message: string;
  code?: string;
  timestamp?: string;
  stack?: string;
}

/**
 * API Error Types
 */
export interface APIError extends BaseError {
  status: number;
  statusText?: string;
  url?: string;
  method?: string;
  details?: Record<string, any>;
  retryable?: boolean;
}

/**
 * Validation Error Types
 */
export interface ValidationError extends BaseError {
  field: string;
  value: any;
  constraints: string[];
  children?: ValidationError[];
}

export interface ValidationErrorResponse {
  message: string;
  errors: ValidationError[];
  statusCode: number;
}

/**
 * Network Error Types
 */
export interface NetworkError extends BaseError {
  type: 'timeout' | 'offline' | 'server_error' | 'connection_failed';
  retryAfter?: number;
  retryable: boolean;
}

/**
 * Authentication Error Types
 */
export interface AuthError extends BaseError {
  type: 'unauthorized' | 'forbidden' | 'token_expired' | 'invalid_credentials';
  statusCode: 401 | 403;
  redirectTo?: string;
}

/**
 * Permission Error Types
 */
export interface PermissionError extends BaseError {
  resource: string;
  action: string;
  requiredRoles?: string[];
  userRoles?: string[];
}

/**
 * File Upload Error Types
 */
export interface FileUploadError extends BaseError {
  fileName: string;
  fileSize?: number;
  maxSize?: number;
  allowedTypes?: string[];
  fileType?: string;
  reason: 'size_exceeded' | 'invalid_type' | 'upload_failed' | 'virus_detected';
}

/**
 * Database Error Types
 */
export interface DatabaseError extends BaseError {
  query?: string;
  table?: string;
  constraint?: string;
  type: 'connection' | 'query' | 'constraint' | 'transaction' | 'timeout';
}

/**
 * Business Logic Error Types
 */
export interface BusinessError extends BaseError {
  domain: string;
  operation: string;
  context?: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Form Error Types
 */
export interface FormError extends BaseError {
  formId: string;
  field?: string;
  errors: Record<string, string[]>;
}

/**
 * Integration Error Types
 */
export interface IntegrationError extends BaseError {
  service: string;
  endpoint?: string;
  requestId?: string;
  type: 'configuration' | 'authentication' | 'rate_limit' | 'service_unavailable';
}

/**
 * Client Error Types
 */
export interface ClientError extends BaseError {
  type: 'javascript' | 'rendering' | 'routing' | 'state_management';
  component?: string;
  props?: Record<string, any>;
  userAgent?: string;
  url?: string;
}

/**
 * Error Severity Levels
 */
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

/**
 * Error Categories
 */
export type ErrorCategory = 
  | 'api'
  | 'validation'
  | 'network'
  | 'authentication'
  | 'permission'
  | 'file_upload'
  | 'database'
  | 'business'
  | 'form'
  | 'integration'
  | 'client'
  | 'system'
  | 'unknown';

/**
 * Comprehensive Error Interface
 */
export interface AppError extends BaseError {
  id: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  context?: Record<string, any>;
  metadata?: {
    userId?: string;
    sessionId?: string;
    requestId?: string;
    userAgent?: string;
    url?: string;
    timestamp: string;
  };
  recoverable?: boolean;
  retryable?: boolean;
  retryCount?: number;
  maxRetries?: number;
  retryAfter?: number;
}

/**
 * Error Handler Types
 */
export type ErrorHandler<T extends BaseError = BaseError> = (error: T) => void;

export interface ErrorHandlerConfig {
  onAPIError?: ErrorHandler<APIError>;
  onValidationError?: ErrorHandler<ValidationError>;
  onNetworkError?: ErrorHandler<NetworkError>;
  onAuthError?: ErrorHandler<AuthError>;
  onPermissionError?: ErrorHandler<PermissionError>;
  onFileUploadError?: ErrorHandler<FileUploadError>;
  onDatabaseError?: ErrorHandler<DatabaseError>;
  onBusinessError?: ErrorHandler<BusinessError>;
  onFormError?: ErrorHandler<FormError>;
  onIntegrationError?: ErrorHandler<IntegrationError>;
  onClientError?: ErrorHandler<ClientError>;
  onUnknownError?: ErrorHandler<AppError>;
}

/**
 * Error Reporting Types
 */
export interface ErrorReport {
  error: AppError;
  breadcrumbs: Array<{
    timestamp: string;
    message: string;
    category: string;
    level: 'debug' | 'info' | 'warning' | 'error';
    data?: Record<string, any>;
  }>;
  user?: {
    id?: string;
    email?: string;
    name?: string;
  };
  request?: {
    url: string;
    method: string;
    headers?: Record<string, string>;
    body?: any;
  };
  environment: {
    userAgent: string;
    url: string;
    timestamp: string;
    version?: string;
    environment?: string;
  };
}

/**
 * Error Recovery Types
 */
export interface ErrorRecovery {
  canRecover: boolean;
  recoveryActions: Array<{
    label: string;
    action: () => void | Promise<void>;
    primary?: boolean;
  }>;
  fallbackComponent?: React.ComponentType<{ error: AppError }>;
  redirectTo?: string;
}

/**
 * Error Boundary Types
 */
export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorId?: string;
  errorInfo?: React.ErrorInfo;
  retryCount: number;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorBoundaryFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  enableRetry?: boolean;
  maxRetries?: number;
  resetKeys?: Array<string | number>;
  resetOnPropsChange?: boolean;
}

export interface ErrorBoundaryFallbackProps {
  error: Error;
  errorInfo?: React.ErrorInfo;
  retry?: () => void;
  canRetry?: boolean;
  retryCount?: number;
}

/**
 * Error Context Types
 */
export interface ErrorContext {
  errors: AppError[];
  addError: (error: AppError) => void;
  removeError: (errorId: string) => void;
  clearErrors: () => void;
  getErrorsByCategory: (category: ErrorCategory) => AppError[];
  getErrorsBySeverity: (severity: ErrorSeverity) => AppError[];
}

/**
 * Error Logger Types
 */
export interface ErrorLogger {
  log: (error: AppError) => Promise<void>;
  logToConsole: (error: AppError) => void;
  logToService: (error: AppError) => Promise<void>;
  createReport: (error: AppError) => ErrorReport;
}

/**
 * Error Configuration Types
 */
export interface ErrorConfig {
  enableLogging: boolean;
  enableReporting: boolean;
  enableRetry: boolean;
  maxRetries: number;
  retryDelay: number;
  logLevel: 'debug' | 'info' | 'warning' | 'error';
  reportingService?: {
    apiKey: string;
    projectId: string;
    environment: string;
  };
  ignoredErrors?: string[];
  sensitiveFields?: string[];
}

/**
 * HTTP Error Status Types
 */
export type HTTPErrorStatus = 
  | 400 // Bad Request
  | 401 // Unauthorized
  | 403 // Forbidden
  | 404 // Not Found
  | 405 // Method Not Allowed
  | 409 // Conflict
  | 422 // Unprocessable Entity
  | 429 // Too Many Requests
  | 500 // Internal Server Error
  | 502 // Bad Gateway
  | 503 // Service Unavailable
  | 504; // Gateway Timeout

/**
 * Error Message Templates
 */
export interface ErrorMessages {
  [key: string]: {
    title: string;
    message: string;
    actions?: Array<{
      label: string;
      action: string;
    }>;
  };
}

/**
 * Error Notification Types
 */
export interface ErrorNotification {
  id: string;
  error: AppError;
  title: string;
  message: string;
  type: 'toast' | 'banner' | 'modal' | 'inline';
  duration?: number;
  dismissible?: boolean;
  actions?: Array<{
    label: string;
    action: () => void;
    style?: 'primary' | 'secondary' | 'danger';
  }>;
}