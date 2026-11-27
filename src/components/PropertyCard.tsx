import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BedDouble, Bath, Maximize, MapPin, Star } from 'lucide-react';
import type { Property } from '@/lib/types';
import { formatPriceINR } from '@/lib/format';

export function PropertyImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-forest-800 to-forest-900 ${className ?? ''}`}
      >
        <MapPin size={40} className="text-forest-600" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      to={`/property/${property.id}`}
      className="card-dark group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-xl hover:shadow-black/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <PropertyImage
          src={property.imageUrl}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-forest-950/80 px-3 py-1 text-xs font-semibold text-gold-300 backdrop-blur-sm">
          For {property.purpose === 'buy' ? 'Sale' : 'Rent'}
        </span>
        {property.featured && (
          <span className="absolute right-3 top-3 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-forest-950">
            Featured
          </span>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-sm font-semibold text-white">
          <Star size={14} className="fill-gold-400 text-gold-400" />
          {property.rating.toFixed(1)}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-display text-xl font-semibold text-gold-400">
            {formatPriceINR(property.price, property.purpose)}
          </p>
          <span className="rounded bg-forest-800 px-2 py-0.5 text-xs text-forest-200">
            {property.propertyType}
          </span>
        </div>
        <h3 className="mt-2 line-clamp-1 font-medium text-white transition-colors group-hover:text-gold-300">
          {property.title}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-forest-300">
          <MapPin size={14} className="shrink-0 text-gold-500" />
          {property.locality}, {property.city}
        </p>

        <div className="mt-4 flex items-center gap-4 border-t border-forest-800 pt-4 text-sm text-forest-200">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <BedDouble size={16} className="text-gold-500" />
              {property.bedrooms} Beds
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <Bath size={16} className="text-gold-500" />
              {property.bathrooms} Baths
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Maximize size={15} className="text-gold-500" />
            {property.areaSqft.toLocaleString('en-IN')} sq.ft
          </span>
        </div>
      </div>
    </Link>
  );
}
