import { useState, useEffect } from 'react';
import { generateTimeSlots, getBookedSlotIndices } from '../utils/scheduleUtils';
import { WEEK_DAYS } from '../config/appointmentConfig';
import { API_BASE_URL } from '../config/api';

const DAY_LABELS = WEEK_DAYS.map((d) => d.label);

const safeParse = (value, fallback) => {
  if (Array.isArray(value) || (typeof value === 'object' && value !== null)) return value;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }
  return fallback;
};

const buildWeeklySlots = (doctor, durationMinutes) => {
  const slotsByDay = {};
  DAY_LABELS.forEach((day) => {
    if (doctor.offDays.includes(day)) {
      slotsByDay[day] = [];
      return;
    }
    const rawSlots = generateTimeSlots(doctor.workingHours, durationMinutes);
    const bookedIndices = getBookedSlotIndices(doctor.id, day, durationMinutes, rawSlots.length);
    slotsByDay[day] = rawSlots.map((slot, index) => ({
      label: slot.label,
      isBooked: bookedIndices.has(index),
    }));
  });
  return slotsByDay;
};

// Doctor ka data ab mockapi.io se real API call ke zariye aata hai
const fetchDoctorSchedule = async (doctorId, durationMinutes) => {
  const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}`);
  if (!response.ok) {
    return { offDays: [], slotsByDay: {} };
  }
  const raw = await response.json();
  const doctor = {
    ...raw,
    offDays: safeParse(raw.offDays, []),
    workingHours: safeParse(raw.workingHours, { start: '09:00', end: '17:00' }),
  };
  return {
    offDays: doctor.offDays,
    slotsByDay: buildWeeklySlots(doctor, durationMinutes),
  };
};

export const useDoctorSchedule = (doctorId, durationMinutes) => {
  const [schedule, setSchedule] = useState({ offDays: [], slotsByDay: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!doctorId) return;
    setLoading(true);
    fetchDoctorSchedule(doctorId, durationMinutes).then((data) => {
      setSchedule(data);
      setLoading(false);
    });
  }, [doctorId, durationMinutes]);

  return { schedule, loading };
};