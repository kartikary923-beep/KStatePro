import { Navigate } from 'react-router-dom';
import ListingPage from '@/pages/ListingPage';

export default function Buy() {
  return (
    <ListingPage
      purpose="buy"
      title="Buy a Home"
      subtitle="Premium apartments, villas and houses for sale across India, verified by our on-ground experts."
    />
  );
}

export function Rent() {
  return (
    <ListingPage
      purpose="rent"
      title="Rent a Home"
      subtitle="Thoughtfully curated rental homes in India's best-connected neighbourhoods."
    />
  );
}

export function BuyRedirect() {
  return <Navigate to="/buy" replace />;
}
