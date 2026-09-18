import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/appointments/my`, { credentials: 'include' });
        const data = await res.json();
        setAppointments(data.appointments || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  return { appointments, loading };
};