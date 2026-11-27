import type { Property } from '@/lib/types';
import { properties as sampleProperties } from '@/data/properties';

const USE_SUPABASE = false;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface PropertyFilters {
  purpose?: Property['purpose'];
  city?: string;
  search?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  sort?: 'newest' | 'price-asc' | 'price-desc';
  limit?: number;
}

function applyFilters(list: Property[], filters: PropertyFilters): Property[] {
  let result = [...list];
  if (filters.purpose) result = result.filter((p) => p.purpose === filters.purpose);
  if (filters.city && filters.city !== 'All Cities')
    result = result.filter((p) => p.city === filters.city);
  if (filters.type && filters.type !== 'All Types')
    result = result.filter((p) => p.propertyType === filters.type);
  if (filters.bedrooms && (filters.bedrooms ?? 0) > 0)
    result = result.filter((p) => p.bedrooms >= (filters.bedrooms ?? 0));
  if (filters.minPrice) result = result.filter((p) => p.price >= filters.minPrice!);
  if (filters.maxPrice) result = result.filter((p) => p.price <= filters.maxPrice!);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q),
    );
  }
  switch (filters.sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    default:
      result.sort((a, b) => b.listedAt.localeCompare(a.listedAt));
  }
  if (filters.limit) result = result.slice(0, filters.limit);
  return result;
}

export async function getProperties(filters: PropertyFilters = {}): Promise<Property[]> {
  if (USE_SUPABASE) {
    // Supabase integration point:
    // const { data, error } = await supabase
    //   .from('properties')
    //   .select('*')
    //   .eq('status', 'active');
    // if (error) throw error;
    // return applyFilters(data as Property[], filters);
    return [];
  }
  await delay(120);
  return applyFilters(sampleProperties, filters);
}

export async function getPropertyById(id: string): Promise<Property | undefined> {
  if (USE_SUPABASE) {
    // const { data, error } = await supabase
    //   .from('properties')
    //   .select('*')
    //   .eq('id', id)
    //   .maybeSingle();
    // if (error) throw error;
    // return data as Property | undefined;
    return undefined;
  }
  await delay(80);
  return sampleProperties.find((p) => p.id === id);
}

export async function getFeaturedProperties(limit = 3): Promise<Property[]> {
  await delay(80);
  return sampleProperties.filter((p) => p.featured).slice(0, limit);
}

export async function getLatestProperties(limit = 6): Promise<Property[]> {
  await delay(80);
  const sorted = [...sampleProperties].sort((a, b) => b.listedAt.localeCompare(a.listedAt));
  return sorted.slice(0, limit);
}

export async function getSimilarProperties(property: Property, limit = 3): Promise<Property[]> {
  await delay(60);
  return sampleProperties
    .filter((p) => p.id !== property.id && p.purpose === property.purpose)
    .sort((a, b) => {
      const scoreA = (a.city === property.city ? 2 : 0) + (a.propertyType === property.propertyType ? 1 : 0);
      const scoreB = (b.city === property.city ? 2 : 0) + (b.propertyType === property.propertyType ? 1 : 0);
      return scoreB - scoreA;
    })
    .slice(0, limit);
}
