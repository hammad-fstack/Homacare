import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthActions } from '../hooks/useAuthActions';
import { useAuth } from '../context/AuthContext';
import { getRedirectForRole } from '../config/authConfig';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOtp, loading, error } = useAuthActions();
  const { setUser } = useAuth();
  const [otp, setOtp] = useState('');

  const { userId, email } = location.state || {};

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">No pending verification. Please <a href="/signin" className="text-emerald-600 underline">sign in</a> again.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await verifyOtp(userId, otp);
      setUser(data.user);
      navigate(getRedirectForRole(data.user.role));
    } catch {
      // error already set by hook
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-center space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Verify Your Email</h1>
          <p className="text-sm text-gray-500 mt-2">We sent a 6-digit code to {email}. Enter it below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            placeholder="000000"
            className="w-full text-center text-2xl tracking-[0.5em] border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-emerald-400"
          />

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold py-3 rounded-lg disabled:opacity-60">
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;