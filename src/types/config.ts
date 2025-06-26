/**
 * Configuration Type Definitions
 * 
 * These types define application configuration interfaces for environment,
 * feature flags, and other configurable settings.
 * 
 * @fileoverview Configuration type definitions
 */

/**
 * Environment Configuration
 */
export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'staging' | 'production';
  NEXT_PUBLIC_STRAPI_API_URL: string;
  STRAPI_API_TOKEN: string;
  NEXT_PUBLIC_SITE_URL: string;
  NEXT_PUBLIC_SITE_NAME: string;
  NEXT_PUBLIC_SITE_DESCRIPTION: string;
}

/**
 * API Configuration
 */
export interface APIConfig {
  baseURL: string;
  apiToken: string;
  timeout: number;
  retries: number;
  retryDelay: number;
  cache: {
    enabled: boolean;
    ttl: number;
    maxSize: number;
  };
  rateLimit: {
    enabled: boolean;
    maxRequests: number;
    windowMs: number;
  };
}

/**
 * Database Configuration
 */
export interface DatabaseConfig {
  client: 'postgres' | 'mysql' | 'sqlite';
  connection: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
    ssl?: boolean;
  };
  pool: {
    min: number;
    max: number;
    acquireTimeoutMillis: number;
    createTimeoutMillis: number;
    destroyTimeoutMillis: number;
    idleTimeoutMillis: number;
    reapIntervalMillis: number;
    createRetryIntervalMillis: number;
  };
}

/**
 * Storage Configuration
 */
export interface StorageConfig {
  provider: 'local' | 'cloudinary' | 'aws-s3' | 'azure' | 'gcp';
  settings: {
    apiKey?: string;
    apiSecret?: string;
    cloudName?: string;
    region?: string;
    bucket?: string;
    accessKeyId?: string;
    secretAccessKey?: string;
    endpoint?: string;
  };
  uploadLimits: {
    fileSize: number;
    allowedTypes: string[];
    maxFiles: number;
  };
}

/**
 * Email Configuration
 */
export interface EmailConfig {
  provider: 'smtp' | 'sendgrid' | 'mailgun' | 'ses';
  settings: {
    host?: string;
    port?: number;
    user?: string;
    pass?: string;
    apiKey?: string;
    domain?: string;
    region?: string;
  };
  from: {
    name: string;
    email: string;
  };
  templates: {
    welcome: string;
    resetPassword: string;
    contactForm: string;
    newsletter: string;
    jobApplication: string;
  };
}

/**
 * Analytics Configuration
 */
export interface AnalyticsConfig {
  enabled: boolean;
  providers: {
    googleAnalytics?: {
      trackingId: string;
      anonymizeIp: boolean;
      cookieConsent: boolean;
    };
    facebookPixel?: {
      pixelId: string;
    };
    hotjar?: {
      siteId: string;
    };
    mixpanel?: {
      token: string;
    };
  };
  events: {
    pageView: boolean;
    downloads: boolean;
    formSubmissions: boolean;
    videoPlays: boolean;
    scrollDepth: boolean;
  };
}

/**
 * SEO Configuration
 */
export interface SEOConfig {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string[];
  defaultOGImage: string;
  siteUrl: string;
  siteName: string;
  twitterHandle: string;
  facebookAppId: string;
  structuredData: {
    enabled: boolean;
    organization: {
      name: string;
      url: string;
      logo: string;
      description: string;
      contactPoint: {
        telephone: string;
        contactType: string;
        email: string;
      };
      address: {
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode: string;
        addressCountry: string;
      };
      sameAs: string[];
    };
  };
}

/**
 * Security Configuration
 */
export interface SecurityConfig {
  cors: {
    origin: string[] | string | boolean;
    credentials: boolean;
    methods: string[];
    allowedHeaders: string[];
  };
  helmet: {
    enabled: boolean;
    contentSecurityPolicy: boolean;
    crossOriginEmbedderPolicy: boolean;
    crossOriginOpenerPolicy: boolean;
    crossOriginResourcePolicy: boolean;
    dnsPrefetchControl: boolean;
    frameguard: boolean;
    hidePoweredBy: boolean;
    hsts: boolean;
    ieNoOpen: boolean;
    noSniff: boolean;
    originAgentCluster: boolean;
    permittedCrossDomainPolicies: boolean;
    referrerPolicy: boolean;
    xssFilter: boolean;
  };
  rateLimit: {
    windowMs: number;
    max: number;
    message: string;
    standardHeaders: boolean;
    legacyHeaders: boolean;
  };
  session: {
    secret: string;
    resave: boolean;
    saveUninitialized: boolean;
    cookie: {
      secure: boolean;
      httpOnly: boolean;
      maxAge: number;
    };
  };
}

/**
 * Feature Flags Configuration
 */
