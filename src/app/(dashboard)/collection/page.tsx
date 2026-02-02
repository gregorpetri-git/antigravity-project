'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import CarCard from '@/components/CarCard';
import AddVehicleModal from '@/components/AddVehicleModal';
import { Car, CarFormData } from '@/types';
import { generateCarImageUrl } from '@/lib/imageGenerator';

// Sample data for demonstration - now with generated images
const createSampleCars = (): Car[] => [
  {
    id: '1',
    userId: '1',
    make: 'Volvo',
    model: 'XC90',
    type: 'SUV',
    color: 'Saville Grey',
    yearBuilt: 2021,
    yearBought: 2025,
    yearSold: null,
    description: 'My personal favorite',
    anecdote: 'Power and Safety',
    imageUrl: generateCarImageUrl('Volvo', 'XC90', 2021, 'Saville Grey', 'showroom'),
    imageStyle: 'showroom',
    privacy: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    userId: '1',
    make: 'Peugeot',
    model: '207CC',
    type: 'Convertible',
    color: 'Dark Grey',
    yearBuilt: 2004,
    yearBought: 2023,
    yearSold: null,
    description: 'Sunny side up car',
    anecdote: 'Summer road trip favorite',
    imageUrl: generateCarImageUrl('Peugeot', '207CC', 2004, 'Dark Grey', 'showroom'),
    imageStyle: 'showroom',
    privacy: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    userId: '1',
    make: 'Renault',
    model: 'Grand Scenic',
    type: 'Wagon',
    color: 'Beach Sand',
    yearBuilt: 2006,
    yearBought: 2020,
    yearSold: null,
    description: 'Family Mover',
    anecdote: 'Great vacation Vehicle',
    imageUrl: generateCarImageUrl('Renault', 'Grand Scenic', 2006, 'Beach Sand', 'museum'),
    imageStyle: 'museum',
    privacy: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    userId: '1',
    make: 'Fiat',
    model: 'X1/9',
    type: 'Convertible',
    color: 'Ferrari Red',
    yearBuilt: 1986,
    yearBought: 1990,
    yearSold: 1995,
    description: 'Mini ferrari',
    anecdote: 'By Bertone (special gift)',
    imageUrl: generateCarImageUrl('Fiat', 'X1/9', 1986, 'Ferrari Red', 'museum'),
    imageStyle: 'museum',
    privacy: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function CollectionPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ displayName: string; email: string } | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/login');
      return;
    }

    // Load cars from localStorage if available, otherwise use sample data
    const storedCars = localStorage.getItem('cars');
    if (storedCars) {
      const parsedCars = JSON.parse(storedCars);
      // Regenerate image URLs for any cars that don't have them
      const carsWithImages = parsedCars.map((car: Car) => ({
        ...car,
        imageUrl: car.imageUrl || generateCarImageUrl(car.make, car.model, car.yearBuilt, car.color, car.imageStyle),
      }));
      setCars(carsWithImages);
    } else {
      // Use sample cars with generated images
      const sampleCars = createSampleCars();
      setCars(sampleCars);
      localStorage.setItem('cars', JSON.stringify(sampleCars));
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleAddVehicle = (formData: CarFormData) => {
    // Generate image URL based on car details and selected style
    const imageUrl = generateCarImageUrl(
      formData.make,
      formData.model,
      formData.yearBuilt as number,
      formData.color,
      formData.imageStyle
    );

    const newCar: Car = {
      id: Date.now().toString(),
      userId: '1',
      make: formData.make,
      model: formData.model,
      type: formData.type,
      color: formData.color,
      yearBuilt: formData.yearBuilt as number,
      yearBought: formData.yearBought as number,
      yearSold: formData.yearSold as number | null,
      description: formData.description,
      anecdote: formData.anecdote,
      imageUrl: imageUrl,
      imageStyle: formData.imageStyle,
      privacy: formData.privacy,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let updatedCars: Car[];
    if (editingCar) {
      // When editing, regenerate image if relevant details changed
      const needsNewImage =
        editingCar.make !== formData.make ||
        editingCar.model !== formData.model ||
        editingCar.yearBuilt !== formData.yearBuilt ||
        editingCar.color !== formData.color ||
        editingCar.imageStyle !== formData.imageStyle;

      updatedCars = cars.map((car) =>
        car.id === editingCar.id
          ? {
              ...newCar,
              id: car.id,
              createdAt: car.createdAt,
              imageUrl: needsNewImage ? imageUrl : car.imageUrl,
            }
          : car
      );
    } else {
      updatedCars = [...cars, newCar];
    }

    setCars(updatedCars);
    localStorage.setItem('cars', JSON.stringify(updatedCars));
    setEditingCar(null);
  };

  const handleEditCar = (car: Car) => {
    setEditingCar(car);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCar(null);
  };

  if (!user || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading your garage...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header userName={user.displayName} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Collection</h1>
              <p className="text-sm text-gray-500 uppercase tracking-wide mt-1">
                A timeline of automotive excellence.
              </p>
            </div>

            <div className="flex gap-3 mt-4 sm:mt-0">
              <Link
                href="/showroom"
                className="btn-secondary px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                VIEW SHOWROOM
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                ADD VEHICLE
              </button>
            </div>
          </div>

          {/* Car Grid */}
          {cars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} onEdit={handleEditCar} />
              ))}
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles yet</h3>
              <p className="text-gray-500 mb-4">Start building your automotive timeline</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary px-6 py-2 rounded-md text-sm font-medium"
              >
                Add Your First Vehicle
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Vehicle Modal */}
      <AddVehicleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddVehicle}
        editingCar={editingCar}
      />
    </div>
  );
}
