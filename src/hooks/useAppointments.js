import { useState, useEffect } from 'react';

// Abhi mock — real data baad mein backend se aayegi
export const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      // Empty array = "No appointments yet" screen dikhegi
      setAppointments([]);
      setLoading(false);
    };
    fetchAppointments();
  }, []);

  return { appointments, loading };
};