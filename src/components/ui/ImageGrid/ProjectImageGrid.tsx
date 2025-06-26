"use client";
import React, { useState, useEffect } from "react";
import { ImageGrid } from "./ImageGrid";
import { getStrapiMedia } from "@/lib/strapi";
import type { ImageGridCard, PhotoItem, BulkPhotoUpload } from "@/types";

interface ProjectImageGridProps {
  photos?: PhotoItem[];
  bulkPhotoUploads?: BulkPhotoUpload[];
  projectName: string;
}

// Component to create content for each image card
const ImageContent = ({
  caption,
  isMain,
  category,
  projectName,
  index,
}: {
  caption?: string;
  isMain?: boolean;
  category?: string;
  projectName: string;
  index: number;
}) => {
  return (
    <div>
      <p className="font-bold md:text-2xl text-lg text-white">
        {caption ||
          `${projectName} ${category ? category.replace("_", " ") : "Photo"}`}
      </p>
      {isMain && (
        <p className="font-normal text-sm text-blue-200 mb-2">Featured Image</p>
      )}
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {caption
          ? `Explore the details of ${projectName} in this beautifully captured image.`
          : `Photo ${
              index + 1
            } from ${projectName} showcasing the quality and attention to detail in this development.`}
      </p>
    </div>
  );
};

export function ProjectImageGrid({
  photos = [],
  bulkPhotoUploads = [],
  projectName,
}: ProjectImageGridProps) {
  const [processedCards, setProcessedCards] = useState<ImageGridCard[]>([]);
  const cards: ImageGridCard[] = [];
  let cardId = 1;

  // Helper to detect image orientation
  const getImageOrientation = (url: string): Promise<'landscape' | 'portrait' | 'square'> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        if (aspectRatio > 1.3) {
          resolve('landscape');
        } else if (aspectRatio < 0.8) {
          resolve('portrait');
        } else {
          resolve('square');
        }
      };
      img.onerror = () => resolve('square');
      img.src = url;
    });
  };

  // Process regular photos
  useEffect(() => {
    const processImages = async () => {
      const processedCards: ImageGridCard[] = [];
      let cardId = 1;

      // Process regular photos
      for (const [index, photoItem] of photos.entries()) {
        const photoUrl = getStrapiMedia(photoItem.photo);
        if (photoUrl) {
          const orientation = await getImageOrientation(photoUrl);
          
          let columnSpan = "col-span-1"; // Default for portrait/square
          
          if (photoItem.isMain) {
            columnSpan = "col-span-1 sm:col-span-2 lg:col-span-2"; // Main images are always wide
          } else if (orientation === 'landscape') {
            columnSpan = "col-span-1 sm:col-span-2"; // Landscape images take 2 spaces
          }

          processedCards.push({
            id: cardId++,
            content: (
              <ImageContent
                caption={photoItem.caption}
                isMain={photoItem.isMain}
                projectName={projectName}
                index={index}
              />
            ),
            className: columnSpan,
            thumbnail: photoUrl,
            caption: photoItem.caption,
            isMain: photoItem.isMain,
            orientation,
          });
        }
      }

      // Process bulk photo uploads
      for (const bulkUpload of bulkPhotoUploads) {
        if (bulkUpload.photos && bulkUpload.photos.length > 0) {
          for (const [index, photo] of bulkUpload.photos.entries()) {
            const photoUrl = getStrapiMedia(photo);
            if (photoUrl) {
              const orientation = await getImageOrientation(photoUrl);
              
              let columnSpan = "col-span-1"; // Default for portrait/square
              
              if (index === 0 && bulkUpload.category === "exterior") {
                columnSpan = "col-span-1 sm:col-span-2 lg:col-span-2"; // First exterior is always wide
              } else if (orientation === 'landscape') {
                columnSpan = "col-span-1 sm:col-span-2"; // Landscape images take 2 spaces
              }

              processedCards.push({
                id: cardId++,
                content: (
                  <ImageContent
                    category={bulkUpload.category}
                    projectName={projectName}
                    index={index}
                  />
                ),
                className: columnSpan,
                thumbnail: photoUrl,
                caption: bulkUpload.category
                  ? bulkUpload.category
                      .replace("_", " ")
                      .replace(/\b\w/g, (l: string) => l.toUpperCase())
                  : undefined,
                orientation,
              });
            }
          }
        }
      }

      setProcessedCards(processedCards);
    };

    if (photos.length > 0 || bulkPhotoUploads.length > 0) {
      processImages();
    }
  }, [photos, bulkPhotoUploads, projectName]);

  // If no images, return null
  if (processedCards.length === 0) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[3600px]">
      <ImageGrid cards={processedCards} />
    </div>
  );
}
