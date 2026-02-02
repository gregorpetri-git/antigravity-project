// Car type enum
export type CarType =
  | 'Sedan'
  | 'Coupe'
  | 'Convertible'
  | 'SUV'
  | 'Wagon'
  | 'Hatchback'
  | 'Truck'
  | 'Van'
  | 'Sports Car'
  | 'Other';

// Image style for AI-generated images
export type ImageStyle = 'museum' | 'showroom';

// Privacy setting
export type PrivacySetting = 'public' | 'private';

// Car/Vehicle interface
export interface Car {
  id: string;
  userId: string;
  make: string;
  model: string;
  type: CarType;
  color: string;
  yearBuilt: number;
  yearBought: number;
  yearSold: number | null; // null means still owned
  description: string; // max 100 chars
  anecdote: string; // max 600 chars
  imageUrl: string | null;
  imageStyle: ImageStyle;
  privacy: PrivacySetting;
  createdAt: Date;
  updatedAt: Date;
}

// User profile interface
export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  createdAt: Date;
}

// Form data for creating/editing a car
export interface CarFormData {
  make: string;
  model: string;
  type: CarType;
  color: string;
  yearBuilt: number | '';
  yearBought: number | '';
  yearSold: number | '' | null;
  description: string;
  anecdote: string;
  imageStyle: ImageStyle;
  privacy: PrivacySetting;
}

// Auth state
export interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Car type options for dropdown
export const CAR_TYPES: CarType[] = [
  'Sedan',
  'Coupe',
  'Convertible',
  'SUV',
  'Wagon',
  'Hatchback',
  'Truck',
  'Van',
  'Sports Car',
  'Other',
];

// Helper to calculate ownership duration
export function calculateOwnership(yearBought: number, yearSold: number | null): string {
  const endYear = yearSold || new Date().getFullYear();
  const years = endYear - yearBought;

  if (yearSold === null) {
    return 'Current';
  }

  if (years === 0) {
    return '< 1 Yr';
  } else if (years === 1) {
    return '1 Yr';
  } else {
    return `${years} Yrs`;
  }
}
