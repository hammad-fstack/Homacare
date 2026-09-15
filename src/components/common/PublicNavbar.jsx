import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';

const MENU_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Articles', path: '/articles' },
  { label: 'Virtual Consultation', path: '/doctor-portal' },
  { label: 'Lab Testing', path: '/lab-tests' },
  { label: 'Egg Freezing', path: '/egg-freezing' },
  { label: 'About Us', path: '/about' },
  { label: 'FAQs', path: '/faqs' },
  { label: 'Terms Of Services', path: '/terms' },
  { label: 'Privacy & Policy', path: '/privacy' },
];

const PublicNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 md:px-12">
        <Link to="/landing" className="text-2xl font-bold text-white">homacare</Link>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
            <Globe className="w-4 h-4 text-gray-700" />
          </button>
          <Link to="/signin" className="bg-white/90 hover:bg-white text-gray-900 text-sm font-medium px-5 py-2 rounded-full">
            Sign In
          </Link>
          <button onClick={() => setDrawerOpen(true)} className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
            <Menu className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setDrawerOpen(false)} />
          <div className="relative bg-white w-80 max-w-full h-full p-6 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <span className="text-2xl font-bold text-emerald-500">homacare</span>
              <button onClick={() => setDrawerOpen(false)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <nav className="flex flex-col gap-5 flex-1">
              {MENU_LINKS.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setDrawerOpen(false)} className="text-gray-700 text-sm font-medium">
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="space-y-3">
              <Link to="/signup" onClick={() => setDrawerOpen(false)}
                className="w-full block text-center border border-gray-200 text-gray-700 text-sm font-medium py-3 rounded-lg">
                Sign Up
              </Link>
              <Link to="/signin" onClick={() => setDrawerOpen(false)}
                className="w-full block text-center bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-3 rounded-lg">
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PublicNavbar;