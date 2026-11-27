# Project memory

## Product intent & audience

- kstatePro: premium real estate website targeting the Indian market.
- Supports buying, renting, and selling residential property listings.
- Two user roles: regular users and admins, each with a dashboard.
- Frontend-first build; structured for later Supabase database integration.

## Brand personality & voice

- Premium, professional, modern — not cookie-cutter.
- Trust-focused messaging (trust highlights on homepage, call-to-action for sellers).
- Indian market context: INR pricing, Indian city names, demo accounts on `.kstatePro.in` domains.

## Visual design & UX direction

- Dark forest green and gold color theme throughout.
- Elegant serif headings paired with clean sans-serif body text.
- Fully responsive: mobile → desktop; hamburger menu on small screens.
- Hover effects and transitions on interactive elements.
- Homepage layout: logo, hero ("Find Your Dream Property") with Buy/Rent toggle + city search, trust highlights, Featured Properties, city grid, Latest Properties, sell-with-us CTA, professional footer.
- Listing pages (Buy/Rent): filters for city, property type, bedrooms, search text, price sorting.
- Property Details: gallery header, facts panel, amenities, price-trend panel, call-back enquiry form, similar properties.
- Dashboards use tabbed layouts (user: saved properties, recent searches, enquiries; admin: stats, listings table, enquiries, users).
- Forms use client-side validation with confirmation states.

## Decisions, constraints & rationale

- Stack: React + Vite, Tailwind CSS, lucide-react icons, React Router for navigation.
- Path alias `@/` → `src/` used for all project imports (per global instructions).
- 10 pages built: Home, Buy, Rent, Sell, Property Details, Login, Signup, User Dashboard, Admin Dashboard, Contact.
- Property data flows through a single service layer so Supabase can be enabled by swapping that layer and adding tables — no paid APIs or services.
- Demo credentials seeded: `user@kstatePro.in` / `password` and `admin@kstatePro.in` / `admin123`; new signups also work.
- Images currently loaded from a free public source (photo service was unavailable during build); curated stock photos can replace failures.
- Build and type-check pass cleanly.

## Open questions & assumptions

- Supabase integration not yet connected; tables/schema and auth migration still to be defined when ready.
- Sample property data is realistic but static until database is live.
- Image sourcing is a fallback; curated stock set may be needed for reliability.
- Admin role gating is client-side for now; server-side auth/authorization pending Supabase.