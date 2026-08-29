import { useState, useEffect } from 'react';
import { CONSULTATIONS_DATA } from '../config/consultationsConfig';

export const useConsultations = () => {
  const [data, setData] = useState({ ongoing: [], upcoming: [], previous: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setData(CONSULTATIONS_DATA);
    setLoading(false);
  }, []);

  return { data, loading };
};