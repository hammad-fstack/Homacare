import { Link, useLocation } from 'react-router-dom';
import { Home, Stethoscope, FlaskConical, User } from 'lucide-react';

// Config-driven nav items — Factory pattern jaisa, naya link add karna ho to sirf array update
const NAV_ITEMS = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/consultations', icon: Stethoscope, label: 'Consultations' },
    { path: '/lab-tests', icon: FlaskConical, label: 'Lab Tests' },
    { path: '/profile', icon: User, label: 'Profile' },
];

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="w-16 bg-white h-full flex flex-col items-center py-4 border-r border-gray-100">
            <div className="mb-8">
                <img src="https://api.dicebear.com/7.x/shapes/svg?seed=homacare" alt="logo" className="w-8 h-8 rounded-lg" />
            </div>

            <nav className="flex flex-col gap-3 flex-1">
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

            <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
                alt="profile"
                className="w-9 h-9 rounded-full object-cover mt-4"
            />
        </div>
    );
};

export default Sidebar;