import { useState, useEffect } from 'react';
import doctorsData from '../data/doctors.json';

// Real API call jaisa simulate karta hai
const fetchDoctors = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(doctorsData), 300);
  });
};

export const useDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchDoctors().then((data) => {
      setDoctors(data);
      setLoading(false);
    });
  }, []);

  return { doctors, loading };
};