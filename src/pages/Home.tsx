import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ShieldCheck, TrendingUp, Headset, KeyRound, Building2, ArrowRight } from 'lucide-react';
import { getFeaturedProperties, getLatestProperties } from '@/lib/propertyService';
import { CITIES } from '@/data/properties';
import type { Property } from '@/lib/types';
import PropertyCard, { PropertyImage } from '@/components/PropertyCard';
import SectionHeading from '@/components/SectionHeading';

function HeroSearch() {
  const [purpose, setPurpose] = useState<'buy' | 'rent'>('buy');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('purpose', purpose);
    if (city) params.set('city', city);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      className="mx-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-forest-950/70 p-2 backdrop-blur-md shadow-2xl shadow-black/40"
    >
      <div className="flex rounded-xl bg-forest-900 p-1">
        {(['buy', 'rent'] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPurpose(p)}
            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold capitalize transition-all duration-200 ${
              purpose === p ? 'bg-gold-500 text-forest-950' : 'text-forest-200 hover:text-gold-300'
            }`}
          >
            {p === 'buy' ? 'Buy' : 'Rent'}
          </button>
        ))}
      </div>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500" />
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input-dark !pl-11 appearance-none"
            aria-label="Select city"
          >
            <option value="">All Cities</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-gold !px-7">
          <Search size={17} />
          Search
        </button>
      </div>
    </form>
  );
}

function TrustBar() {
  const items = [
    { icon: ShieldCheck, title: 'Verified Listings', text: 'Every property is physically verified by our experts' },
    { icon: TrendingUp, title: 'Fair Market Pricing', text: 'Data-backed price guidance across 8 major cities' },
    { icon: Headset, title: 'Dedicated Advisors', text: 'A personal advisor from first visit to final handover' },
  ];
  return (
    <section className="border-y border-forest-800 bg-forest-900/40">
      <div className="container-pro grid gap-8 py-12 sm:grid-cols-3">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
              <Icon size={22} />
            </span>
            <div>
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-forest-300">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [featured, setFeatured] = useState<Property[]>([]);
  const [latest, setLatest] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getFeaturedProperties(3), getLatestProperties(6)]).then(([f, l]) => {
      setFeatured(f);
      setLatest(l);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <PropertyImage
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury home exterior at dusk"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/85 via-forest-950/75 to-forest-950" />
        <div className="container-pro relative flex min-h-[560px] flex-col items-center justify-center py-24 text-center lg:min-h-[640px]">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
            India’s Premium Real Estate
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Find Your Dream Property
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-forest-200">
            Handpicked homes, villas and apartments across India’s finest neighbourhoods —
            verified, fairly priced, and ready for you.
          </p>
          <div className="mt-9 w-full max-w-2xl">
            <HeroSearch />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-forest-300">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" /> 2,400+ Premium Listings
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" /> 8 Cities
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" /> 12,000+ Happy Families
            </span>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Featured Properties */}
      <section className="py-20 lg:py-24">
        <div className="container-pro">
          <SectionHeading
            eyebrow="Handpicked For You"
            title="Featured Properties"
            description="Exceptional homes chosen by our senior advisors for their location, build quality and value."
          />
          {loading ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="card-dark h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
          <div className="mt-10 text-center">
            <Link to="/buy" className="btn-outline">
              View All Properties
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="border-y border-forest-800 bg-forest-900/40 py-20 lg:py-24">
        <div className="container-pro">
          <SectionHeading
            eyebrow="Explore by City"
            title="Where We Operate"
            description="Deep local expertise in India’s most sought-after property markets."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {CITIES.slice(0, 8).map((city) => (
              <Link
                key={city}
                to={`/properties?purpose=buy&city=${encodeURIComponent(city)}`}
                className="card-dark group flex items-center justify-between px-5 py-4 transition-all hover:border-gold-500/40 hover:bg-forest-800"
              >
                <span className="flex items-center gap-2.5 font-medium text-forest-100 transition-colors group-hover:text-gold-300">
                  <Building2 size={17} className="text-gold-500" />
                  {city}
                </span>
                <ArrowRight size={15} className="text-forest-500 transition-all group-hover:translate-x-1 group-hover:text-gold-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Properties */}
      <section className="py-20 lg:py-24">
        <div className="container-pro">
          <SectionHeading
            eyebrow="Just Added"
            title="Latest Properties"
            description="Fresh on the market this week \u2014 be the first to schedule a visit."
          />
          {loading ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="card-dark h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 lg:pb-24">
        <div className="container-pro">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-800 to-forest-900 px-6 py-14 text-center sm:px-12 lg:py-16">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-500/10 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-gold-500/10 blur-3xl" />
            <h2 className="relative font-display text-3xl font-semibold text-white sm:text-4xl">
              Ready to Sell Your Property?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-forest-200">
              List with kstatePro and reach thousands of verified buyers. Free valuation, professional
              photography and dedicated support.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/sell" className="btn-gold">
                <KeyRound size={17} />
                List Your Property
              </Link>
              <Link to="/contact" className="btn-outline">
                Talk to an Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
