'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useParams } from 'next/navigation';
import { trackCourseTime, getSectionName } from '@/lib/analytics';

export const usePageAnalytics = () => {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;
  
  // Track entry time
  const startTime = useRef<number | null>(null);
  const lastActiveTime = useRef<number>(Date.now());
  const accumulatedTime = useRef<number>(0);
  const isVisible = useRef<boolean>(true);
  
  useEffect(() => {
    // Initialize start time
    startTime.current = Date.now();
    accumulatedTime.current = 0;
    lastActiveTime.current = Date.now();
    isVisible.current = true;
    
    // Track page visibility changes (tab switches)
    const handleVisibilityChange = () => {
      const now = Date.now();
      
      if (document.hidden) {
        // Tab became hidden - pause timer
        if (isVisible.current && lastActiveTime.current) {
          accumulatedTime.current += now - lastActiveTime.current;
        }
        isVisible.current = false;
      } else {
        // Tab became visible - resume timer
        lastActiveTime.current = now;
        isVisible.current = true;
      }
    };
    
    // Track mouse movement and keyboard activity (user engagement)
    let activityTimeout: NodeJS.Timeout;
    const resetActivityTimer = () => {
      if (isVisible.current) {
        lastActiveTime.current = Date.now();
      }
      
      clearTimeout(activityTimeout);
      activityTimeout = setTimeout(() => {
        // User inactive for 30 seconds - pause accumulation
        if (isVisible.current && lastActiveTime.current) {
          accumulatedTime.current += Date.now() - lastActiveTime.current;
          lastActiveTime.current = Date.now(); // Reset for next activity
        }
      }, 30000); // 30 seconds of inactivity
    };
    
    // Send analytics data
    const sendAnalytics = () => {
      if (!startTime.current) return;
      
      const now = Date.now();
      let totalTime = accumulatedTime.current;
      
      // Add current session time if user is active
      if (isVisible.current && lastActiveTime.current) {
        totalTime += now - lastActiveTime.current;
      }
      
      const timeSpentSeconds = Math.round(totalTime / 1000);
      
      // Only send if user spent at least 5 seconds on the page
      if (timeSpentSeconds >= 5) {
        const sectionName = getSectionName(pathname);
        
        trackCourseTime({
          sectionName,
          timeSpentSeconds,
          locale,
          pagePath: pathname,
        });
      }
    };
    
    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('mousemove', resetActivityTimer);
    document.addEventListener('keypress', resetActivityTimer);
    document.addEventListener('scroll', resetActivityTimer);
    document.addEventListener('click', resetActivityTimer);
    
    // Initialize activity timer
    resetActivityTimer();
    
    // Cleanup function (runs on page unload or component unmount)
    const cleanup = () => {
      // Final analytics send
      sendAnalytics();
      
      // Clear timers and listeners
      clearTimeout(activityTimeout);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('mousemove', resetActivityTimer);
      document.removeEventListener('keypress', resetActivityTimer);
      document.removeEventListener('scroll', resetActivityTimer);
      document.removeEventListener('click', resetActivityTimer);
    };
    
    // Handle page unload
    const handleBeforeUnload = () => {
      sendAnalytics();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      cleanup();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname, locale]); // Re-run when page or locale changes
};