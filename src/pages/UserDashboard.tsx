import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Heart, MessageSquare, Search, LogOut, MapPin, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getProperties } from '@/lib/propertyService';
import { timeAgo } from '@/lib/format';
import type { Property } from '@/lib/types';
import PropertyCard from '@/components/PropertyCard';

const tabs = [
  { id: 'favourites', label: 'Saved Properties', icon: Heart },
  { id: 'searches', label: 'Recent Searches', icon: Search },
  { id: 'enquiries', label: 'My Enquiries', icon: MessageSquare },
] as const;

type TabId = (typeof tabs)[number]['id'];

export default function UserDashboard() {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabId>('favourites');
  const [saved, setSaved] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProperties({ limit: 3 }).then((list) => {
      setSaved(list);
      setLoading(false);
    });
  }, []);

  if (authLoading) {
    return <div className="container-pro py-24 text-center text-forest-300">Loading…</div>;
  }
  if (!user) return <Navigate to="/login" state={{ from: '/dashboard' }} replace />;

  const searches = [
    { label: '3 BHK in Bengaluru', purpose: 'buy', city: 'Bengaluru' },
    { label: 'Flats for rent in Powai', purpose: 'rent', city: 'Mumbai' },
    { label: 'Villas in Hyderabad', purpose: 'buy', city: 'Hyderabad' },
  ];

  const enquiries = [
    { property: 'Sea-Facing Luxury Apartment at Worli', status: 'Advisor assigned', date: '2026-11-21' },
    { property: 'Premium Furnished Flat in Salt Lake', status: 'Site visit scheduled', date: '2026-11-23' },
  ];

  return (
    <div className="container-pro py-10 lg:py-14">
      {/* Header */}
      <div className="card-dark flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500 text-xl font-bold text-forest-950">
            {user.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <h1 className="font-display text-2xl font-semibold text-white">Hello, {user.name.split(' ')[0]}</h1>
            <p className="text-sm text-forest-300">{user.email}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="btn-outline !px-4 !py-2.5">
            <Settings size={15} />
            Settings
          </button>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="btn-outline !px-4 !py-2.5"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Saved Properties', value: saved.length, icon: Heart },
          { label: 'Recent Searches', value: searches.length, icon: Search },
          { label: 'Open Enquiries', value: enquiries.length, icon: MessageSquare },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="card-dark flex items-center gap-4 p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
              <Icon size={20} />
            </span>
            <div>
              <p className="font-display text-2xl font-semibold text-white">{value}</p>
              <p className="text-sm text-forest-300">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-2 overflow-x-auto border-b border-forest-800 pb-px">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-t-lg px-4 py-3 text-sm font-medium transition-colors ${
              tab === id
                ? 'border-b-2 border-gold-500 bg-forest-900/60 text-gold-400'
                : 'text-forest-300 hover:text-gold-300'
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === 'favourites' && (
          <>
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="card-dark h-96 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {saved.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            )}
            <p className="mt-6 text-center text-sm text-forest-400">
              Showing sample recommendations. Favourites sync once the database is connected.
            </p>
          </>
        )}

        {tab === 'searches' && (
          <div className="space-y-3">
            {searches.map((s) => (
              <Link
                key={s.label}
                to={`/properties?purpose=${s.purpose}&city=${encodeURIComponent(s.city)}`}
                className="card-dark flex items-center justify-between px-5 py-4 transition-all hover:border-gold-500/40"
              >
                <div className="flex items-center gap-3">
                  <Search size={16} className="text-gold-500" />
                  <span className="font-medium text-forest-100">{s.label}</span>
                </div>
                <MapPin size={15} className="text-forest-500" />
              </Link>
            ))}
          </div>
        )}

        {tab === 'enquiries' && (
          <div className="space-y-3">
            {enquiries.map((e) => (
              <div key={e.property} className="card-dark flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-forest-100">{e.property}</p>
                  <p className="text-xs text-forest-400">{timeAgo(e.date)}</p>
                </div>
                <span className="w-fit rounded-full bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-300">
                  {e.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-10 text-center text-xs text-forest-500">
        Want to list a property?{' '}
        <Link to="/sell" className="text-gold-400 hover:text-gold-300">
          Sell with kstatePro
        </Link>{' '}
        — listings are free.
      </p>
    </div>
  );
}
