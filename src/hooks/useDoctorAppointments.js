import { useState, useEffect } from 'react';
import { BACKEND_URL } from '../config/backendApi';

export const useDoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/appointments/my`, { credentials: 'include' });
      const data = await res.json();
      setAppointments(data.appointments || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return { appointments, loading, refetch: fetchAppointments };
};