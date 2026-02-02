'use client';

import { useState, useEffect } from 'react';
import { CarFormData, CAR_TYPES, Car } from '@/types';

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CarFormData) => void;
  editingCar?: Car | null;
}

const initialFormData: CarFormData = {
  make: '',
  model: '',
  type: 'Sedan',
  color: '',
  yearBuilt: '',
  yearBought: '',
  yearSold: null,
  description: '',
  anecdote: '',
  imageStyle: 'showroom',
  privacy: 'private',
};

export default function AddVehicleModal({
  isOpen,
  onClose,
  onSubmit,
  editingCar,
}: AddVehicleModalProps) {
  const [formData, setFormData] = useState<CarFormData>(initialFormData);

  useEffect(() => {
    if (editingCar) {
      setFormData({
        make: editingCar.make,
        model: editingCar.model,
        type: editingCar.type,
        color: editingCar.color,
        yearBuilt: editingCar.yearBuilt,
        yearBought: editingCar.yearBought,
        yearSold: editingCar.yearSold,
        description: editingCar.description,
        anecdote: editingCar.anecdote,
        imageStyle: editingCar.imageStyle,
        privacy: editingCar.privacy,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editingCar, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingCar ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Make & Model */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">MAKE</label>
              <input
                type="text"
                name="make"
                value={formData.make}
                onChange={handleChange}
                placeholder="e.g. Porsche"
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">MODEL</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g. 911 Carrera"
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Type & Color */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">TYPE</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {CAR_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">COLOR</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="e.g. Guards Red"
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Year Built & Year Bought */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">YEAR BUILT</label>
              <input
                type="number"
                name="yearBuilt"
                value={formData.yearBuilt}
                onChange={handleChange}
                placeholder="YYYY"
                min="1900"
                max={new Date().getFullYear() + 1}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">YEAR BOUGHT</label>
              <input
                type="number"
                name="yearBought"
                value={formData.yearBought}
                onChange={handleChange}
                placeholder="YYYY"
                min="1900"
                max={new Date().getFullYear()}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Year Sold */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">YEAR SOLD</label>
            <input
              type="number"
              name="yearSold"
              value={formData.yearSold || ''}
              onChange={handleChange}
              placeholder="YYYY (Leave empty if owned)"
              min="1900"
              max={new Date().getFullYear()}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              DESCRIPTION (MAX 100)
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief summary..."
              maxLength={100}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Anecdote */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              ANECDOTE (MAX 600)
            </label>
            <textarea
              name="anecdote"
              value={formData.anecdote}
              onChange={handleChange}
              placeholder="Tell the story of this car..."
              maxLength={600}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Image Style */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">IMAGE STYLE</label>
            <select
              name="imageStyle"
              value={formData.imageStyle}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="museum">Museum</option>
              <option value="showroom">Showroom</option>
            </select>
          </div>

          {/* Privacy */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">PRIVACY</label>
            <select
              name="privacy"
              value={formData.privacy}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="private">Private - Only you can see</option>
              <option value="public">Public - Visible to others</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full btn-primary py-3 rounded-md font-medium"
            >
              {editingCar ? 'SAVE CHANGES' : 'ADD VEHICLE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
