/**
 * Form Type Definitions
 * 
 * These types define all form-related interfaces for type-safe form handling.
 * 
 * @fileoverview Form type definitions
 */

import { Project, Job } from './content';

/**
 * Contact Form Types
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  source?: 'website' | 'phone' | 'email' | 'walk_in' | 'referral';
  projectId?: number;
  inquiry?: 'general' | 'pricing' | 'viewing' | 'photos' | 'documents';
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  general?: string;
}

/**
 * Job Application Form Types
 */
export interface JobApplicationFormData {
  name: string;
  email: string;
  phone?: string;
  resume: File | null;
  coverLetter?: string;
  experience?: string;
  jobId: number;
  portfolioUrl?: string;
  linkedinUrl?: string;
  expectedSalary?: string;
  availabilityDate?: string;
  workAuthorization?: boolean;
  willingToRelocate?: boolean;
}

export interface JobApplicationFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  resume?: string;
  coverLetter?: string;
  experience?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  expectedSalary?: string;
  availabilityDate?: string;
  general?: string;
}

/**
 * Newsletter Subscription Form Types
 */
export interface NewsletterFormData {
  email: string;
  name?: string;
  interests?: string[];
  frequency?: 'weekly' | 'monthly' | 'quarterly';
}

export interface NewsletterFormErrors {
  email?: string;
  name?: string;
  interests?: string;
  general?: string;
}

/**
 * Search Form Types
 */
export interface SearchFormData {
  query: string;
  contentTypes?: string[];
  location?: string;
  priceRange?: {
    min?: number;
    max?: number;
  };
  projectType?: string;
  projectStatus?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Filter Form Types
 */
export interface ProjectFilterFormData {
  status?: string;
  type?: string;
  location?: string;
  city?: string;
  priceMin?: number;
  priceMax?: number;
  features?: string[];
  amenities?: string[];
  constructionYear?: {
    min?: number;
    max?: number;
  };
  isFeatured?: boolean;
}

/**
 * Booking/Viewing Form Types
 */
export interface ViewingBookingFormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  projectId: number;
  numberOfVisitors?: number;
  specialRequests?: string;
  contactPreference?: 'email' | 'phone' | 'sms';
}

export interface ViewingBookingFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  preferredDate?: string;
  preferredTime?: string;
  numberOfVisitors?: string;
  general?: string;
}

/**
 * Inquiry Form Types
 */
export interface ProjectInquiryFormData {
  name: string;
  email: string;
  phone?: string;
  projectId: number;
  inquiryType: 'pricing' | 'availability' | 'floor_plan' | 'payment_plan' | 'site_visit' | 'general';
  unitType?: string;
  budget?: string;
  timeframe?: 'immediate' | 'within_3_months' | 'within_6_months' | 'within_1_year' | 'exploring';
  financingNeeded?: boolean;
  message?: string;
  marketingOptIn?: boolean;
}

export interface ProjectInquiryFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  inquiryType?: string;
  unitType?: string;
  budget?: string;
  timeframe?: string;
  message?: string;
  general?: string;
}

/**
 * Callback Request Form Types
 */
export interface CallbackRequestFormData {
  name: string;
  phone: string;
  email?: string;
  preferredTime?: 'morning' | 'afternoon' | 'evening';
  urgency?: 'low' | 'medium' | 'high';
  topic?: string;
  projectId?: number;
}

export interface CallbackRequestFormErrors {
  name?: string;
  phone?: string;
  email?: string;
  topic?: string;
  general?: string;
}

/**
 * Property Valuation Form Types
 */
export interface PropertyValuationFormData {
  propertyType: 'apartment' | 'house' | 'land' | 'commercial';
  location: string;
  area: number;
  areaUnit: 'sqft' | 'sqm' | 'katha' | 'bigha';
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  age?: number;
  condition?: 'excellent' | 'good' | 'fair' | 'poor';
  amenities?: string[];
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  urgency?: 'immediate' | 'within_week' | 'within_month' | 'no_rush';
  purpose?: 'sale' | 'purchase' | 'insurance' | 'loan' | 'tax' | 'other';
  additionalInfo?: string;
}

/**
 * Investment Calculator Form Types
 */
export interface InvestmentCalculatorFormData {
  propertyPrice: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyRent?: number;
  maintenanceCost?: number;
  propertyTax?: number;
  insurance?: number;
  appreciationRate?: number;
  calculationType: 'loan' | 'investment' | 'rental_yield';
}

/**
 * Feedback Form Types
 */
export interface FeedbackFormData {
  name?: string;
  email?: string;
  category: 'website' | 'service' | 'project' | 'staff' | 'suggestion' | 'complaint';
  rating?: number;
  feedback: string;
  projectId?: number;
  wouldRecommend?: boolean;
  contactBack?: boolean;
}

export interface FeedbackFormErrors {
  name?: string;
  email?: string;
  category?: string;
  rating?: string;
  feedback?: string;
  general?: string;
}

/**
 * Form Validation Rules
 */
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  email?: boolean;
  phone?: boolean;
  url?: boolean;
  custom?: (value: any) => string | null;
  message?: string;
}

export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule;
};

/**
 * Form Field Types
 */
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'date' | 'number';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Array<{ value: string; label: string }>;
  validation?: ValidationRule;
  helpText?: string;
  defaultValue?: any;
}

/**
 * Form State Types
 */
export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
  submitCount: number;
}

/**
 * Form Configuration Types
 */
export interface FormConfig<T> {
  initialValues: T;
  validationRules?: ValidationRules<T>;
  onSubmit: (values: T) => Promise<void> | void;
  onSuccess?: (values: T) => void;
  onError?: (error: string) => void;
  resetOnSuccess?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

/**
 * Multi-step Form Types
 */
export interface MultiStepFormData {
  currentStep: number;
  totalSteps: number;
  stepData: Record<string, any>;
  isStepValid: (step: number) => boolean;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  validation?: ValidationRules<any>;
  isOptional?: boolean;
}

/**
 * Form Wizard Types
 */
export interface FormWizardConfig {
  steps: FormStep[];
  onStepChange?: (step: number) => void;
  onComplete: (data: Record<string, any>) => Promise<void> | void;
  allowStepSkipping?: boolean;
  showProgress?: boolean;
  persistData?: boolean;
}

/**
 * File Upload Form Types
 */
export interface FileUploadFormData {
  files: FileList | File[];
  category?: string;
  description?: string;
  tags?: string[];
  isPublic?: boolean;
}

export interface FileUploadProgress {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  url?: string;
}