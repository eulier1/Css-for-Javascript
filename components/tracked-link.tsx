'use client';

import React from 'react';
import { usePathname, useParams } from 'next/navigation';
import { trackResourceClick, getSectionName, getResourceType } from '@/lib/analytics';

interface TrackedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  resourceName?: string; // Optional custom resource name
}

export const TrackedLink: React.FC<TrackedLinkProps> = ({ 
  href, 
  children, 
  className,
  target,
  rel,
  resourceName 
}) => {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only track external links
    const isExternal = href.startsWith('http://') || href.startsWith('https://');
    
    if (isExternal) {
      const sourceSection = getSectionName(pathname);
      const autoResourceName = resourceName || getResourceType(href);
      
      // Track the click
      trackResourceClick({
        resourceUrl: href,
        resourceName: autoResourceName,
        sourceSection,
        locale,
      });
      
      // Small delay to ensure analytics is sent before navigation
      // Only if opening in same tab
      if (!target || target === '_self') {
        e.preventDefault();
        
        // Send event and then navigate after a brief delay
        setTimeout(() => {
          window.location.href = href;
        }, 100);
      }
      // If opening in new tab (_blank), let default behavior happen
    }
  };
  
  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

// Helper component for external links with default styling
export const ExternalLink: React.FC<TrackedLinkProps> = (props) => {
  return (
    <TrackedLink
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
};