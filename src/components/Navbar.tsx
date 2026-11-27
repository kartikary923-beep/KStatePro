import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Building2 } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Properties', to: '/properties' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-gold-400'
        : 'text-forest-100 hover:text-gold-300'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-forest-800 bg-forest-950/95 backdrop-blur-md shadow-lg'
          : 'border-transparent bg-forest-950/80 backdrop-blur-sm'
      }`}
    >
      <div className="container-pro flex h-16 items-center justify-between gap-4">
        {/* Website Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Building2 size={20} strokeWidth={2.2} />
          </span>

          <span className="text-xl font-semibold tracking-tight text-white">
            KState<span className="text-gold-400">Pro</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Login Button */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}