// Type declarations for Next.js App Router
import 'next';

declare module 'next' {
  export interface PageProps {
    params?: any;
    searchParams?: any;
  }
}