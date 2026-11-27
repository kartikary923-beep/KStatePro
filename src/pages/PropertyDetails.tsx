import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  Star,
  Compass,
  Sofa,
  CalendarDays,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  Building2,
} from 'lucide-react';
import { getPropertyById, getSimilarProperties } from '@/lib/propertyService';
import { formatPriceINR, formatDate, formatNumberINR, timeAgo } from '@/lib/format';
import type { Property } from '@/lib/types';
import PropertyCard, { PropertyImage } from '@/components/PropertyCard';
import SectionHeading from '@/components/SectionHeading';

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [similar, setSimilar] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [enquirySent, setEnquirySent] = useState(false);

  useEffect(() => {
    setLoading(true);
    setEnquirySent(false);
    getPropertyById(id ?? '').then((p) => {
      if (!p) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setProperty(p);
      getSimilarProperties(p, 3).then(setSimilar);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="container-pro py-16">
        <div className="h-[420px] animate-pulse rounded-2xl bg-forest-900" />
        <div className="mt-8 h-64 animate-pulse rounded-2xl bg-forest-900" />
      </div>
    );
  }

  if (notFound || !property) {
    return (
      <div className="container-pro py-24 text-center">
        <h1 className="font-display text-3xl text-white">Property not found</h1>
        <p className="mt-3 text-forest-300">This listing may have been sold or removed.</p>
        <Link to="/buy" className="btn-gold mt-8">
          Browse Properties
        </Link>
      </div>
    );
  }

  const facts = [
    { icon: BedDouble, label: 'Bedrooms', value: property.bedrooms > 0 ? `${property.bedrooms}` : '—' },
    { icon: Bath, label: 'Bathrooms', value: property.bathrooms > 0 ? `${property.bathrooms}` : '—' },
    { icon: Maximize, label: 'Built-up Area', value: `${formatNumberINR(property.areaSqft)} sq.ft` },
    { icon: Sofa, label: 'Furnishing', value: property.furnished },
    { icon: Compass, label: 'Facing', value: property.facing },
    { icon: CalendarDays, label: 'Listed On', value: formatDate(property.listedAt) },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container-pro pt-6">
        <Link
          to={property.purpose === 'buy' ? '/buy' : '/rent'}
          className="inline-flex items-center gap-1.5 text-sm text-forest-300 transition-colors hover:text-gold-300"
        >
          <ChevronLeft size={16} />
          Back to {property.purpose === 'buy' ? 'Buy' : 'Rent'}
        </Link>
      </div>

      <div className="container-pro grid gap-10 py-8 lg:grid-cols-3 lg:py-10">
        {/* Main column */}
        <div className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-2xl">
            <PropertyImage
              src={property.imageUrl}
              alt={property.title}
              className="aspect-[16/10] w-full object-cover"
            />
            {property.featured && (
              <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-3.5 py-1.5 text-xs font-semibold text-forest-950">
                Featured
              </span>
            )}
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-forest-800 px-3 py-1 text-xs font-semibold text-gold-300">
                For {property.purpose === 'buy' ? 'Sale' : 'Rent'}
              </span>
              <span className="rounded-full bg-forest-800 px-3 py-1 text-xs font-semibold text-forest-200">
                {property.propertyType}
              </span>
              <span className="flex items-center gap-1 text-sm text-forest-200">
                <Star size={14} className="fill-gold-400 text-gold-400" />
                {property.rating.toFixed(1)} rating
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
              {property.title}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-forest-300">
              <MapPin size={16} className="text-gold-500" />
              {property.locality}, {property.city}, {property.state}
            </p>
            <p className="mt-5 font-display text-3xl font-semibold text-gold-400">
              {formatPriceINR(property.price, property.purpose)}
            </p>
            <p className="mt-1 text-xs text-forest-400">{timeAgo(property.listedAt)}</p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="card-dark p-4">
                <Icon size={18} className="text-gold-500" />
                <p className="mt-2.5 text-xs uppercase tracking-wider text-forest-400">{label}</p>
                <p className="mt-0.5 font-medium text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="card-dark mt-8 p-6 lg:p-8">
            <h2 className="font-display text-xl font-semibold text-white">About this property</h2>
            <p className="mt-4 leading-relaxed text-forest-200">{property.description}</p>
          </div>

          <div className="card-dark mt-8 p-6 lg:p-8">
            <h2 className="font-display text-xl font-semibold text-white">Amenities</h2>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {property.amenities.map((a) => (
                <span key={a} className="flex items-center gap-2 text-sm text-forest-200">
                  <CheckCircle2 size={16} className="shrink-0 text-gold-500" />
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="card-dark p-6">
            <div className="flex items-center gap-3 border-b border-forest-800 pb-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/10 text-gold-400">
                <Building2 size={20} />
              </span>
              <div>
                <p className="font-medium text-white">{property.ownerName}</p>
                <p className="flex items-center gap-1 text-xs text-forest-400">
                  <ShieldCheck size={12} className="text-gold-500" />
                  Verified Partner
                </p>
              </div>
            </div>
            <p className="mt-5 text-xs uppercase tracking-wider text-forest-400">Contact</p>
            <p className="mt-1 font-display text-2xl text-white">{property.ownerPhone}</p>
            {enquirySent ? (
              <div className="mt-5 rounded-lg border border-gold-500/30 bg-gold-500/10 p-4 text-sm text-gold-200">
                Thank you! Your enquiry has been sent. The advisor will call you shortly.
              </div>
            ) : (
              <button
                onClick={() => setEnquirySent(true)}
                className="btn-gold mt-5 w-full"
              >
                <Phone size={16} />
                Request a Call Back
              </button>
            )}
            <p className="mt-3 text-center text-xs text-forest-400">
              Free site visit • No brokerage for buyers
            </p>
          </div>

          <div className="card-dark mt-6 p-6">
            <h3 className="font-semibold text-white">Price Trends in {property.locality}</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-forest-300">Avg. rate</span>
                <span className="font-medium text-white">
                  ₹{Math.round(property.price / property.areaSqft).toLocaleString('en-IN')}/sq.ft
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-forest-300">YoY change</span>
                <span className="font-medium text-green-400">+6.2%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-forest-800">
                <div className="h-full w-[62%] rounded-full bg-gold-500" />
              </div>
              <p className="text-xs text-forest-400">Demand in this area is high.</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Similar properties */}
      {similar.length > 0 && (
        <section className="border-t border-forest-800 bg-forest-900/40 py-16">
          <div className="container-pro">
            <SectionHeading eyebrow="You May Also Like" title="Similar Properties" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
