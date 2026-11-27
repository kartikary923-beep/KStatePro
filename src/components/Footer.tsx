import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const buyLinks = [
  { label: 'Apartments in Mumbai', to: '/buy' },
  { label: 'Villas in Bengaluru', to: '/buy' },
  { label: 'Homes in Hyderabad', to: '/buy' },
  { label: 'Flats in Pune', to: '/buy' },
];

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Buy Property', to: '/buy' },
  { label: 'Rent Property', to: '/rent' },
  { label: 'Sell Property', to: '/sell' },
  { label: 'Contact Us', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-forest-800 bg-forest-950">
      <div className="container-pro grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500 text-forest-950">
              <Building2 size={20} strokeWidth={2.2} />
            </span>
            <span className="font-display text-xl font-semibold text-white">
              kstate<span className="text-gold-400">Pro</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-forest-300">
            India’s trusted destination for premium real kstate. Buy, rent and sell homes with
            confidence, backed by verified listings and expert guidance.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-forest-700 text-forest-300 transition-all hover:border-gold-500 hover:text-gold-400"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400">Quick Links</h4>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-forest-300 transition-colors hover:text-gold-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400">Popular Searches</h4>
          <ul className="mt-4 space-y-2.5">
            {buyLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-forest-300 transition-colors hover:text-gold-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400">Get in Touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-forest-300">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold-500" />
              Level 12, One Horizon Center, Gurugram, Delhi NCR 122002
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="shrink-0 text-gold-500" />
              1800 123 4567 (Toll Free)
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0 text-gold-500" />
              hello@kstatePro.in
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-forest-800/70">
        <div className="container-pro flex flex-col items-center justify-between gap-3 py-5 text-xs text-forest-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} kstatePro Realty Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-gold-300">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-gold-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
