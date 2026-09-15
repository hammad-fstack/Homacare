import { useState, useEffect } from 'react';
import { BACKEND_URL } from '../config/backendApi';

export const useDoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  const today = new Date().toISOString().split('T')[0];

  const upcoming = appointments.filter(
    (a) => a.status === 'scheduled' && a.appointment_date.split('T')[0] >= today
  );
  const todaysAppointments = appointments.filter(
    (a) => a.status === 'scheduled' && a.appointment_date.split('T')[0] === today
  );

  return {
    loading,
    metrics: {
      labOrders: 0,
      upcomingConsultations: upcoming.length,
      todaysConsultations: todaysAppointments.length,
    },
    upcomingAppointments: upcoming,
  };
};