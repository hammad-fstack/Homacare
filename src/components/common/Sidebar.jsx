import { Home, Stethoscope, FlaskConical, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { icon: Home, path: '/' },
  { icon: Stethoscope, path: '/consultations' },
  { icon: FlaskConical, path: '/lab-tests' },
  { icon: User, path: '/profile' },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-20 bg-white h-full flex flex-col items-center justify-between py-6 border-r border-gray-100">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600" />

      <div className="flex flex-col gap-3">
        {NAV_ITEMS.map(({ icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                isActive ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>

      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
        <img src="https://i.pravatar.cc/40" alt="profile" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Sidebar;