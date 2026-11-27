import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  Building2,
  Users,
  MessageSquare,
  IndianRupee,
  TrendingUp,
  Plus,
  Eye,
  Pencil,
  Trash2,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getProperties } from '@/lib/propertyService';
import { formatPriceINR, timeAgo } from '@/lib/format';
import type { Property } from '@/lib/types';

type TabId = 'listings' | 'enquiries' | 'users';

export default function AdminDashboard() {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabId>('listings');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProperties({}).then((list) => {
      setProperties(list);
      setLoading(false);
    });
  }, []);

  if (authLoading) {
    return <div className="container-pro py-24 text-center text-forest-300">Loading…</div>;
  }
  if (!user) return <Navigate to="/login" state={{ from: '/admin' }} replace />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;

  const buyCount = properties.filter((p) => p.purpose === 'buy').length;
  const rentCount = properties.filter((p) => p.purpose === 'rent').length;
  const totalValue = properties.filter((p) => p.purpose === 'buy').reduce((sum, p) => sum + p.price, 0);

  const stats = [
    { label: 'Total Listings', value: properties.length, icon: Building2, change: '+12 this month' },
    { label: 'For Sale', value: buyCount, icon: TrendingUp, change: '+4 this week' },
    { label: 'For Rent', value: rentCount, icon: IndianRupee, change: '+2 this week' },
    { label: 'Registered Users', value: 1247, icon: Users, change: '+38 this month' },
  ];

  const enquiries = [
    { name: 'Priya Nair', property: 'Sky Penthouse at Jubilee Hills', date: '2026-11-23', status: 'New' },
    { name: 'Rohit Malhotra', property: 'Corporate 2BHK in Powai', date: '2026-11-22', status: 'In Progress' },
    { name: 'Ananya Iyer', property: 'Modern Villa in Whitefield', date: '2026-11-21', status: 'New' },
    { name: 'Vikram Singh', property: 'Builder Floor in Defence Colony', date: '2026-11-20', status: 'Resolved' },
    { name: 'Sneha Kulkarni', property: 'Sunlit 3BHK in Koregaon Park', date: '2026-11-19', status: 'In Progress' },
  ];

  const users = [
    { name: 'Aarav Sharma', email: 'user@kstatePro.in', joined: '2026-10-12', role: 'User' },
    { name: 'Priya Nair', email: 'priya.n@example.in', joined: '2026-10-18', role: 'User' },
    { name: 'Rohit Malhotra', email: 'rohit.m@example.in', joined: '2026-11-02', role: 'User' },
    { name: 'Ananya Iyer', email: 'ananya.i@example.in', joined: '2026-11-11', role: 'User' },
    { name: 'kstatePro Admin', email: 'admin@kstatePro.in', joined: '2026-08-01', role: 'Admin' },
  ];

  const statusStyle = (status: string) =>
    status === 'New'
      ? 'bg-gold-500/10 text-gold-300'
      : status === 'In Progress'
        ? 'bg-blue-500/10 text-blue-300'
        : 'bg-green-500/10 text-green-300';

  return (
    <div className="container-pro py-10 lg:py-14">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">kstatePro Admin</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-white">Dashboard</h1>
        </div>
        <div className="flex gap-3">
          <Link to="/sell" className="btn-gold !px-4 !py-2.5">
            <Plus size={15} />
            Add Listing
          </Link>
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
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, change }) => (
          <div key={label} className="card-dark p-6">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
                <Icon size={18} />
              </span>
              <span className="text-xs text-green-400">{change}</span>
            </div>
            <p className="mt-4 font-display text-2xl font-semibold text-white">{value}</p>
            <p className="text-sm text-forest-300">{label}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-forest-500">
        Portfolio under management: {formatPriceINR(totalValue, 'buy')} in active sale listings.
      </p>

      {/* Tabs */}
      <div className="mt-8 flex gap-2 overflow-x-auto border-b border-forest-800 pb-px">
        {([
          { id: 'listings', label: 'Property Listings', icon: Building2 },
          { id: 'enquiries', label: 'Enquiries', icon: MessageSquare },
          { id: 'users', label: 'Users', icon: Users },
        ] as const).map(({ id, label, icon: Icon }) => (
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

      {/* Listings tab */}
      {tab === 'listings' && (
        <div className="mt-8 overflow-x-auto">
          {loading ? (
            <div className="card-dark h-64 animate-pulse" />
          ) : (
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-forest-800 text-xs uppercase tracking-wider text-forest-400">
                  <th className="px-4 py-3 font-semibold">Property</th>
                  <th className="px-4 py-3 font-semibold">City</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Purpose</th>
                  <th className="px-4 py-3 font-semibold">Listed</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((p) => (
                  <tr key={p.id} className="border-b border-forest-800/60 transition-colors hover:bg-forest-900/60">
                    <td className="max-w-[260px] truncate px-4 py-3.5 font-medium text-forest-100">{p.title}</td>
                    <td className="px-4 py-3.5 text-forest-300">{p.city}</td>
                    <td className="px-4 py-3.5 font-medium text-gold-400">{formatPriceINR(p.price, p.purpose)}</td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          p.purpose === 'buy' ? 'bg-gold-500/10 text-gold-300' : 'bg-blue-500/10 text-blue-300'
                        }`}
                      >
                        {p.purpose === 'buy' ? 'Sale' : 'Rent'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-forest-400">{timeAgo(p.listedAt)}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex justify-end gap-1.5">
                        <Link
                          to={`/property/${p.id}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-forest-300 transition-colors hover:bg-forest-800 hover:text-gold-300"
                          aria-label="View"
                        >
                          <Eye size={15} />
                        </Link>
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-forest-300 transition-colors hover:bg-forest-800 hover:text-gold-300"
                          aria-label="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-forest-300 transition-colors hover:bg-forest-800 hover:text-red-300"
                          aria-label="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Enquiries tab */}
      {tab === 'enquiries' && (
        <div className="mt-8 space-y-3">
          {enquiries.map((e) => (
            <div
              key={`${e.name}-${e.property}`}
              className="card-dark flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-800 text-sm font-semibold text-gold-400">
                  {e.name.charAt(0)}
                </span>
                <div>
                  <p className="font-medium text-forest-100">{e.name}</p>
                  <p className="text-xs text-forest-400">{e.property}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-forest-400">{timeAgo(e.date)}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(e.status)}`}>
                  {e.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Users tab */}
      {tab === 'users' && (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-forest-800 text-xs uppercase tracking-wider text-forest-400">
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Joined</th>
                <th className="px-4 py-3 font-semibold">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email} className="border-b border-forest-800/60 transition-colors hover:bg-forest-900/60">
                  <td className="px-4 py-3.5 font-medium text-forest-100">{u.name}</td>
                  <td className="px-4 py-3.5 text-forest-300">{u.email}</td>
                  <td className="px-4 py-3.5 text-forest-400">{timeAgo(u.joined)}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        u.role === 'Admin' ? 'bg-gold-500/10 text-gold-300' : 'bg-forest-800 text-forest-200'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
