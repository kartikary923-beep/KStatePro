export type PropertyPurpose = 'buy' | 'rent';

export type PropertyType =
  | 'Apartment'
  | 'Villa'
  | 'Independent House'
  | 'Penthouse'
  | 'Plot'
  | 'Builder Floor';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  purpose: PropertyPurpose;
  propertyType: PropertyType;
  city: string;
  locality: string;
  state: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  furnished: 'Unfurnished' | 'Semi-Furnished' | 'Furnished';
  facing: 'North' | 'South' | 'East' | 'West' | 'North-East' | 'South-West';
  amenities: string[];
  imageUrl: string;
  imageUrls?: string[];
  featured: boolean;
  listedAt: string;
  ownerName: string;
  ownerPhone: string;
  rating: number;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'in-progress' | 'resolved';
}
