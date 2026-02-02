'use client';

import { Car, calculateOwnership } from '@/types';
import { generateCarImageUrl } from '@/lib/imageGenerator';

interface CarCardProps {
  car: Car;
  onEdit?: (car: Car) => void;
}

export default function CarCard({ car, onEdit }: CarCardProps) {
  const ownership = calculateOwnership(car.yearBought, car.yearSold);
  const soldDisplay = car.yearSold ? car.yearSold.toString() : 'Present';

  // Always generate fresh SVG image - ignore any stored URLs that might be broken
  const imageUrl = generateCarImageUrl(car.make, car.model, car.yearBuilt, car.color, car.imageStyle);

  return (
    <div className="car-card bg-white rounded-lg shadow-md overflow-hidden">
      {/* Car Image */}
      <div className="relative h-48">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={`${car.yearBuilt} ${car.make} ${car.model}`}
          className="w-full h-full object-cover"
        />

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
          {car.yearBuilt} · {car.color.toUpperCase()}
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
