import { useState, useEffect } from 'react';

export const useDashboardData = (userId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      const mockData = {
        userName: 'Ahmed',
        notificationCount: 9,
        consultations: { count: 31 },
        labTests: {
          count: 4,
          items: [
            { id: 1, orderedBy: 'User', title: 'Hormonal Balance Panel.', time: '24d ago', status: 'pay', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=100' },
            { id: 2, orderedBy: 'Pakistan', title: 'Hormonal Balance Panel.', time: '24d ago', status: 'addDetails', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=100' },
            { id: 3, orderedBy: 'Pakistan', title: 'Hormonal Balance Panel.', time: '24d ago', status: 'addDetails', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=100' },
            { id: 4, orderedBy: 'User', title: 'Fertility Male Panel.', time: '24d ago', status: 'track', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=100' },
            { id: 5, orderedBy: 'dr rahim.', title: 'Hormonal Balance Panel.', time: '75d ago', status: 'view', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=100' },
          ],
        },
        prescriptions: { count: 0 },
        upcomingConsultation: {
          doctor: 'UAT Doctor',
          title: 'Balance your hormones',
          date: '09/01/26',
          status: 'Confirmed',
          avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150',
        },
        activity: [
          { date: '', title: 'Your appointment with UAT...', type: 'appointment' },
          { date: '', title: 'You have received a new message...', type: 'message' },
          { date: '', title: 'You have received a new message...', type: 'message' },
          { date: '', title: 'Your appointment with Pakistan...', type: 'appointment' },
          { date: '', title: 'You have received a new message...', type: 'message' },
          { date: '', title: 'Your appointment with Pakistan...', type: 'appointment' },
          { date: '', title: 'Your appointment with Pakistan...', type: 'appointment' },
        ],
      };
      setData(mockData);
      setLoading(false);
    };
    fetchDashboard();
  }, [userId]);

  return { data, loading };
};