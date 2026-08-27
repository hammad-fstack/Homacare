import { useState, useEffect, useMemo } from 'react';
import { CONSULTATION_STATUS } from '../config/consultationsConfig';

// Custom Hook Pattern — data fetching + filtering logic ek jagah encapsulate
export const useConsultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Mock data — baad mein API call se replace hoga
      const mockData = [
        { id: 1, doctor: 'Dr. Lina Hassan', title: 'Fertility & Hormone Check', date: '3 days ago', status: CONSULTATION_STATUS.UPCOMING, avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150' },
        { id: 2, doctor: 'Dr. Ahmed Raza', title: 'General Checkup', date: '1 week ago', status: CONSULTATION_STATUS.COMPLETED, avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150' },
        { id: 3, doctor: 'Dr. Sara Khan', title: 'Skin Consultation', date: '2 weeks ago', status: CONSULTATION_STATUS.CANCELLED, avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=150' },
      ];
      setConsultations(mockData);
      setLoading(false);
    };
    fetchData();
  }, []);

  // useMemo — Performance Optimization: filter tabhi dobara chalega jab data ya filter change ho
  const filteredConsultations = useMemo(() => {
    if (filter === 'all') return consultations;
    return consultations.filter((c) => c.status === filter);
  }, [consultations, filter]);

  return { consultations: filteredConsultations, loading, filter, setFilter };
};