import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Calendar, MessageSquare, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
    { path: '/doctor/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/doctor/appointments', icon: Calendar, label: 'Appointments' },
    { path: '/doctor/consultation-hub', icon: MessageSquare, label: 'Consultation Hub' },
];

const DoctorSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/signin');
    };

    return (
        <div className="w-16 bg-white h-full flex flex-col items-center py-6 border-r border-gray-100">
            <div className="mb-10">
                <img src="https://api.dicebear.com/7.x/shapes/svg?seed=homacare" alt="logo" className="w-8 h-8 rounded-lg" />
            </div>

            <nav className="flex-1 flex flex-col items-center justify-center gap-7">
                {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
                    const isActive = location.pathname === path;
                    return (
                        <Link
                            key={path}
                            to={path}
                            title={label}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            <Icon className="w-[22px] h-[22px]" strokeWidth={1.5} />
                        </Link>
                    );
                })}
            </nav>

            <button onClick={handleLogout} title="Logout" className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 mb-6">
                <LogOut className="w-[22px] h-[22px]" strokeWidth={1.5} />
            </button>

            <Link to="/doctor/profile" title="Profile">
                {user?.avatar ? (
                    <img src={user.avatar} alt="profile" className="w-9 h-9 rounded-full object-cover" />
                ) : (
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-500">
                        {user?.name?.[0] || 'D'}
                    </div>
                )}
            </Link>
        </div>
    );
};

export default DoctorSidebar;