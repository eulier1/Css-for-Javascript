"use client";

import { CldImage } from "next-cloudinary";
import { cn } from "@/lib/utils";

interface OptimizedCloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  aspectRatio?: "square" | "video" | "portrait" | "landscape";
  priority?: boolean;
  placeholder?: "blur" | "empty";
}

export function OptimizedCloudinaryImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = "",
  aspectRatio = "landscape",
  priority = false,
  placeholder = "blur",
}: OptimizedCloudinaryImageProps) {
  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  const responsiveSizes = {
    square: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px",
    video: "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px",
    portrait: "(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 300px",
    landscape: "(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 600px",
  };

  return (
    <div className={cn(aspectRatioClasses[aspectRatio], "overflow-hidden rounded-lg", className)}>
      <CldImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        sizes={responsiveSizes[aspectRatio]}
        priority={priority}
        format="auto"
        quality="auto"
        placeholder={placeholder}
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
    </div>
  );
}