"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ImageGridCard, LayoutGridProps } from "@/types";

export const ImageGrid = ({ cards }: LayoutGridProps) => {
  const [selected, setSelected] = useState<ImageGridCard | null>(null);
  const [lastSelected, setLastSelected] = useState<ImageGridCard | null>(null);

  const handleClick = (card: ImageGridCard) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selected) {
        handleOutsideClick();
      }
    };

    if (selected) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selected]);

  return (
    <div className="w-full min-h-[3600px] p-6 sm:p-12 lg:p-20 max-w-full mx-auto relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 xl:gap-16">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            onClick={() => handleClick(card)}
            className={cn(
              "relative overflow-hidden cursor-pointer group",
              card.className, // Apply the dynamic column span
              selected?.id === card.id
                ? "fixed inset-0 z-50 flex justify-center items-center p-4 sm:p-8"
                : "bg-white rounded-xl shadow-lg w-full h-auto"
            )}
            layoutId={`card-${card.id}`}
            whileHover={selected?.id === card.id ? {} : { scale: 1.02 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.32, 0.72, 0, 1],
              layout: { duration: 0.6, ease: [0.32, 0.72, 0, 1] }
            }}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} onClose={handleOutsideClick} />}
            <ImageComponent card={card} selected={selected?.id === card.id} />
          </motion.div>
        ))}
      </div>
      {selected && (
        <motion.div
          onClick={handleOutsideClick}
          className="fixed inset-0 h-full w-full left-0 top-0 bg-black z-10 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        />
      )}
    </div>
  );
};

const ImageComponent = ({ card, selected }: { card: ImageGridCard; selected?: boolean }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    setImageLoaded(true);
  };

  const isLandscape = imageDimensions.width > imageDimensions.height;
  const aspectRatio = imageDimensions.width / imageDimensions.height;

  return (
    <div className={cn(
      "relative w-full",
      selected ? "rounded-lg overflow-hidden shadow-2xl" : "overflow-hidden"
    )}>
      <motion.img
        layoutId={`image-${card.id}-image`}
        src={card.thumbnail}
        className={cn(
          "w-full",
          selected 
            ? "block object-contain" 
            : "object-cover"
        )}
        style={{
          aspectRatio: imageLoaded ? `${imageDimensions.width} / ${imageDimensions.height}` : undefined,
          ...(selected && imageLoaded ? {
            // 30% smaller than before: was 90vw/90vh, now 63vw/63vh
            maxWidth: isLandscape ? '63vw' : '45vw',
            maxHeight: isLandscape ? '45vh' : '63vh',
            width: 'auto',
            height: 'auto'
          } : {
            // In grid mode, let the aspect ratio determine height naturally
            height: 'auto'
          })
        }}
        alt="thumbnail"
        onLoad={handleImageLoad}
        initial={{ scale: 1 }}
        whileHover={selected ? {} : { scale: 1.15 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "tween"
        }}
      />
      {/* Hover overlay */}
      {!selected && (
        <motion.div 
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.2 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}
    </div>
  );
};

const SelectedCard = ({ selected, onClose }: { selected: ImageGridCard | null; onClose: () => void }) => {
  return (
    <>
      {/* Close button */}
      <motion.button
        onClick={onClose}
        className="absolute top-4 right-4 z-[80] bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 transition-all duration-200"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </motion.button>
      
      {/* Content overlay at bottom */}
      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 50,
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
          delay: 0.2
        }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent px-6 py-6 z-[70]"
      >
        <div className="text-white">
          {selected?.content}
        </div>
      </motion.div>
    </>
  );
};
