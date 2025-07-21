// Google Analytics 4 utilities for custom event tracking

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

// Check if GA4 is available and enabled
export const isAnalyticsEnabled = (): boolean => {
  return typeof window !== 'undefined' && 
         typeof window.gtag === 'function' && 
         !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
};

// Base event tracking function
const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (!isAnalyticsEnabled()) {
    // Log to console in development for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('GA4 Event:', eventName, parameters);
    }
    return;
  }

  try {
    window.gtag('event', eventName, {
      // Add common parameters
      send_to: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      ...parameters,
    });
  } catch (error) {
    console.error('GA4 tracking error:', error);
  }
};

// Event 1: Course section time tracking
export const trackCourseTime = (params: {
  sectionName: string;
  timeSpentSeconds: number;
  locale: string;
  pagePath: string;
}) => {
  trackEvent('course_section_time', {
    section_name: params.sectionName,
    time_spent_seconds: params.timeSpentSeconds,
    locale: params.locale,
    page_path: params.pagePath,
    // Additional GA4 parameters
    engagement_time_msec: params.timeSpentSeconds * 1000,
    value: Math.round(params.timeSpentSeconds / 60), // value in minutes
  });
};

// Event 2: Learning resource clicks
export const trackResourceClick = (params: {
  resourceUrl: string;
  resourceName: string;
  sourceSection: string;
  locale: string;
}) => {
  trackEvent('learning_resource_click', {
    resource_url: params.resourceUrl,
    resource_name: params.resourceName,
    source_section: params.sourceSection,
    locale: params.locale,
    // Additional GA4 parameters
    link_domain: new URL(params.resourceUrl).hostname,
    outbound: true,
  });
};

// Event 3: Language switching
export const trackLanguageSwitch = (params: {
  fromLocale: string;
  toLocale: string;
  currentPage: string;
}) => {
  trackEvent('language_switch', {
    from_locale: params.fromLocale,
    to_locale: params.toLocale,
    current_page: params.currentPage,
    // Additional GA4 parameters
    method: 'language_selector',
  });
};

// Helper function to get current section name from pathname
export const getSectionName = (pathname: string): string => {
  // Remove locale prefix (e.g., /en/introduction -> /introduction)
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
  
  // Map paths to readable section names
  const sectionMap: Record<string, string> = {
    '/': 'home',
    '/introduction': 'introduction',
    // Add more sections as you create them
    // '/module-1': 'module_1',
    // '/module-2': 'module_2',
  };
  
  return sectionMap[pathWithoutLocale] || pathWithoutLocale.replace('/', '').replace('-', '_') || 'unknown';
};

// Helper function to identify resource type from URL
export const getResourceType = (url: string): string => {
  const hostname = new URL(url).hostname.toLowerCase();
  
  if (hostname.includes('hubermanlab.com')) return 'huberman_lab';
  if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) return 'youtube';
  if (hostname.includes('coursera.org')) return 'coursera';
  if (hostname.includes('the-joy-of-react') || hostname.includes('joyofreact')) return 'joy_of_react';
  if (hostname.includes('academicaffairs.arizona.edu')) return 'interleaving_study';
  
  return 'external';
};