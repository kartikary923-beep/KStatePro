import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IndianRupee, Camera, UserCheck, TrendingUp, CheckCircle2 } from 'lucide-react';
import { CITIES } from '@/data/properties';

const benefits = [
  { icon: IndianRupee, title: 'Free Valuation', text: 'Get a data-backed estimate of your property’s worth within 24 hours.' },
  { icon: Camera, title: 'Professional Photography', text: 'Our team shoots your home so it looks its absolute best online.' },
  { icon: UserCheck, title: 'Verified Buyers', text: 'We screen every enquiry before it reaches you.' },
  { icon: TrendingUp, title: 'Wider Reach', text: 'Your listing goes to thousands of active buyers across India.' },
];

export default function Sell() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    locality: '',
    propertyType: 'Apartment',
    expectedPrice: '',
    details: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Please enter your name.';
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) errs.phone = 'Enter a valid 10-digit mobile number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.';
    if (!form.city) errs.city = 'Please select a city.';
    if (!form.locality.trim()) errs.locality = 'Please enter the locality.';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="container-pro flex min-h-[60vh] items-center justify-center py-20">
        <div className="card-dark max-w-md p-10 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/10 text-gold-400">
            <CheckCircle2 size={32} />
          </span>
          <h1 className="mt-6 font-display text-2xl font-semibold text-white">Listing Request Received</h1>
          <p className="mt-3 leading-relaxed text-forest-300">
            Thank you, {form.name.split(' ')[0]}. Our property expert for {form.city} will call you on{' '}
            {form.phone} within 24 hours to schedule the valuation.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <button onClick={() => navigate('/')} className="btn-gold w-full">
              Back to Home
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm((f) => ({ ...f, name: '', phone: '', email: '', locality: '', details: '' }));
              }}
              className="btn-outline w-full"
            >
              List Another Property
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="border-b border-forest-800 bg-forest-900/40 py-14 lg:py-16">
        <div className="container-pro text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Sell With Us</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            List Your Property
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-forest-300">
            Zero listing fees. Dedicated relationship manager. End-to-end paperwork support.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-pro grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold text-white">Why list with kstatePro?</h2>
            <div className="mt-8 space-y-6">
              {benefits.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="font-medium text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-forest-300">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-dark p-6 sm:p-8 lg:col-span-3">
            <h2 className="font-display text-2xl font-semibold text-white">Tell us about your property</h2>
            <form onSubmit={submit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label-dark" htmlFor="sell-name">Full Name</label>
                <input id="sell-name" className="input-dark" value={form.name} onChange={set('name')} placeholder="Rahul Verma" />
                {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label className="label-dark" htmlFor="sell-phone">Mobile Number</label>
                <input id="sell-phone" className="input-dark" value={form.phone} onChange={set('phone')} placeholder="98765 43210" inputMode="tel" />
                {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="label-dark" htmlFor="sell-email">Email</label>
                <input id="sell-email" type="email" className="input-dark" value={form.email} onChange={set('email')} placeholder="you@example.com" />
                {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
              </div>
              <div>
                <label className="label-dark" htmlFor="sell-city">City</label>
                <select id="sell-city" className="input-dark" value={form.city} onChange={set('city')}>
                  <option value="">Select city</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.city && <p className="mt-1.5 text-xs text-red-400">{errors.city}</p>}
              </div>
              <div>
                <label className="label-dark" htmlFor="sell-locality">Locality</label>
                <input id="sell-locality" className="input-dark" value={form.locality} onChange={set('locality')} placeholder="e.g. Andheri West" />
                {errors.locality && <p className="mt-1.5 text-xs text-red-400">{errors.locality}</p>}
              </div>
              <div>
                <label className="label-dark" htmlFor="sell-type">Property Type</label>
                <select id="sell-type" className="input-dark" value={form.propertyType} onChange={set('propertyType')}>
                  {['Apartment', 'Villa', 'Independent House', 'Penthouse', 'Builder Floor', 'Plot'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-dark" htmlFor="sell-price">Expected Price (₹)</label>
                <input id="sell-price" className="input-dark" value={form.expectedPrice} onChange={set('expectedPrice')} placeholder="e.g. 8500000" inputMode="numeric" />
              </div>
              <div className="sm:col-span-2">
                <label className="label-dark" htmlFor="sell-details">Property Details</label>
                <textarea id="sell-details" rows={4} className="input-dark resize-none" value={form.details} onChange={set('details')} placeholder="Bedrooms, floor, age of property, amenities…" />
              </div>
              <button type="submit" className="btn-gold sm:col-span-2">
                Submit for Free Valuation
              </button>
              <p className="text-center text-xs text-forest-400 sm:col-span-2">
                By submitting, you agree to be contacted by our advisors. Your details are never shared with third parties.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
