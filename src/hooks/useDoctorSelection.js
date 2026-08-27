import { useState } from 'react';

// Ye hook sirf "kaunsa doctor currently selected hai" track karta hai
export const useDoctorSelection = (initialDoctorId) => {
  const [selectedDoctorId, setSelectedDoctorId] = useState(initialDoctorId);

  const selectDoctor = (doctorId) => setSelectedDoctorId(doctorId);

  return { selectedDoctorId, selectDoctor };
};