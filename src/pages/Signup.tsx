import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, Eye, EyeOff, Phone } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 3) errs.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.';
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) errs.phone = 'Enter a valid 10-digit mobile number.';
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match.';
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      await signup(form.name.trim(), form.email, form.password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordField = (id: string, label: string, key: 'password' | 'confirm') => (
    <div>
      <label className="label-dark" htmlFor={id}>{label}</label>
      <div className="relative">
        <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-400" />
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          required
          className="input-dark !pl-11 !pr-11"
          value={form[key]}
          onChange={set(key)}
          placeholder={key === 'password' ? 'At least 6 characters' : 'Re-enter password'}
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-forest-400 transition-colors hover:text-gold-300"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {fieldErrors[key] && <p className="mt-1.5 text-xs text-red-400">{fieldErrors[key]}</p>}
    </div>
  );

  return (
    <div className="container-pro flex min-h-[calc(100vh-10rem)] items-center justify-center py-16">
      <div className="w-full max-w-md">
        <div className="card-dark p-8 sm:p-10">
          <div className="text-center">
            <h1 className="font-display text-3xl font-semibold text-white">Create Your Account</h1>
            <p className="mt-2 text-sm text-forest-300">
              Save favourites, track enquiries and get personalised recommendations.
            </p>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}
            <div>
              <label className="label-dark" htmlFor="signup-name">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-400" />
                <input
                  id="signup-name"
                  className="input-dark !pl-11"
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Your name"
                />
              </div>
              {fieldErrors.name && <p className="mt-1.5 text-xs text-red-400">{fieldErrors.name}</p>}
            </div>
            <div>
              <label className="label-dark" htmlFor="signup-email">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-400" />
                <input
                  id="signup-email"
                  type="email"
                  className="input-dark !pl-11"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="you@example.com"
                />
              </div>
              {fieldErrors.email && <p className="mt-1.5 text-xs text-red-400">{fieldErrors.email}</p>}
            </div>
            <div>
              <label className="label-dark" htmlFor="signup-phone">Mobile Number</label>
              <div className="relative">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-400" />
                <input
                  id="signup-phone"
                  className="input-dark !pl-11"
                  value={form.phone}
                  onChange={set('phone')}
                  placeholder="98765 43210"
                  inputMode="tel"
                />
              </div>
              {fieldErrors.phone && <p className="mt-1.5 text-xs text-red-400">{fieldErrors.phone}</p>}
            </div>
            {passwordField('signup-password', 'Password', 'password')}
            {passwordField('signup-confirm', 'Confirm Password', 'confirm')}
            <button type="submit" disabled={loading} className="btn-gold w-full">
              <UserPlus size={16} />
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-forest-300">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-gold-400 hover:text-gold-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
