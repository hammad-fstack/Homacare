import { useState, useEffect } from 'react';

export const useDashboardData = (userId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const mockData = {
          userName: 'Ahmed',
          consultations: { count: 2 },
          labTests: {
            count: 3,
            items: [
              { id: 1, doctor: 'Dr. Layla Hassan', title: 'Fertility & Hormone Panel', time: '12h ago' },
            ],
          },
          prescriptions: { count: 2 },
          upcomingConsultation: {
            doctor: 'Dr. Lina Hassan',
            title: 'Fertility & Hormone Check',
            avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150',
          },
activity: [
  { date: '11 Sep', title: 'Appointment Confirmed', type: 'appointment' },
  { date: '10 Sep', title: 'Your consultation starts tomorrow', type: 'consultation' },
  { date: '09 Sep', title: 'Your lab results are ready', type: 'lab' },
  { date: '08 Sep', title: 'Platform maintenance scheduled', type: 'maintenance' },
  { date: '07 Sep', title: 'New message from your doctor', type: 'message' },
],
        };
        setData(mockData);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [userId]);

  return { data, loading };
};