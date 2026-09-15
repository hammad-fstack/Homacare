import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getRedirectForRole } from '../../config/authConfig';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <div className="p-6 text-sm text-gray-400">Loading...</div>;
  if (!user) return <Navigate to="/signin" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getRedirectForRole(user.role)} replace />;
  }

  return children;
};

export default ProtectedRoute;