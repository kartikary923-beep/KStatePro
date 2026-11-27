import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import { getProperties, type PropertyFilters } from '@/lib/propertyService';
import { CITIES } from '@/data/properties';
import type { Property, PropertyType } from '@/lib/types';
import PropertyCard from '@/components/PropertyCard';

const PROPERTY_TYPES: (PropertyType | 'All Types')[] = [
  'All Types',
  'Apartment',
  'Villa',
  'Independent House',
  'Penthouse',
  'Builder Floor',
  'Plot',
];

interface ListingPageProps {
  purpose: 'buy' | 'rent';
  title: string;
  subtitle: string;
}

export default function ListingPage({ purpose, title, subtitle }: ListingPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const city = searchParams.get('city') ?? 'All Cities';

  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const [type, setType] = useState('All Types');
  const [bedrooms, setBedrooms] = useState(0);
  const [sort, setSort] = useState<NonNullable<PropertyFilters['sort']>>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProperties({ purpose, city, type, bedrooms, sort, search: search || undefined }).then((list) => {
      setProperties(list);
      setLoading(false);
    });
  }, [purpose, city, type, bedrooms, sort, search]);

  const heading = useMemo(() => {
    const base = purpose === 'buy' ? 'Properties for Sale' : 'Properties for Rent';
    if (city && city !== 'All Cities') return `${base} in ${city}`;
    return base;
  }, [purpose, city]);

  const setCityParam = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === 'All Cities') next.delete('city');
    else next.set('city', value);
    setSearchParams(next, { replace: true });
  };

  const filtersActive = type !== 'All Types' || bedrooms > 0 || search !== '';

  return (
    <div>
      <section className="border-b border-forest-800 bg-forest-900/40 py-14 lg:py-16">
        <div className="container-pro text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">{title}</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            {heading}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-forest-300">{subtitle}</p>
        </div>
      </section>

      {/* Search + filter bar */}
      <div className="sticky top-16 z-30 border-b border-forest-800 bg-forest-950/95 py-4 backdrop-blur-md lg:top-20">
        <div className="container-pro flex flex-wrap items-center gap-3">
          <div className="relative min-w-[200px] flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-forest-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search locality, city or project…"
              className="input-dark !py-2.5 !pl-10"
            />
          </div>
          <select
            value={city}
            onChange={(e) => setCityParam(e.target.value)}
            className="input-dark !w-auto !py-2.5"
            aria-label="City"
          >
            <option value="All Cities">All Cities</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as NonNullable<PropertyFilters['sort']>)}
            className="input-dark !w-auto !py-2.5"
            aria-label="Sort"
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`btn-outline !px-4 !py-2.5 ${filtersActive ? '!border-gold-500 !text-gold-400' : ''}`}
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="container-pro mt-4 flex flex-wrap items-end gap-4 border-t border-forest-800/70 pt-4">
            <div>
              <label className="label-dark">Property Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="input-dark !w-auto !py-2.5">
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-dark">Bedrooms</label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="input-dark !w-auto !py-2.5"
              >
                <option value={0}>Any</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}+ BHK
                  </option>
                ))}
              </select>
            </div>
            {filtersActive && (
              <button
                onClick={() => {
                  setType('All Types');
                  setBedrooms(0);
                  setSearch('');
                }}
                className="flex items-center gap-1.5 pb-3 text-sm text-forest-300 transition-colors hover:text-gold-300"
              >
                <X size={14} />
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      <section className="py-12 lg:py-16">
        <div className="container-pro">
          <p className="mb-6 text-sm text-forest-300">
            {loading
              ? 'Loading properties…'
              : `${properties.length} propert${properties.length === 1 ? 'y' : 'ies'} found`}
          </p>
          {!loading && properties.length === 0 && (
            <div className="card-dark mx-auto max-w-md px-8 py-16 text-center">
              <p className="font-display text-xl text-white">No properties found</p>
              <p className="mt-2 text-sm text-forest-300">
                Try changing the city or clearing some filters.
              </p>
            </div>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="card-dark h-96 animate-pulse" />)
              : properties.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
