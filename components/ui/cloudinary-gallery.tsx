"use client";

import { OptimizedCloudinaryImage } from "./optimized-cloudinary-image";
import { cn } from "@/lib/utils";

interface CloudinaryGalleryProps {
  images: Array<{ url: string; alt: string; }>;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  aspectRatio?: "square" | "video" | "portrait" | "landscape";
  showCounter?: boolean;
}

export function CloudinaryGallery({
  images,
  className = "",
  columns = 3,
  aspectRatio = "landscape",
  showCounter = false,
}: CloudinaryGalleryProps) {
  if (!images || images.length === 0) {
    return null;
  }

  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("space-y-4", className)}>
      {showCounter && (
        <p className="text-sm text-muted-foreground">
          {images.length} {images.length === 1 ? "image" : "images"}
        </p>
      )}
      <div className={cn("grid gap-4", gridClasses[columns])}>
        {images.map((image, index) => (
          <OptimizedCloudinaryImage
            key={image.url || index}
            src={image.url}
            alt={image.alt}
            aspectRatio={aspectRatio}
            className="transition-transform duration-200 hover:scale-[1.02]"
          />
        ))}
      </div>
    </div>
  );
}