import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthActions } from '../hooks/useAuthActions';

const SignUp = () => {
  const navigate = useNavigate();
  const { signup, loading, error } = useAuthActions();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup(form.email, form.password, form.name, form.phone);
      navigate('/verify-otp', { state: { userId: data.userId, email: form.email } });
    } catch {
      // error already set by hook
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-center space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Your HomaCare Account</h1>
          <p className="text-sm text-gray-500 mt-2">Start your private and secure healthcare journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input value={form.name} onChange={update('name')} required
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-emerald-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" value={form.email} onChange={update('email')} required
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-emerald-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <input value={form.phone} onChange={update('phone')}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-emerald-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input type="password" value={form.password} onChange={update('password')} required
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-emerald-400" />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold py-3 rounded-lg disabled:opacity-60">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-sm text-gray-600">
          Already have an account? <Link to="/signin" className="text-emerald-600 font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;