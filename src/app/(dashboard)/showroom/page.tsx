'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { Car } from '@/types';
import { generateCarImageUrl } from '@/lib/imageGenerator';

// Simple car image component - always generates fresh SVG data URIs
function CarImage({ car, className = '' }: { car: Car; className?: string }) {
  // Always generate fresh SVG - ignore any stored URLs that might be broken
  const imageUrl = generateCarImageUrl(car.make, car.model, car.yearBuilt, car.color, car.imageStyle);

  return (
    <div className={`${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={`${car.yearBuilt} ${car.make} ${car.model}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default function ShowroomPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ displayName: string; email: string } | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/login');
      return;
    }

    // Load cars from localStorage
    const storedCars = localStorage.getItem('cars');
    if (storedCars) {
      const parsedCars = JSON.parse(storedCars) as Car[];
      // Sort by yearBought for timeline
      parsedCars.sort((a, b) => a.yearBought - b.yearBought);
      setCars(parsedCars);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header userName={user.displayName} onLogout={handleLogout} />

      {/* Main Content with Museum Background */}
      <main
        className="flex-1 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.6)), url('/museum-bg.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Virtual Showroom</h1>
              <p className="text-sm text-gray-500 uppercase tracking-wide mt-1">
                Your automotive timeline
              </p>
            </div>

            <Link
              href="/collection"
              className="btn-secondary px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 mt-4 sm:mt-0 w-fit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              BACK TO COLLECTION
            </Link>
          </div>

          {/* Timeline */}
          {cars.length > 0 ? (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 hidden lg:block" />

              {/* Timeline Cards */}
              <div className="space-y-8 lg:space-y-0">
                {cars.map((car, index) => (
                  <div
                    key={car.id}
                    className={`relative lg:flex lg:items-center ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline Card */}
                    <div
                      className={`lg:w-5/12 ${
                        index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8'
                      }`}
                    >
                      <div
                        className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                        onClick={() => setSelectedCar(car)}
                      >
                        {/* Car Image */}
                        <CarImage car={car} className="h-48" />

                        {/* Car Info */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-900">
                              {car.make} {car.model}
                            </h3>
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded uppercase">
                              {car.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            {car.yearBuilt} &bull; {car.color}
                          </p>
                          {car.description && (
                            <p className="text-sm text-gray-600 mt-2 italic">{car.description}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Timeline Point */}
                    <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                      <div className="w-4 h-4 bg-gray-900 rounded-full border-4 border-white shadow" />
                    </div>

                    {/* Year Label */}
                    <div
                      className={`lg:w-5/12 ${
                        index % 2 === 0 ? 'lg:pl-8' : 'lg:pr-8 lg:text-right'
                      }`}
                    >
                      <div className="hidden lg:block">
                        <span className="text-2xl font-bold text-gray-900">{car.yearBought}</span>
                        <p className="text-sm text-gray-500">
                          {car.yearSold ? `Sold ${car.yearSold}` : 'Current'}
                        </p>
                      </div>
                    </div>

                    {/* Mobile Year Label */}
                    <div className="lg:hidden text-center mt-4">
                      <span className="text-xl font-bold text-gray-900">{car.yearBought}</span>
                      <span className="text-gray-400 mx-2">&bull;</span>
                      <span className="text-sm text-gray-500">
                        {car.yearSold ? `Sold ${car.yearSold}` : 'Current'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 mx-auto text-gray-300 mb-4"
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles in your showroom</h3>
              <p className="text-gray-500 mb-4">Add some vehicles to see your timeline</p>
              <Link
                href="/collection"
                className="btn-primary px-6 py-2 rounded-md text-sm font-medium inline-block"
              >
                Go to Collection
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Car Detail Modal */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedCar(null)}
          />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Car Image */}
            <CarImage car={selectedCar} className="h-64" />

            {/* Car Details */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCar.make} {selectedCar.model}
                  </h2>
                  <p className="text-gray-500">
                    {selectedCar.yearBuilt} &bull; {selectedCar.color}
                  </p>
                </div>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded uppercase">
                  {selectedCar.type}
                </span>
              </div>

              {/* Ownership */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <span className="text-xs text-gray-400 block">BOUGHT</span>
                  <span className="text-lg font-semibold text-gray-900">{selectedCar.yearBought}</span>
                </div>
                <div className="text-center border-x border-gray-200">
                  <span className="text-xs text-gray-400 block">SOLD</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {selectedCar.yearSold || 'Present'}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-xs text-gray-400 block">OWNERSHIP</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {selectedCar.yearSold
                      ? `${selectedCar.yearSold - selectedCar.yearBought} Years`
                      : 'Current'}
                  </span>
                </div>
              </div>

              {/* Description & Anecdote */}
              {selectedCar.description && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">DESCRIPTION</h3>
                  <p className="text-gray-700">{selectedCar.description}</p>
                </div>
              )}

              {selectedCar.anecdote && (
                <div className="anecdote-box p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">STORY</h3>
                  <p className="text-gray-700 italic">{selectedCar.anecdote}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
