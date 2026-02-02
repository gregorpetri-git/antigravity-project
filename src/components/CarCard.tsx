'use client';

import { useState, useMemo } from 'react';
import { Car, calculateOwnership } from '@/types';
import { generatePlaceholderImage } from '@/lib/imageGenerator';

interface CarCardProps {
  car: Car;
  onEdit?: (car: Car) => void;
}

export default function CarCard({ car, onEdit }: CarCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const ownership = calculateOwnership(car.yearBought, car.yearSold);
  const soldDisplay = car.yearSold ? car.yearSold.toString() : 'Present';

  // Generate placeholder image for fallback
  const placeholderUrl = useMemo(
    () => generatePlaceholderImage(car.make, car.model, car.yearBuilt, car.color, car.imageStyle),
    [car.make, car.model, car.yearBuilt, car.color, car.imageStyle]
  );

  // Use AI image URL or fallback to placeholder
  const displayImageUrl = imageError || !car.imageUrl ? placeholderUrl : car.imageUrl;

  return (
    <div className="car-card bg-white rounded-lg shadow-md overflow-hidden">
      {/* Car Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
        {/* Show placeholder while AI image is loading */}
        {!imageLoaded && !imageError && car.imageUrl && (
          <img
            src={placeholderUrl}
            alt={`${car.yearBuilt} ${car.make} ${car.model} placeholder`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Main image (AI-generated or placeholder on error) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={displayImageUrl}
          alt={`${car.yearBuilt} ${car.make} ${car.model}`}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded || imageError || !car.imageUrl ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />

        {/* Loading indicator */}
        {!imageLoaded && !imageError && car.imageUrl && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
            <span>AI generating...</span>
          </div>
        )}

        {/* Edit button */}
        {onEdit && (
          <button
            onClick={() => onEdit(car)}
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        )}

        {/* Image style badge */}
        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded capitalize">
          {car.imageStyle}
        </div>
      </div>

      {/* Car Details */}
      <div className="p-4">
        {/* Name and Type */}
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-semibold text-gray-900">
            {car.make} {car.model}
          </h3>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded uppercase">
            {car.type}
          </span>
        </div>

        {/* Year and Color */}
        <p className="text-sm text-gray-500 mb-3">
          {car.yearBuilt} &bull; {car.color.toUpperCase()}
        </p>

        {/* Ownership Info */}
        <div className="grid grid-cols-3 gap-2 text-xs mb-3">
          <div>
            <span className="text-gray-400 block">BOUGHT</span>
            <span className="font-medium text-gray-700">{car.yearBought}</span>
          </div>
          <div>
            <span className="text-gray-400 block">SOLD</span>
            <span className="font-medium text-gray-700">{soldDisplay}</span>
          </div>
          <div>
            <span className="text-gray-400 block">OWNERSHIP</span>
            <span className="font-medium text-gray-700">{ownership}</span>
          </div>
        </div>

        {/* Description */}
        {car.description && (
          <p className="text-sm text-gray-600 mb-2 italic">{car.description}</p>
        )}

        {/* Anecdote */}
        {car.anecdote && (
          <div className="anecdote-box p-2 text-sm text-gray-600 italic">
            {car.anecdote}
          </div>
        )}
      </div>
    </div>
  );
}