export interface FeatureFlagsConfig {
  enabled: boolean;
  provider: 'local' | 'launchdarkly' | 'split' | 'unleash';
  settings: {
    apiKey?: string;
    environment?: string;
    userId?: string;
  };
  flags: {
    enableNewDesign: boolean;
    enableAdvancedSearch: boolean;
    enableVirtualTours: boolean;
    enableChatbot: boolean;
    enablePropertyComparison: boolean;
    enableInvestmentCalculator: boolean;
    enableMortgageCalculator: boolean;
    enableSavedSearches: boolean;
    enablePropertyAlerts: boolean;
    enableSocialLogin: boolean;
    enableMultiLanguage: boolean;
    enableDarkMode: boolean;
    enablePWA: boolean;
    enableOfflineSupport: boolean;
    enablePushNotifications: boolean;
  };
}

/**
 * Performance Configuration
 */
export interface PerformanceConfig {
  optimization: {
    enableGzip: boolean;
    enableBrotli: boolean;
    enableCaching: boolean;
    enableMinification: boolean;
    enableImageOptimization: boolean;
    enableLazyLoading: boolean;
    enableCodeSplitting: boolean;
    enablePrefetching: boolean;
  };
  monitoring: {
    enabled: boolean;
    sampleRate: number;
    trackingDomains: string[];
    sensitiveDataScrubbing: boolean;
  };
  caching: {
    staticAssets: {
      enabled: boolean;
      maxAge: number;
    };
    apiResponses: {
      enabled: boolean;
      defaultTTL: number;
      maxSize: number;
    };
    pages: {
      enabled: boolean;
      revalidate: number;
    };
  };
}

/**
 * Logging Configuration
 */
export interface LoggingConfig {
  level: 'debug' | 'info' | 'warn' | 'error';
  format: 'json' | 'simple' | 'combined';
  transports: {
    console: {
      enabled: boolean;
      colorize: boolean;
    };
    file: {
      enabled: boolean;
      filename: string;
      maxSize: number;
      maxFiles: number;
    };
    database: {
      enabled: boolean;
      tableName: string;
    };
    external: {
      enabled: boolean;
      service: 'winston' | 'bunyan' | 'pino';
      apiKey?: string;
      endpoint?: string;
    };
  };
  filters: {
    sensitiveFields: string[];
    excludeRoutes: string[];
    excludeUserAgents: string[];
  };
}

/**
 * Notification Configuration
 */
export interface NotificationConfig {
  enabled: boolean;
  providers: {
    email: {
      enabled: boolean;
      provider: string;
      templates: Record<string, string>;
    };
    sms: {
      enabled: boolean;
      provider: 'twilio' | 'nexmo' | 'aws-sns';
      settings: {
        accountSid?: string;
        authToken?: string;
        apiKey?: string;
        apiSecret?: string;
      };
    };
    push: {
      enabled: boolean;
      provider: 'firebase' | 'onesignal' | 'pusher';
      settings: {
        apiKey?: string;
        appId?: string;
        serverKey?: string;
      };
    };
    webhook: {
      enabled: boolean;
      endpoints: Array<{
        name: string;
        url: string;
        events: string[];
        secret?: string;
      }>;
    };
  };
  queues: {
    enabled: boolean;
    provider: 'redis' | 'rabbitmq' | 'sqs';
    settings: {
      host?: string;
      port?: number;
      password?: string;
      db?: number;
    };
  };
}

/**
 * Internationalization Configuration
 */
export interface I18nConfig {
  enabled: boolean;
  defaultLocale: string;
  locales: string[];
  fallbackLocale: string;
  detection: {
    enabled: boolean;
    order: ('cookie' | 'header' | 'querystring' | 'path')[];
    caches: ('cookie' | 'localStorage')[];
  };
  resources: {
    backend: {
      loadPath: string;
      addPath: string;
    };
    fallbackLng: string;
    debug: boolean;
  };
}

/**
 * Theme Configuration
 */
export interface ThemeConfig {
  default: 'light' | 'dark' | 'auto';
  themes: {
    light: {
      colors: Record<string, string>;
      fonts: Record<string, string>;
      spacing: Record<string, string>;
      borders: Record<string, string>;
      shadows: Record<string, string>;
    };
    dark: {
      colors: Record<string, string>;
      fonts: Record<string, string>;
      spacing: Record<string, string>;
      borders: Record<string, string>;
      shadows: Record<string, string>;
    };
  };
  customProperties: Record<string, string>;
  breakpoints: Record<string, string>;
  animations: Record<string, string>;
}

/**
 * Main Application Configuration
 */
export interface AppConfig {
  environment: EnvironmentConfig;
  api: APIConfig;
  database?: DatabaseConfig;
  storage: StorageConfig;
  email: EmailConfig;
  analytics: AnalyticsConfig;
  seo: SEOConfig;
  security: SecurityConfig;
  featureFlags: FeatureFlagsConfig;
  performance: PerformanceConfig;
  logging: LoggingConfig;
  notifications: NotificationConfig;
  i18n: I18nConfig;
  theme: ThemeConfig;
}

/**
 * Configuration Provider Types
 */
export interface ConfigProvider {
  get<T>(key: string): T;
  set<T>(key: string, value: T): void;
  has(key: string): boolean;
  remove(key: string): void;
  getAll(): Record<string, any>;
  validate(): boolean;
}

/**
 * Configuration Validation Types
 */
export interface ConfigValidation {
  schema: Record<string, any>;
  required: string[];
  validate: (config: any) => {
    isValid: boolean;
    errors: string[];
  };
}