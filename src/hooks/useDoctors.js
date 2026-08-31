import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

// mockapi se array/object fields kabhi kabhi string ki tarah aate hain,
// isliye safely parse karte hain (agar already object/array hai to wapas wahi de dete hain)
const safeParse = (value, fallback) => {
  if (Array.isArray(value) || (typeof value === 'object' && value !== null)) return value;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }
  return fallback;
};

const normalizeDoctor = (doctor) => ({
  ...doctor,
  offDays: safeParse(doctor.offDays, []),
  workingHours: safeParse(doctor.workingHours, { start: '09:00', end: '17:00' }),
});

// Poori doctors list mockapi.io se fetch karta hai
export const useDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchDoctors = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/doctors`);
        if (!response.ok) throw new Error('Failed to fetch doctors');
        const data = await response.json();
        if (isMounted) setDoctors(data.map(normalizeDoctor));
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDoctors();
    return () => {
      isMounted = false;
    };
  }, []);

  return { doctors, loading, error };
};

// Ek specific doctor ko uski id se fetch karta hai
export const useDoctorById = (doctorId) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!doctorId) return;
    let isMounted = true;

    const fetchDoctor = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}`);
        if (!response.ok) throw new Error('Doctor not found');
        const data = await response.json();
        if (isMounted) setDoctor(normalizeDoctor(data));
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDoctor();
    return () => {
      isMounted = false;
    };
  }, [doctorId]);

  return { doctor, loading, error };
};