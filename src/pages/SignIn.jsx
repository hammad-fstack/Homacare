import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthActions } from '../hooks/useAuthActions';

const SignIn = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthActions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      navigate('/verify-otp', { state: { userId: data.userId, email } });
    } catch {
      // error already set by hook
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-center space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back to HomaCare</h1>
          <p className="text-sm text-gray-500 mt-2">Sign in to access your private and secure healthcare journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-emerald-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="text-right mt-2">
              <Link to="/forgot-password" className="text-xs text-emerald-600 hover:underline">Forgot Password?</Link>
            </div>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold py-3 rounded-lg disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">Or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button
          type="button"
          disabled
          title="Coming soon"
          className="w-full bg-gray-100 text-gray-500 text-sm font-medium py-3 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed"
        >
          <span className="font-bold text-base">G</span> Sign Up with Google
        </button>

        <p className="text-sm text-gray-600">
          Don't have an account? <Link to="/signup" className="text-emerald-600 font-semibold hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;