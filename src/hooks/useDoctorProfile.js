import { useState, useEffect } from 'react';
import { BACKEND_URL } from '../config/backendApi';

export const useDoctorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/doctors/me`, { credentials: 'include' });
      const data = await res.json();
      setProfile(data.doctor);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  const updateProfile = async (updates) => {
    setSaving(true);
    try {
      const res = await fetch(`${BACKEND_URL}/doctors/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Failed to update profile');
      const data = await res.json();
      setProfile(data.doctor);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { profile, loading, saving, updateProfile };
};