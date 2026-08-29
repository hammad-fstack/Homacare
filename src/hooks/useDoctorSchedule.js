import { useState, useEffect } from 'react';
import doctorsData from '../data/doctors.json';
import { generateTimeSlots } from '../utils/scheduleUtils';
import { WEEK_DAYS } from '../config/appointmentConfig';

const DAY_LABELS = WEEK_DAYS.map((d) => d.label);

const buildWeeklySlots = (doctor, durationMinutes) => {
  const slotsByDay = {};
  DAY_LABELS.forEach((day) => {
    if (doctor.offDays.includes(day)) {
      slotsByDay[day] = [];
    } else {
      slotsByDay[day] = generateTimeSlots(doctor.workingHours, durationMinutes).map((s) => s.label);
    }
  });
  return slotsByDay;
};

const fetchDoctorSchedule = (doctorId, durationMinutes) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const doctor = doctorsData.find((d) => d.id === Number(doctorId));
      if (!doctor) {
        resolve({ offDays: [], slotsByDay: {} });
        return;
      }
      resolve({
        offDays: doctor.offDays,
        slotsByDay: buildWeeklySlots(doctor, durationMinutes),
      });
    }, 300);
  });
};

export const useDoctorSchedule = (doctorId, durationMinutes) => {
  const [schedule, setSchedule] = useState({ offDays: [], slotsByDay: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchDoctorSchedule(doctorId, durationMinutes).then((data) => {
      setSchedule(data);
      setLoading(false);
    });
  }, [doctorId, durationMinutes]);

  return { schedule, loading };
};