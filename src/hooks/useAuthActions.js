import { useState } from 'react';
import { BACKEND_URL } from '../config/backendApi';

export const useAuthActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const request = async (endpoint, body) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = (email, password, name, phone) =>
    request('/auth/signup', { email, password, name, phone });

  const login = (email, password) =>
    request('/auth/login', { email, password });

  const verifyOtp = (userId, otp) =>
    request('/auth/verify-otp', { userId, otp });

  return { signup, login, verifyOtp, loading, error };
};