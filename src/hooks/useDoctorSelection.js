import { useState } from 'react';

export const useDoctorSelection = (initialDoctorId) => {
  const [selectedDoctorId, setSelectedDoctorId] = useState(initialDoctorId);

  const selectDoctor = (doctorId) => setSelectedDoctorId(doctorId);

  return { selectedDoctorId, selectDoctor };
};