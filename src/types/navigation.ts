/**
 * Navigation Type Definitions
 * 
 * These types define navigation-related interfaces for routing and menus.
 * 
 * @fileoverview Navigation type definitions
 */

import { ReactNode } from 'react';

/**
 * Route Definition Types
 */
export interface Route {
  path: string;
  name: string;
  title?: string;
  description?: string;
  component?: React.ComponentType<any>;
  layout?: React.ComponentType<any>;
  exact?: boolean;
  protected?: boolean;
  roles?: string[];
  meta?: RouteMeta;
  children?: Route[];
}

export interface RouteMeta {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

/**
 * Menu Item Types
 */
export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  children?: MenuItem[];
  badge?: string | number;
  disabled?: boolean;
  external?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top';
  active?: boolean;
  permission?: string;
  order?: number;
}

/**
 * Navigation Group Types
 */
export interface NavigationGroup {
  id: string;
  title?: string;
  items: MenuItem[];
  collapsible?: boolean;
  collapsed?: boolean;
  order?: number;
}

/**
 * Main Navigation Types
 */
export interface MainNavigation {
  brand?: {
    name: string;
    logo?: string;
    href: string;
  };
  items: MenuItem[];
  actions?: MenuItem[];
}

/**
 * Sidebar Navigation Types
 */
export interface SidebarNavigation {
  groups: NavigationGroup[];
  collapsible?: boolean;
  width?: string;
  position?: 'left' | 'right';
}

/**
 * Footer Navigation Types
 */
export interface FooterNavigation {
  columns: Array<{
    title: string;
    items: MenuItem[];
  }>;
  social?: Array<{
    platform: string;
    url: string;
    icon: ReactNode;
  }>;
  legal?: MenuItem[];
}

/**
 * Breadcrumb Types
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
}

export interface Breadcrumb {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  maxItems?: number;
}

/**
 * Tab Navigation Types
 */
export interface TabItem {
  key: string;
  label: string;
  content?: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
  badge?: string | number;
  closable?: boolean;
}

export interface TabNavigation {
  items: TabItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  onTabClose?: (key: string) => void;
  variant?: 'line' | 'card' | 'button';
  size?: 'small' | 'medium' | 'large';
}

/**
 * Pagination Types
 */
export interface PaginationConfig {
  current: number;
  total: number;
  pageSize: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean;
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
}

/**
 * Router Types
 */
export interface RouterState {
  pathname: string;
  search: string;
  hash: string;
  params: Record<string, string>;
  query: Record<string, string | string[]>;
}

export interface NavigationOptions {
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
}

/**
 * Navigation Event Types
 */
export interface NavigationEvent {
  type: 'routeChangeStart' | 'routeChangeComplete' | 'routeChangeError';
  url: string;
  options?: NavigationOptions;
}

/**
 * Mobile Navigation Types
 */
export interface MobileNavigation {
  isOpen: boolean;
  onToggle: () => void;
  items: MenuItem[];
  variant?: 'drawer' | 'fullscreen' | 'dropdown';
  position?: 'left' | 'right' | 'top' | 'bottom';
}

/**
 * Context Menu Types
 */
export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  divider?: boolean;
  danger?: boolean;
  onClick?: () => void;
  children?: ContextMenuItem[];
}

export interface ContextMenu {
  items: ContextMenuItem[];
  position?: { x: number; y: number };
  visible?: boolean;
  onClose?: () => void;
}

/**
 * Navigation Analytics Types
 */
export interface NavigationAnalytics {
  trackPageView: (path: string, title?: string) => void;
  trackNavigation: (from: string, to: string) => void;
  trackMenuClick: (menuId: string, label: string) => void;
  trackSearchQuery: (query: string) => void;
}

/**
 * Search Navigation Types
 */
export interface SearchNavigation {
  query: string;
  suggestions: Array<{
    id: string;
    title: string;
    description?: string;
    url: string;
    type: 'page' | 'project' | 'article' | 'document';
    icon?: ReactNode;
  }>;
  onSearch: (query: string) => void;
  onSuggestionClick: (suggestion: any) => void;
  placeholder?: string;
  shortcut?: string;
}

/**
 * Navigation State Types
 */
export interface NavigationState {
  currentRoute: string;
  previousRoute?: string;
  isLoading: boolean;
  error?: string;
  history: string[];
}

/**
 * Navigation Guards Types
 */
export interface NavigationGuard {
  name: string;
  canActivate: (route: Route, state: RouterState) => boolean | Promise<boolean>;
  canDeactivate?: (route: Route, state: RouterState) => boolean | Promise<boolean>;
  redirectTo?: string | ((route: Route, state: RouterState) => string);
}

/**
 * Sitemap Types
 */
export interface SitemapItem {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: Array<{
    lang: string;
    url: string;
  }>;
}

export interface Sitemap {
  items: SitemapItem[];
  baseUrl: string;
  defaultChangeFrequency?: string;
  defaultPriority?: number;
}

/**
 * Navigation Configuration Types
 */
export interface NavigationConfig {
  main: MainNavigation;
  sidebar?: SidebarNavigation;
  footer: FooterNavigation;
  mobile: Omit<MobileNavigation, 'isOpen' | 'onToggle'>;
  breadcrumbs?: {
    enabled: boolean;
    separator?: ReactNode;
    maxItems?: number;
  };
  analytics?: NavigationAnalytics;
  guards?: NavigationGuard[];
}