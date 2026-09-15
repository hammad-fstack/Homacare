import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

// Backend snake_case (consultation_fee) deta hai, frontend camelCase (consultationFee) use karta hai
const normalizeDoctor = (doctor) => ({
  ...doctor,
  consultationFee: Number(doctor.consultation_fee) || 0,
  currencySymbol: doctor.currency_symbol || 'SAR',
  avatar: doctor.avatar || null, // empty string ko bhi null treat karo taake fallback trigger ho
});

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
        const response = await fetch(`${API_BASE_URL}/doctors`, {
          credentials: 'include',
          cache: 'no-store',
        });
        if (!response.ok) throw new Error('Failed to fetch doctors');
        const data = await response.json();
        if (isMounted) setDoctors(data.doctors.map(normalizeDoctor));
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
        const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}`, {
          credentials: 'include',
          cache: 'no-store',
        });
        if (!response.ok) throw new Error('Doctor not found');
        const data = await response.json();
        if (isMounted) setDoctor(normalizeDoctor(data.doctor));
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