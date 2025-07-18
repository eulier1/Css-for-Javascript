"use client";

import { CldImage } from "next-cloudinary";
import { cn } from "@/lib/utils";

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function CloudinaryImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
}: CloudinaryImageProps) {
  return (
    <CldImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("object-cover", className)}
      sizes={sizes}
      priority={priority}
      format="auto"
      quality="auto"
    />
  );
}