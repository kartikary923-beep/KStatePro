import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      navigate(user.role === 'admin' ? '/admin' : from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-pro flex min-h-[calc(100vh-10rem)] items-center justify-center py-16">
      <div className="w-full max-w-md">
        <div className="card-dark p-8 sm:p-10">
          <div className="text-center">
            <h1 className="font-display text-3xl font-semibold text-white">Welcome Back</h1>
            <p className="mt-2 text-sm text-forest-300">Sign in to manage your properties and enquiries.</p>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-5">
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}
            <div>
              <label className="label-dark" htmlFor="login-email">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-400" />
                <input
                  id="login-email"
                  type="email"
                  required
                  className="input-dark !pl-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="label-dark" htmlFor="login-password">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-400" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="input-dark !pl-11 !pr-11"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
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
            </div>
            <button type="submit" disabled={loading} className="btn-gold w-full">
              <LogIn size={16} />
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-forest-300">
            New to kstatePro?{' '}
            <Link to="/signup" className="font-medium text-gold-400 hover:text-gold-300">
              Create an account
            </Link>
          </p>
        </div>

        <div className="card-dark mt-4 p-4 text-center text-xs text-forest-300">
          <p className="font-semibold text-gold-400">Demo accounts</p>
          <p className="mt-1">User: user@kstatePro.in / password</p>
          <p>Admin: admin@kstatePro.in / admin123</p>
        </div>
      </div>
    </div>
  );
}
