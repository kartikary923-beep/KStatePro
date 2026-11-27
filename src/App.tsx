import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import ScrollToTop from '@/components/ScrollToTop';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Buy, { Rent } from '@/pages/Buy';
import Sell from '@/pages/Sell';
import PropertyDetails from '@/pages/PropertyDetails';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import UserDashboard from '@/pages/UserDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import Contact from '@/pages/Contact';

function PageTitle({ segment }: { segment: string }) {
  useEffect(() => {
    const titles: Record<string, string> = {
      '': 'kstatePro | Premium Real Estate in India',
      buy: 'Buy Property | kstatePro',
      rent: 'Rent Property | kstatePro',
      sell: 'Sell Property | kstatePro',
      login: 'Login | kstatePro',
      signup: 'Sign Up | kstatePro',
      dashboard: 'My Dashboard | kstatePro',
      admin: 'Admin | kstatePro',
      contact: 'Contact Us | kstatePro',
    };
    document.title = titles[segment] ?? 'Property Details | kstatePro';
  }, [segment]);
  return null;
}

function Layout() {
  const { pathname } = useLocation();
  const segment = pathname.split('/')[1] ?? '';
  return (
    <AuthProvider>
      <ScrollToTop />
      <PageTitle segment={segment} />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/properties" element={<Buy />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
