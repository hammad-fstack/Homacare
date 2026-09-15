import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Stethoscope, FlaskConical, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MessageSquare } from 'lucide-react';
const NAV_ITEMS = [
  { path: '/dashboard', icon: Home, label: 'Dashboard' },
  { path: '/consultations', icon: Stethoscope, label: 'Consultations' },
  { path: '/lab-tests', icon: FlaskConical, label: 'Lab Tests' },
  { path: '/profile', icon: User, label: 'Profile' },
  { path: '/consultation-hub', icon: MessageSquare, label: 'Consultation Hub' },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/signin');
  };

  return (
    <div className="w-16 bg-white h-full flex flex-col items-center py-4 border-r border-gray-100">
      <div className="mb-8">
        <img src="https://api.dicebear.com/7.x/shapes/svg?seed=homacare" alt="logo" className="w-8 h-8 rounded-lg" />
      </div>

      <nav className="flex-1 flex flex-col items-center justify-center gap-3">
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              title={label}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:bg-gray-50'
                }`}
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
      </nav>

      <button onClick={handleLogout} title="Logout" className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-50 mb-2">
        <LogOut className="w-5 h-5" />
      </button>

      {user?.avatar ? (
        <img src={user.avatar} alt="profile" className="w-9 h-9 rounded-full object-cover" />
      ) : (
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-500">
          {user?.name?.[0] || 'P'}
        </div>
      )}
    </div>
  );
};

export default Sidebar;