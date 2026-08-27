import { useState, useEffect } from 'react';

export const useLabTests = () => {
  const [labTests, setLabTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const mockData = [
        { id: 1, doctor: 'Dr. Layla Hassan', title: 'Fertility & Hormone Panel', time: '12h ago', status: 'pay' },
        { id: 2, doctor: 'Dr. Layla Hassan', title: 'Fertility & Hormone Panel', time: '12h ago', status: 'view' },
        { id: 3, doctor: 'Dr. Layla Hassan', title: 'Fertility & Hormone Panel', time: '12h ago', status: 'view' },
      ];
      setLabTests(mockData);
      setLoading(false);
    };
    fetchData();
  }, []);

  return { labTests, loading };
};