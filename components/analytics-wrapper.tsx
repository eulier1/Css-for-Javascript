'use client';

import { usePageAnalytics } from '@/hooks/use-page-analytics';
import { useLocaleAnalytics } from '@/hooks/use-locale-analytics';

interface AnalyticsWrapperProps {
  children: React.ReactNode;
}

export const AnalyticsWrapper: React.FC<AnalyticsWrapperProps> = ({ children }) => {
  // Initialize page time tracking
  usePageAnalytics();
  
  // Initialize locale change tracking
  useLocaleAnalytics();
  
  // This wrapper just handles analytics, renders children as-is
  return <>{children}</>;
};