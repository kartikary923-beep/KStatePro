import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

const offices = [
  { city: 'Mumbai', address: 'Level 9, Trade Centre, BKC, Mumbai 400051', phone: '+91 22 4000 1200' },
  { city: 'Bengaluru', address: '4th Floor, Prestige Towers, MG Road, Bengaluru 560001', phone: '+91 80 4000 3400' },
  { city: 'Delhi NCR', address: 'Level 12, One Horizon Center, Gurugram 122002', phone: '+91 124 400 5600' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.';
    if (form.message.trim().length < 10) errs.message = 'Please tell us a bit more (at least 10 characters).';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSent(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <section className="border-b border-forest-800 bg-forest-900/40 py-14 lg:py-16">
        <div className="container-pro text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">We’re Here to Help</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-xl text-forest-300">
            Questions about buying, renting or selling? Our advisors respond within one business day.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-pro grid gap-10 lg:grid-cols-5">
          {/* Info column */}
          <div className="space-y-6 lg:col-span-2">
            <div className="card-dark p-6">
              <h2 className="font-display text-xl font-semibold text-white">Reach us directly</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-center gap-3 text-forest-200">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
                    <Phone size={17} />
                  </span>
                  <div>
                    <p className="font-medium text-white">1800 123 4567</p>
                    <p className="text-xs text-forest-400">Toll free, 9 AM – 8 PM IST</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-forest-200">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
                    <Mail size={17} />
                  </span>
                  <div>
                    <p className="font-medium text-white">hello@kstatePro.in</p>
                    <p className="text-xs text-forest-400">Response within 24 hours</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-forest-200">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
                    <Clock size={17} />
                  </span>
                  <div>
                    <p className="font-medium text-white">Mon – Sat</p>
                    <p className="text-xs text-forest-400">9:00 AM – 8:00 PM IST</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="card-dark p-6">
              <h2 className="font-display text-xl font-semibold text-white">Our offices</h2>
              <ul className="mt-5 space-y-5">
                {offices.map((o) => (
                  <li key={o.city} className="flex items-start gap-3 text-sm">
                    <MapPin size={17} className="mt-0.5 shrink-0 text-gold-500" />
                    <div>
                      <p className="font-medium text-white">{o.city}</p>
                      <p className="mt-0.5 text-forest-300">{o.address}</p>
                      <p className="mt-0.5 text-xs text-forest-400">{o.phone}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form column */}
          <div className="card-dark p-6 sm:p-8 lg:col-span-3">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-14 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/10 text-gold-400">
                  <CheckCircle2 size={32} />
                </span>
                <h2 className="mt-6 font-display text-2xl font-semibold text-white">Message Sent</h2>
                <p className="mt-3 max-w-sm text-forest-300">
                  Thank you, {form.name.split(' ')[0]}. An advisor will get back to you at {form.email} within
                  one business day.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
                  }}
                  className="btn-outline mt-8"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl font-semibold text-white">Send us a message</h2>
                <form onSubmit={submit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label-dark" htmlFor="c-name">Full Name</label>
                    <input id="c-name" className="input-dark" value={form.name} onChange={set('name')} placeholder="Your name" />
                    {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="label-dark" htmlFor="c-email">Email</label>
                    <input id="c-email" type="email" className="input-dark" value={form.email} onChange={set('email')} placeholder="you@example.com" />
                    {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="label-dark" htmlFor="c-phone">Phone (optional)</label>
                    <input id="c-phone" className="input-dark" value={form.phone} onChange={set('phone')} placeholder="98765 43210" inputMode="tel" />
                  </div>
                  <div>
                    <label className="label-dark" htmlFor="c-subject">Subject</label>
                    <select id="c-subject" className="input-dark" value={form.subject} onChange={set('subject')}>
                      {['General Enquiry', 'Buying a Property', 'Renting a Property', 'Selling a Property', 'Partnership'].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-dark" htmlFor="c-message">Message</label>
                    <textarea id="c-message" rows={5} className="input-dark resize-none" value={form.message} onChange={set('message')} placeholder="How can we help you?" />
                    {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
                  </div>
                  <button type="submit" className="btn-gold sm:col-span-2">
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
