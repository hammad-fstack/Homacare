import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

export const useDashboardData = (userId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/appointments/my`, { credentials: 'include' });
        const result = await res.json();
        const appointments = result.appointments || [];

        const today = new Date().toISOString().split('T')[0];
        const upcoming = appointments
          .filter((a) => a.status === 'scheduled' && a.appointment_date.split('T')[0] >= today)
          .sort((a, b) => a.appointment_date.localeCompare(b.appointment_date))[0];

        setData({
          userName: 'Ahmed',
          notificationCount: appointments.filter((a) => a.status === 'scheduled').length,
          consultations: { count: appointments.length },
          labTests: { count: 0, items: [] },
          prescriptions: { count: 0 },
          upcomingConsultation: upcoming
            ? {
                doctor: upcoming.doctor_name,
                title: upcoming.specialty || 'Consultation',
                date: upcoming.appointment_date.split('T')[0],
                status: 'Confirmed',
                avatar: upcoming.doctor_avatar,
              }
            : null,
          activity: [],
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [userId]);

  return { data, loading };
};