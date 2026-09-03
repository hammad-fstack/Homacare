import { useMemo } from 'react';
import { SERVICES } from '../config/servicesConfig';
import { useDoctors } from './useDoctors';

// Adapter Pattern — fake service-content ko real doctor-data ke sath jodta hai,
// taake doctor list badalne pe services khud-ba-khud sahi doctor assign kar len
export const useServicesWithDoctors = () => {
  const { doctors, loading, error } = useDoctors();

  const services = useMemo(() => {
    if (!doctors.length) return [];
    return SERVICES.map((service, index) => ({
      ...service,
      doctor: doctors[index % doctors.length],
    }));
  }, [doctors]);

  return { services, loading, error };
};