import { useState, useEffect } from 'react';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const mockData = {
        name: 'Ahmed',
        email: 'ahmed@example.com',
        phone: '+92 300 1234567',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
        joined: 'January 2024',
      };
      setProfile(mockData);
      setLoading(false);
    };
    fetchData();
  }, []);

  return { profile, loading };
};