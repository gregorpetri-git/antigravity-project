'use client';

import Image from 'next/image';
import { Car, calculateOwnership } from '@/types';

interface CarCardProps {
  car: Car;
  onEdit?: (car: Car) => void;
}

export default function CarCard({ car, onEdit }: CarCardProps) {
  const ownership = calculateOwnership(car.yearBought, car.yearSold);
  const soldDisplay = car.yearSold ? car.yearSold.toString() : 'Present';

  return (
    <div className="car-card bg-white rounded-lg shadow-md overflow-hidden">
      {/* Car Image */}
      <div className="relative h-48 bg-gray-100">
        {car.imageUrl ? (
          <Image
            src={car.imageUrl}
            alt={`${car.yearBuilt} ${car.make} ${car.model}`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center text-gray-400">
              <svg
                className="w-16 h-16 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
              <span className="text-sm">No image</span>
            </div>
          </div>
        )}

        {/* Edit button */}
        {onEdit && (
          <button
            onClick={() => onEdit(car)}
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
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
